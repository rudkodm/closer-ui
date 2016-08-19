import {Component, OnInit, ViewChild} from "@angular/core";
import {Company, AddressDetails, ContactDetails, ServiceProvider, Region} from "../../shared/model";
import {MODAL_DIRECTIVES, ModalComponent} from "ng2-bs4-modal/ng2-bs4-modal";
import * as _ from "lodash";
import {ProvidersService} from "../../shared/services/src/providers.service";
import {RegionsService} from "../../shared/services/src/regions.service";
import {LocationService} from "../../shared/services/src/location.service";

@Component({
    selector: 'providers',
    moduleId: module.id,
    templateUrl: './providers.component.html',
    styleUrls: ['./providers.component.css'],
    directives: [MODAL_DIRECTIVES]
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
        this.regionsService.getRegions()
            .then(regions => {
                this.regions = regions
                this.providerService.getProviders()
                    .then(services => this.services = services)
                    .catch(error => this.error = error);
            })
            .catch(error => this.error = error);
    }

    regionInformationOf(id: string): Region {
        return this.regions.find(r => r.id === id)
    }

    doSave() {
        let service = this.service;
        if (this.isAddNewOpt) {
            this.locationService
                .getLocationOf(service.addressDetails.address)
                .then(location => {
                    service.addressDetails.location = location;
                    this.providerService
                        .save(service)
                        .then(service => this.services.push(service))
                        .catch(error => this.error = error)
                });
        } else {
            this.providerService
                .update(service)
                .then(service => {
                    this.replaceWith(this.services, service);
                })
                .catch(error => this.error = error)
        }
        this.clear();
        this.modal.close()
    }

    private replaceWith(services: ServiceProvider[], service: ServiceProvider) {
        let index = this.findPosition(service)
        services.splice(index, 1, service)
    }

    doEdit(service: ServiceProvider) {
        this.service = _.cloneDeep(service)
        this.modal.open(this.modalSize)
    }

    //
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

    //
    private clear() {
        this.isAddNewOpt = false
        this.service = new ServiceProvider()
    }


    private findPosition(service: ServiceProvider) {
        return this.regions.findIndex(s => s.id === service.id);
    }
}
