import {Component} from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';
import {HeaderComponent} from '../header/header.component';
import {RegionsService} from "../../shared/services/src/regions.service";
import {PromotionsService} from "../../shared/services/src/promotions.service";
import {CompaniesService} from "../../shared/services/src/companies.service";
import {ProvidersService} from "../../shared/services/src/providers.service";
import {LocationService} from "../../shared/services/src/location.service";

@Component({
    selector: 'app',
    moduleId: module.id,
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    directives: [
        ROUTER_DIRECTIVES,
        HeaderComponent
    ],
    providers: [
        RegionsService,
        PromotionsService,
        CompaniesService,
        ProvidersService,
        LocationService
    ]
})
export class AppComponent {
}
