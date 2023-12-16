import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutesModule } from './app.routes';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
//import { DataService } from './service/data.service';
import { HomeModule } from './home/home.module'; // Import HomeModule

@NgModule({
imports: [
CommonModule, 
BrowserModule,
HttpClientModule,
HomeModule,
AppRoutesModule,
],
declarations: [ AppComponent],
bootstrap: [ AppComponent ],
})
export class AppModule { }