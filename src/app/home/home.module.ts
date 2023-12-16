import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { HomeComponent } from './home.component';
import { DataService } from '../service/data.service';

import { FormsModule } from '@angular/forms';
//import { SearchFilterComponent } from '../search-filter/search-filter.component'; // Import the SearchFilterComponent

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    FormsModule
    //SearchFilterComponent
  ],
  providers: [DataService],
},

)
export class HomeModule { }




