import { Component, ElementRef,ViewChild, OnInit,AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {LogService} from '../service/log.service';
@Component({
    selector: 'app-youtube-player',
    templateUrl: './app-youtube-player.component.html',
    styleUrl: './app-youtube-player.component.css'
})

export class AppYoutubePlayerComponent implements OnInit,AfterViewInit {
    YTwidth: number | undefined;
    YTheight: number | undefined;
  
    constructor(private el: ElementRef,private route: ActivatedRoute,private logService:LogService) {}
    playerVars:any;
    player: YT.Player | null = null;  // Initialize to null
    videoId = '9eDzojXuMZY'; // replace with your video ID
    isMuted = false;
    isPlayed = false;
    //@ViewChild('player') player!: YouTubePlayer;
    ngOnInit():void{
        // Retrieving parameters in the child component
        this.route.queryParams.subscribe(params => {
          const userchoice = params['mute'];
          if(userchoice > 0)
          {
            this.playVideoSound();
          }
          else this.cancelPlayback();
          this.isMuted = true;
        });
    }
    ngAfterViewInit() {
         const div = this.el.nativeElement.querySelector('.youtubewrap');
        const computedStyle = window.getComputedStyle(div);
  
        this.YTwidth = parseInt(computedStyle.width.replace('px', ''), 10)
        this.YTheight = parseInt(computedStyle.height.replace('px', ''), 10)
      }

      onPlayerReady(event: YT.PlayerEvent) {
        this.player = event.target as YT.Player;  // Type assertion
      }
      
      toggleMuteVideo()
      {
        this.playerVars = this.isMuted?{mute:1,autoplay: 1}:{mute:0,autoplay: 1};
        this.isMuted = !this.isMuted;
      }
        
      playVideoSound() {
        try
          {
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
        catch(error:any)
      {
        this.logService.logToServer(`Error occurred: ${error.message}`);
      }
  }      
      cancelPlayback(){
        try
        {
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
            catch(error:any)
            {
              this.logService.logToServer(`Error occurred: ${error.message}`);
            }
      }
}
