import {provideRouter, RouterConfig} from '@angular/router';

import {DashboardComponent} from "../dashboard/dashboard.component";
import {RegionsComponent} from '../regions/regions.component';
import {PromotionsComponent} from "../promotions/promotions.component";



const routes: RouterConfig = [
    {path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    {path: 'dashboard', component: DashboardComponent},
    {path: 'regions', component: RegionsComponent},
    {path: 'promotions', component: PromotionsComponent}
];

export const APP_ROUTER_PROVIDERS = [
    provideRouter(routes)
];