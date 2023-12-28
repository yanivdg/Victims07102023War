import { Component } from '@angular/core';

@Component({
    selector: 'app-youtube-player',
    templateUrl: './app-youtube-player.component.html',
    styleUrl: './app-youtube-player.component.css'
})

export class AppYoutubePlayerComponent {
    videoId = '9eDzojXuMZY'; // replace with your video ID
    playerVars = {
        controls: 0,  // This disables the player controls
        loop: 1,      // This enables looping of the video
        autoplay: 1,  // This enables autoplay of the video
        disablekb: 1,  // This disables keyboard controls
        mute: 0,
        playlist: '9eDzojXuMZY'  // This sets the playlist to the same video ID
    };
}

//https://www.youtube.com/watch?v=4iEq2hUZMMQ