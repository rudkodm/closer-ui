import './rxjs-extensions';


import {NgModule}      from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule}   from '@angular/forms';
import {HttpModule}    from '@angular/http';
import {AgmCoreModule} from 'angular2-google-maps/core';
import {ModalModule} from 'ng2-bs4-modal/ng2-bs4-modal';

//noinspection TypeScriptCheckImport
import {Ng2DatetimePickerModule} from 'ng2-datetime-picker';
import {AUTH_PROVIDERS} from 'angular2-jwt';

import {routing} from './app.routs';
import {AppComponent} from './app.component';
import {HeaderComponent} from '../header/header.component';
import {RegionsComponent} from "../regions/regions.component";
import {PromotionsComponent} from "../promotions/promotions.component";
import {ProvidersComponent} from "../providers/providers.component";
import {CompaniesComponent} from "../companies/companies.component";

import {AppConfiguration} from "../../config";
import {RegionsService} from "../../shared/services/src/regions.service";
import {PromotionsService} from "../../shared/services/src/promotions.service";
import {CompaniesService} from "../../shared/services/src/companies.service";
import {ProvidersService} from "../../shared/services/src/providers.service";
import {LocationService} from "../../shared/services/src/location.service";
import {ProviderFormComponent} from "../provider-form/provider-form.component";
import {RegionFormComponent} from "../region-form/region-form.component";
import {PromotionFormComponent} from "../promotion-form/promotion-form.component";
import {AuthService} from "../../shared/services/src/auth.service";
import {StorageService} from "../../shared/services/src/storage.service";
import {LoginComponent} from "../login/login.component";
import {guardsProviders} from "../../shared/guards/auth.guard";
import {ProviderInfoComponent} from "../provider-info/provider-info.component";
import {UserPromotionsComponent} from "../user-promotions/user-promotions.component";
import {ErrorComponent} from "../error/error.component";
import {ErrorsService} from "../../shared/services/src/errors.service";

@NgModule({
    imports: [
        BrowserModule,
        CommonModule,
        FormsModule,
        HttpModule,
        ModalModule,
        Ng2DatetimePickerModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyCHrWJHJiI5gJkyCMnQTh3rLCxUgeLpzxk'
        }),
        routing
    ],
    declarations: [
        AppComponent,
        HeaderComponent,
        RegionsComponent,
        PromotionsComponent,
        CompaniesComponent,
        ProvidersComponent,
        ProviderFormComponent,
        RegionFormComponent,
        PromotionFormComponent,
        LoginComponent,
        ProviderInfoComponent,
        UserPromotionsComponent,
        ErrorComponent
    ],
    providers: [
        AppConfiguration,
        RegionsService,
        PromotionsService,
        CompaniesService,
        ProvidersService,
        LocationService,
        AuthService,
        AUTH_PROVIDERS,
        guardsProviders,
        StorageService,
        ErrorsService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {

}