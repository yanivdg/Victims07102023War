import { Component, ElementRef, Renderer2, AfterViewInit } from '@angular/core';

@Component({
    selector: 'app-youtube-player',
    templateUrl: './app-youtube-player.component.html',
    styleUrl: './app-youtube-player.component.css'
})

export class AppYoutubePlayerComponent implements AfterViewInit {
    width: number | undefined;
    height: number | undefined;
  
    constructor(private el: ElementRef) {}

    videoId = '9eDzojXuMZY'; // replace with your video ID
    playerVars = {
        controls: 0,  // This disables the player controls
        loop: 1,      // This enables looping of the video
        autoplay: 1,  // This enables autoplay of the video
        disablekb: 1,  // This disables keyboard controls
        mute: 1,
        playlist: this.videoId  // This sets the playlist to the same video ID
    };
    ngAfterViewInit() {
        const div = this.el.nativeElement.querySelector('.youtubewrap');
        const computedStyle = window.getComputedStyle(div);
  
        this.width = parseInt(computedStyle.width.replace('px', ''), 10)
        this.height = parseInt(computedStyle.height.replace('px', ''), 10)
      }
}

//https://www.youtube.com/watch?v=4iEq2hUZMMQ