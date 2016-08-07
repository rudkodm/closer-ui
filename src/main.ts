import {bootstrap}    from '@angular/platform-browser-dynamic';
import {AppComponent} from './components/app/app.component';
import {disableDeprecatedForms, provideForms} from '@angular/forms';

import {APP_ROUTER_PROVIDERS} from './components/app/app.routs';
import {HTTP_PROVIDERS} from '@angular/http';
import {AppConfiguration} from "./config";


bootstrap(AppComponent, [
    APP_ROUTER_PROVIDERS,
    HTTP_PROVIDERS,
    AppConfiguration,
    disableDeprecatedForms(),
    provideForms()
]);