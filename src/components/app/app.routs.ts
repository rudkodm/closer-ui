import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {RegionsComponent} from "../regions/regions.component";
import {PromotionsComponent} from "../promotions/promotions.component";
import {ProvidersComponent} from "../providers/providers.component";
import {AuthenticatedOnly, AdminOnly} from "../../shared/guards/auth.guard";
import {LoginComponent} from "../login/login.component";
import {ProviderInfoComponent} from "../provider-info/provider-info.component";
import {UserPromotionsComponent} from "../user-promotions/user-promotions.component";


const appRoutes: Routes = [
    {path: 'login',             component: LoginComponent},
    {path: 'error',             component: PromotionsComponent},
    {path: 'provider-info',     component: ProviderInfoComponent, canActivate: [AuthenticatedOnly]},
    {path: 'users-promotions',  component: UserPromotionsComponent, canActivate: [AuthenticatedOnly]},
    {path: 'regions',           component: RegionsComponent, canActivate: [AuthenticatedOnly, AdminOnly]},
    {path: 'providers',         component: ProvidersComponent, canActivate: [AuthenticatedOnly, AdminOnly]},
    {path: 'promotions',        component: PromotionsComponent, canActivate: [AuthenticatedOnly, AdminOnly]},
    {path: '**', redirectTo: '/login'}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);