import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutesModule } from './app.routes';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
//import { DataService } from './service/data.service';
import { HomeModule } from './home/home.module'; // Import HomeModule
import { AppYoutubePlayerModule } from './app-youtube-player/app-youtube-player.module';
import { FullScreenIframeModule } from './full-screen-iframe/full-screen-iframe.module';
import { FormsModule } from '@angular/forms';
@NgModule({
imports: [
    CommonModule, 
    BrowserModule,
    HttpClientModule,
    HomeModule,
    AppRoutesModule,
    AppYoutubePlayerModule,
    FullScreenIframeModule,
    FormsModule

    ],
    declarations: [AppComponent],
    bootstrap: [AppComponent ],
})
export class AppModule { }