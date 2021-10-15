import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountSettingsComponent } from './account-settings/account-settings.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { PagesComponent } from './pages.component';
import { ProgressComponent } from './progress/progress.component';

const routes: Routes = [
    { 
        path:'dashboard', 
        component:PagesComponent, 
        children:[
          { path:'', component: DashboardComponent, data: { titulo:'Dashboard' } },
          { path:'progress', component: ProgressComponent, data: { titulo: 'Progress Bar'} },
          { path:'grafica1', component: Grafica1Component, data: { titulo: 'Grafica #1' } },
          { path:'settings', component: AccountSettingsComponent, data: { titulo: 'Settings' } }
        ] 
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}
