import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {RegionsComponent} from "../regions/regions.component";
import {PromotionsComponent} from "../promotions/promotions.component";
import {ProvidersComponent} from "../providers/providers.component";


const appRoutes: Routes = [
    {path: '', redirectTo: '/regions', pathMatch: 'full' },
    {path: 'regions', component: RegionsComponent},
    {path: 'providers',component: ProvidersComponent},
    {path: 'promotions',component: PromotionsComponent}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);