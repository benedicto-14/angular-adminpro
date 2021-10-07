import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Modules
import { PagesRoutingModule } from './pages/pages.routing';
import { AuthRoutingModule } from './auth/auth.routing';

import { Page404Component } from './page404/page404.component';

const rutas:Routes = [
  //path: '/dashboard' PagesRouting
  //path: '/auth' AuthRouting
  { path:'', redirectTo:'/dashboard', pathMatch: 'full' },
  { path:'**', component: Page404Component }
]

@NgModule({
  declarations: [],
  imports: [ 
    RouterModule.forRoot( rutas ),
    PagesRoutingModule,
    AuthRoutingModule
  ],
  exports: [ RouterModule ]
})

export class AppRoutingModule { }
