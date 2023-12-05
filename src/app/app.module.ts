import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import {DataService} from './service/data.service';
@NgModule({
imports: [
CommonModule, 
BrowserModule,
HttpClientModule,
AppRoutingModule
],
declarations: [ AppComponent ],
providers:[DataService],
bootstrap: [ AppComponent ]
})
export class AppModule { }