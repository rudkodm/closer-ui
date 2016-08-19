import {provideRouter, RouterConfig} from "@angular/router";
import {RegionsComponent} from "../regions/regions.component";
import {PromotionsComponent} from "../promotions/promotions.component";
import {ProvidersComponent} from "../providers/providers.component";


const routes: RouterConfig = [
    {path: '', redirectTo: '/regions', pathMatch: 'full' },
    {path: 'regions', component: RegionsComponent},
    {path: 'providers', component: ProvidersComponent},
    {path: 'promotions', component: PromotionsComponent}
];

export const APP_ROUTER_PROVIDERS = [
    provideRouter(routes)
];