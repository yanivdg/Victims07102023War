import { Component, ElementRef, OnInit,AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
    selector: 'app-youtube-player',
    templateUrl: './app-youtube-player.component.html',
    styleUrl: './app-youtube-player.component.css'
})

export class AppYoutubePlayerComponent implements AfterViewInit {
    width: number | undefined;
    height: number | undefined;
  
    constructor(private el: ElementRef,private route: ActivatedRoute) {}
     playerVars:any;
    player: YT.Player | null = null;  // Initialize to null
    videoId = '9eDzojXuMZY'; // replace with your video ID
     
    

    ngOnInit():void{
        // Retrieving parameters in the child component
        this.route.queryParams.subscribe(params => {
          const userchoice = params['mute'];
          if(userchoice > 0)
            this.playVideoSound();
          else this.cancelPlayback();
        });
    }
    ngAfterViewInit() {
         const div = this.el.nativeElement.querySelector('.youtubewrap');
        const computedStyle = window.getComputedStyle(div);
  
        this.width = parseInt(computedStyle.width.replace('px', ''), 10)
        this.height = parseInt(computedStyle.height.replace('px', ''), 10)
      }
      onPlayerReady(event: YT.PlayerEvent) {
        this.player = event.target as YT.Player;  // Type assertion
      }
      
      playVideoSound() {
        // Unmute the player:
        this.playerVars = {
          controls: 0,  // This disables the player controls
          loop: 1,      // This enables looping of the video
          autoplay: 1,  // This enables autoplay of the video
          disablekb: 1,  // This disables keyboard controls
          mute: 1,
          playlist: this.videoId  // This sets the playlist to the same video ID
      };
      this.player?.playVideo();
      }      
      cancelPlayback(){
                // Mute the player:
                this.playerVars = {
                  controls: 0,  // This disables the player controls
                  loop: 1,      // This enables looping of the video
                  autoplay: 1,  // This enables autoplay of the video
                  disablekb: 1,  // This disables keyboard controls
                  mute:0,
                  playlist: this.videoId  // This sets the playlist to the same video ID
              };
      }
}
