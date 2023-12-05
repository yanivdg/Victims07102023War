import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { RouterModule, Routes } from '@angular/router';
export const routes: Routes = [
  { path: 'home', component: HomeComponent }, // Route to HomeComponent for the root path
  { path: 'about', component: AboutComponent }, // Route to AboutComponent for /about path
  // Add more routes as needed
];
