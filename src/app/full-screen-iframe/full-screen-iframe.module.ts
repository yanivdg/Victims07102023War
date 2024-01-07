import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullScreenIframeComponent } from './full-screen-iframe.component';
import { AppYoutubePlayerModule } from '../app-youtube-player/app-youtube-player.module';

@NgModule({
    declarations: [
        FullScreenIframeComponent
    ],
    imports: [CommonModule,AppYoutubePlayerModule],
    exports:[FullScreenIframeComponent]
})
export class FullScreenIframeModule { }