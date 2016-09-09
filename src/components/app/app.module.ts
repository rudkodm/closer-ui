import './rxjs-extensions';

import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';

import {ModalModule} from 'ng2-bs4-modal/ng2-bs4-modal';
import { Ng2DatetimePickerModule } from 'ng2-datetime-picker';
import { AppComponent }         from './app.component';
import {HeaderComponent} from '../header/header.component';
import {RegionsService} from "../../shared/services/src/regions.service";
import {PromotionsService} from "../../shared/services/src/promotions.service";
import {CompaniesService} from "../../shared/services/src/companies.service";
import {ProvidersService} from "../../shared/services/src/providers.service";
import {LocationService} from "../../shared/services/src/location.service";
import { routing }              from './app.routs';
import {RegionsComponent} from "../regions/regions.component";
import {PromotionsComponent} from "../promotions/promotions.component";
import {ProvidersComponent} from "../providers/providers.component";
import {CompaniesComponent} from "../companies/companies.component";
import {AppConfiguration} from "../../config";

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        ModalModule,
        Ng2DatetimePickerModule,
        routing
    ],
    declarations: [
        AppComponent,
        HeaderComponent,
        RegionsComponent,
        PromotionsComponent,
        CompaniesComponent,
        ProvidersComponent
    ],
    providers: [
        AppConfiguration,
        RegionsService,
        PromotionsService,
        CompaniesService,
        ProvidersService,
        LocationService
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule {
}