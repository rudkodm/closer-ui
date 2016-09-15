import {Component, Input, ViewChild} from '@angular/core';
import {NgForm, NgModel} from '@angular/forms';
import {ServiceProvider, Region} from "../../shared/model";
import {RegionsService} from "../../shared/services/src/regions.service";
import {LocationService} from "../../shared/services/src/location.service";

@Component({
    selector: 'provider-form',
    templateUrl: 'components/provider-form/provider-form.component.html',
    styleUrls: ['components/provider-form/provider-form.component.css']
})
export class ProviderFormComponent {
    @Input('selectedService') service: ServiceProvider;
    @Input('selectedRegion') region: Region;
    @ViewChild('form') form: NgForm;

    constructor(private regionsService: RegionsService,
                private locationService: LocationService) {
    }

    valid() {
        return this.form.form.valid;
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

                        model.control.setErrors({noRegion: "There is no cower region"})
                    } else {
                        this.region = region;
                        this.service.regionId = region.id
                    }
                })
        };

        let processErrors = (reason) => {
            model.control.setErrors({noRegion: reason})
        };

        getLocationOfAddress(address)
            .then(findCoverRegion)
            .catch(processErrors);
    }
}