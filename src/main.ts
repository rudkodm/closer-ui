import {bootstrap}    from 'angular2/platform/browser';
import {AppComponent} from './components/app/app.component';

import {ROUTER_PROVIDERS} from 'angular2/router';
import {HTTP_PROVIDERS} from 'angular2/http';
import {AppConfiguration} from "./config";


bootstrap(AppComponent, [
    AppConfiguration,
    ROUTER_PROVIDERS,
    HTTP_PROVIDERS
]);