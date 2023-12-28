import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppYoutubePlayerComponent } from './app-youtube-player.component';
import { YouTubePlayerModule } from '@angular/youtube-player';


@NgModule({
    declarations: [AppYoutubePlayerComponent],
    imports: [CommonModule, YouTubePlayerModule],
    exports: [AppYoutubePlayerComponent]
},)
export class AppYoutubePlayerModule { }