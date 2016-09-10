import {Component, OnInit, ViewChild} from "@angular/core";
import {ServiceProvider, Region} from "../../shared/model";
import {ModalComponent} from "ng2-bs4-modal/ng2-bs4-modal";
import * as _ from "lodash";
import {ProvidersService} from "../../shared/services/src/providers.service";
import {RegionsService} from "../../shared/services/src/regions.service";
import {LocationService} from "../../shared/services/src/location.service";
import {Observable} from "rxjs/Rx";
import 'rxjs/add/operator/merge';
import 'rxjs/add/operator/mergeMap';

@Component({
    selector: 'providers',
    templateUrl: 'components/providers/providers.component.html',
    styleUrls: ['components/providers/providers.component.css']
})
export class ProvidersComponent implements OnInit {
    services: ServiceProvider[];
    regions: Region[];
    service: ServiceProvider = new ServiceProvider();
    error: Error;
    isAddNewOpt: Boolean = false;

    @ViewChild('modal')
    modal: ModalComponent;
    modalSize = 'lg';

    constructor(private providerService: ProvidersService,
                private regionsService: RegionsService,
                private locationService: LocationService) {
    }

    ngOnInit() {
        let observables = [
            this.providerService.getProviders(),
            this.regionsService.getRegions()
        ];
        Observable
            .forkJoin(observables)
            .subscribe(
                data => {
                    this.services = data[0];
                    this.regions = data[1];
                },
                errors => {
                    this.error = errors[0]
                }
            );
    }

    regionInformationOf(id: string): Region {
        return this.regions.find(r => r.id === id)
    }

    doSave() {
        if (this.isAddNewOpt) {
            this.saveOpt(this.service)
        } else {
            this.updateOpt(this.service)
        }
        this.clear();
        this.modal.close()
    }

    private saveOpt(service: ServiceProvider) {
        let address = service.addressDetails.address;
        this.locationService.getLocationOf(address)
            .then(location => {
                service.addressDetails.location = location
                this.providerService.save(service)
                    .then(service => this.services.push(service))
                    .catch( error => this.error = error)})
    }

    private updateOpt(service: ServiceProvider) {
        this.providerService
            .update(service)
            .then(service => this.replaceWith(this.services, service))
            .catch(error => this.error = error)
    }

    private replaceWith(services: ServiceProvider[], service: ServiceProvider) {
        let index = this.findPosition(service)
        services.splice(index, 1, service)
    }

    doEdit(service: ServiceProvider) {
        this.service = _.cloneDeep(service)
        this.modal.open(this.modalSize)
    }

    doAdd() {
        this.isAddNewOpt = true
        this.modal.open(this.modalSize)
    }

    doDelete() {
        this.providerService
            .delete(this.service)
            .catch(error  => this.error = error)

        this.removeObject(this.services, this.service)
        this.modal.close()
    }

    private removeObject(services: ServiceProvider[], service: ServiceProvider) {
        let index = this.findPosition(service)
        services.splice(index, 1)
    }

    onDismiss(event) {
        this.clear()
    }

    private clear() {
        this.isAddNewOpt = false
        this.service = new ServiceProvider()
    }


    private findPosition(service: ServiceProvider) {
        return this.regions.findIndex(s => s.id === service.id);
    }
}
