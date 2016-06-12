import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import {HeaderComponent} from '../header/header.component';
import {DashboardComponent} from '../dashboard/dashboard.component';
import {RegionsService} from "../../shared/services/src/regions.service";

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
    ]
})
@RouteConfig([
    {path: '/', name: 'Dashboard', component: DashboardComponent, useAsDefault: true}
])
export class AppComponent {
}