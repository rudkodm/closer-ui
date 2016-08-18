import {provideRouter, RouterConfig} from "@angular/router";
import {RegionsComponent} from "../regions/regions.component";
import {PromotionsComponent} from "../promotions/promotions.component";
import {CompaniesComponent} from "../companies/companies.component";


const routes: RouterConfig = [
    {path: '', redirectTo: '/regions', pathMatch: 'full' },
    {path: 'regions', component: RegionsComponent},
    {path: 'companies', component: CompaniesComponent},
    {path: 'promotions', component: PromotionsComponent}
];

export const APP_ROUTER_PROVIDERS = [
    provideRouter(routes)
];