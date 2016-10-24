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
    error: any;

    constructor(
        private providerService: ProvidersService,
        private regionsService: RegionsService,
        private locationService: LocationService,
        private storage: StorageService
    ){}

    ngOnInit(): void {
        let profileId = this.storage.getUserProfileId();
        this.providerService.getServiceProviderByProfileId(profileId)
            .then(service => {
                this.service = service;
                this.storage.saveProviderId(service.id);
            })
            .then(() => this.regionsService.getRegionById(this.service.regionId))
            .then(region => this.region = region)
            .catch(error => this.error = error)

    }

    processLocation(model: NgModel) {
        let address: string = model.control.value;

        let getLocationOfAddress = (str) => {
            return this.locationService
                .getLocationOf(str)
                .then(location => {
                    this.service.addressDetails.location = location;
                    this.service.addressDetails.address = address;
                    return location;
                })
        };

        let findCoverRegion = (loc) => {
            return this.regionsService
                .getCoverRegion(loc)
                .then(regions=> {
                    let region = regions[0];
                    let emptyResponse = !region;
                    if (emptyResponse) {
                        model.control.setErrors({noRegion: "There is no cower region"});
                        clear();
                    } else {
                        assignRegion(region);
                    }
                })
        };


        let processErrors = (reason) => {
            model.control.setErrors({noRegion: reason});
            clear();
        };

        let clear = () => {
            this.region = new Region();
            this.service.regionId = undefined;
        };

        let assignRegion = (region: Region) => {
            this.region = region;
            this.service.regionId = region.id
        };

        getLocationOfAddress(address)
            .then(findCoverRegion)
            .catch(processErrors);
    }

    doSave() {
        let saveOrUpdate = () => {
            if(this.service.id) return this.providerService.update(this.service);
            else return this.providerService.save(this.service);
        };
        saveOrUpdate().catch( error => this.error = error)
    }



}
