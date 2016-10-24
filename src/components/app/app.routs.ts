import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {RegionsComponent} from "../regions/regions.component";
import {PromotionsComponent} from "../promotions/promotions.component";
import {ProvidersComponent} from "../providers/providers.component";
import {AuthenticatedOnly, AdminOnly} from "../../shared/guards/auth.guard";
import {LoginComponent} from "../login/login.component";
import {ProviderInfoComponent} from "../provider-info/provider-info.component";


const appRoutes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'error',component: PromotionsComponent},
    {path: 'regions', component: RegionsComponent, canActivate: [AuthenticatedOnly, AdminOnly]},
    {path: 'providers',component: ProvidersComponent, canActivate: [AuthenticatedOnly, AdminOnly]},
    {path: 'promotions',component: PromotionsComponent, canActivate: [AuthenticatedOnly, AdminOnly]},
    {path: 'provider-info',component: ProviderInfoComponent, canActivate: [AuthenticatedOnly]},
    {path: '**', redirectTo: '/login'}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);