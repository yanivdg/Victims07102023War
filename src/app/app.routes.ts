/*
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { Routes } from '@angular/router';
export const routes: Routes = [
  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  //{ path: '', redirectTo: '/home', pathMatch: 'full' }, // Redirect to 'home' on empty path
  { path: 'home', component: HomeComponent }, // Route to HomeComponent for the root path
  { path: 'about', component: AboutComponent }, // Route to AboutComponent for /about path
  // Add more routes as needed
];

*/
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';

export const routes: Routes = [
  //{ path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  //{ path: 'home', redirectTo: '/home', pathMatch: 'full' }, // Redirect to 'home' on empty path
  { path: 'home', component: HomeComponent }, // Home route
  { path: 'about', component: AboutComponent }, // About route
  // Add more routes as needed
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutesModule { }