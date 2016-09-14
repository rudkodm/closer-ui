import {Component, OnInit, ViewChild} from "@angular/core";
import {ServiceProvider, Region} from "../../shared/model";
import {ModalComponent} from "ng2-bs4-modal/ng2-bs4-modal";
import {ProvidersService} from "../../shared/services/src/providers.service";
import {RegionsService} from "../../shared/services/src/regions.service";
import {LocationService} from "../../shared/services/src/location.service";
import * as _ from "lodash";

@Component({
    selector: 'providers',
    templateUrl: 'components/providers/providers.component.html',
    styleUrls: ['components/providers/providers.component.css']
})
export class ProvidersComponent implements OnInit {
    services: ServiceProvider[];
    service: ServiceProvider = new ServiceProvider();
    region: Region;
    error: Error;
    isAddNewOpt: Boolean = false;

    @ViewChild(ModalComponent)
    modal: ModalComponent;
    modalSize = 'lg';

    constructor(private providerService: ProvidersService,
                private regionsService: RegionsService,
                private locationService: LocationService) {
    }

    ngOnInit() {
        this.providerService.getProviders()
            .then(services => this.services = services)
            .catch(error => this.error = error);
    }

    doSave() {
        if (this.isAddNewOpt) this.saveOpt(this.service);
        else this.updateOpt(this.service);

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
        this.service = _.cloneDeep(service);
        this.regionsService
            .getRegionById(service.regionId)
            .then(r => this.region = r);
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

    private findPosition(service: ServiceProvider): number {
        return this.services.findIndex(s => s.id === service.id);
    }

    onDismiss(event) {
        this.clear()
    }

    onClose(event) {
        this.clear()
    }

    onOpen(event){
    }

    private clear() {
        this.isAddNewOpt = false;
        this.service = new ServiceProvider();
        this.region = null;
    }
}
