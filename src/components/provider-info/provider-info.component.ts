import {Component, Input, ViewChild} from '@angular/core';
import {ServiceProvider, Region} from "../../shared/model";
import {NgForm} from "@angular/forms";
import {SebmGoogleMap} from "angular2-google-maps/core";

@Component({
    selector: 'provider-info',
    templateUrl: 'components/provider-info/provider-info.component.html',
    styleUrls: ['components/provider-info/provider-info.component.css']
})
export class ProviderInfoComponent{
    @Input('selectedService') service: ServiceProvider;
    @Input('selectedRegion') region: Region;
    @ViewChild('form') form: NgForm;
    @ViewChild(SebmGoogleMap) map: SebmGoogleMap;
    private shown;

}
