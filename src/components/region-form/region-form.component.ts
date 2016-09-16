import {Component, ViewChild, Input} from '@angular/core';
import {NgForm} from '@angular/forms';
import {RegionsService} from "../../shared/services/src/regions.service";
import {Location, Zone, Region} from "../../shared/model";
import {SebmGoogleMap} from 'angular2-google-maps/core';

@Component({
    selector: 'region-form',
    templateUrl: 'components/region-form/region-form.component.html',
    styleUrls: ['components/region-form/region-form.component.css']
})
export class RegionFormComponent {
    @Input('selectedRegion') region: Region;
    @ViewChild(NgForm) form: NgForm;
    @ViewChild(SebmGoogleMap) map: SebmGoogleMap;
    private shown;

    constructor(private regionsService: RegionsService) {
    }

    valid() {
        return this.form.form.valid;
    }

    onCenterChange(center: Location, point) {
        center.latitude = point.lat;
        center.longitude = point.lng;
    }

    onRadiusChange(zone: Zone, radius) {
        zone.radius = radius
    }

    show() {
        this.shown = true;
        setTimeout( () => this.map.triggerResize());
    }

    hide() {
        this.map.triggerResize();
        this.shown = false;
    }

}