import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { HomeComponent } from './home.component';
import { DataService } from '../service/data.service';

import { FormsModule } from '@angular/forms';
import { AppYoutubePlayerModule } from '../app-youtube-player/app-youtube-player.module';
import { FullScreenIframeModule } from '../full-screen-iframe/full-screen-iframe.module';
//import { AppYoutubePlayerComponent } from '../app-youtube-player/app-youtube-player.component';
//import { SearchFilterComponent } from '../search-filter/search-filter.component'; // Import the SearchFilterComponent


@NgModule({
    declarations: [HomeComponent],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
      FormsModule,
      AppYoutubePlayerModule,
      FullScreenIframeModule,
      FormsModule
  ],
  providers: [DataService],
},)
export class HomeModule { }