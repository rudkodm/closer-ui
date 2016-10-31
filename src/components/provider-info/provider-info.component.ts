import {Component, OnInit} from '@angular/core';
import {ServiceProvider, Region} from "../../shared/model";
import {NgModel} from "@angular/forms";
import {LocationService} from "../../shared/services/src/location.service";
import {StorageService} from "../../shared/services/src/storage.service";
import {ProvidersService} from "../../shared/services/src/providers.service";
import {RegionsService} from "../../shared/services/src/regions.service";

@Component({
    selector: 'provider-info',
    templateUrl: 'components/provider-info/provider-info.component.html',
    styleUrls: ['components/provider-info/provider-info.component.css']
})
export class ProviderInfoComponent implements OnInit{
    service: ServiceProvider = new ServiceProvider();
    region: Region = new Region();
    private profileId;
    private error: any;

    constructor(
        private providerService: ProvidersService,
        private regionsService: RegionsService,
        private storage: StorageService
    ){}

    ngOnInit(): void {
        this.profileId = this.storage.getUserProfileId();
        this.providerService.getServiceProviderByProfileId(this.profileId)
            .then(service => {
                if(service) {
                    this.service = service;
                    this.storage.saveProviderId(service.id);
                }
                return service;
            })
            .then((service) => this.regionsService.getRegionById(service.regionId))
            .then(region => {
                if(region) this.region = region
            })
            .catch(error => this.error = error)

    }

    doSave() {
        this.service.profileId = this.profileId;
        let saveOrUpdate = () => {
            if(!!this.service.id)
                return this.providerService.update(this.service);
            else
                return this.providerService
                    .save(this.service)
                    .then((service) => {
                        if(service) {
                            this.service = service;
                            this.storage.saveProviderId(service.id)
                        }
                        return service;
                    });
        };
        saveOrUpdate().catch( error => this.error = error)
    }
}
