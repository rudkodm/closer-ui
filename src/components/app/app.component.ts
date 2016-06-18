import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import {HeaderComponent} from '../header/header.component';
import {RegionsService} from "../../shared/services/src/regions.service";
import {PromotionsService} from "../../shared/services/src/promotions.service";

import {DashboardComponent} from "../dashboard/dashboard.component";
import {RegionsComponent} from '../regions/regions.component';
import {PromotionsComponent} from "../promotions/promotions.component";

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
        PromotionsService
    ]
})
@RouteConfig([
    {path: '/', name: 'Dashboard', component: DashboardComponent, useAsDefault: true},
    {path: '/regions', name: 'Regions', component: RegionsComponent},
    {path: '/selectedPromotions', name: 'Promotions', component: PromotionsComponent}
])
export class AppComponent {
}
