import { Routes } from '@angular/router';
import { Api1Component } from './api1/api1.component';
import { HomeComponent } from './home/home.component';


export const routes: Routes = [
    {path:'', component: HomeComponent},
    {path:'api1', component: Api1Component},
];
