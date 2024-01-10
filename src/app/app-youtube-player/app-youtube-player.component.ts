import { Component, ElementRef,ViewChild, OnInit,AfterViewInit , Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {LogService} from '../service/log.service';
@Component({
    selector: 'app-youtube-player',
    templateUrl: './app-youtube-player.component.html',
    styleUrl: './app-youtube-player.component.css'
})

export class AppYoutubePlayerComponent implements OnInit,AfterViewInit {
     unmute:number = 0;
    YTwidth: number | undefined;// = 500;
    YTheight: number|undefined;
    @Input() videoId: string = '';
    @Input() youtubedivstyle:any; 
    constructor(private el: ElementRef,private route: ActivatedRoute,private logService:LogService) {}

    @Input() playerVars:any;
    player: YT.Player | null = null;  // Initialize to null
    isMuted = false;
    isPlayed = false;

    ngOnInit(): void
    {
        try {
            //alert(JSON.stringify(this.playerVars));
            // Retrieving parameters in the child component
            this.route.queryParams.subscribe(params => {
                const playsound = params['mute'] == 0?true:false;
                if (playsound)
                {
                    this.playVideoSound();
                }
                else
                {
                    this.cancelPlayback();
                }
            });
        }
        catch (error: any) {
            alert(error.message);
        }
    }
    ngAfterViewInit() {
        try {
            //alert(JSON.stringify(this.playerVars));
            const div = this.el.nativeElement.querySelector('.youtubewrap');
            const computedStyle = window.getComputedStyle(div);

            this.YTwidth = parseInt(computedStyle.width.replace('px', ''), 10)
            this.YTheight = parseInt(computedStyle.height.replace('px', ''), 10)
        }
        catch (error: any) {
            alert(error.message);
            this.logService.logToServer(`Error occurred: ${error.message}`);
        }
    }

      onPlayerReady(event: YT.PlayerEvent) 
      {
          this.player = event.target as YT.Player;  // Type assertion
      }
      
      toggleMuteVideo()
      {
        if(this.isMuted)
        {
            this.playerVars = {
                autoplay: 1,
                controls: 0,
                loop: 1,      // This enables looping of the video
                disablekb: 1,  // This disables keyboard controls
                playlist: this.videoId,  // This sets the playlist to the same video ID
                mute: 0
            };
            this.isMuted = false;
        }
        else
        {
            this.playerVars = {
                autoplay: 1,
                controls: 0,
                loop: 1,      // This enables looping of the video
                disablekb: 1,  // This disables keyboard controls
                playlist: this.videoId,  // This sets the playlist to the same video ID
                mute: 1
            };
            this.isMuted = true;
        }
      }
        
    playVideoSound()
    {
        try {
            // Unmute the player:
            this.playerVars = {
                mute: 0,
                controls: 0,  // This disables the player controls
                loop: 1,      // This enables looping of the video
                autoplay: 1,  // This enables autoplay of the video
                disablekb: 1,  // This disables keyboard controls
                playlist: this.videoId  // This sets the playlist to the same video ID
            };
            this.player?.playVideo();
            this.isMuted = false;
        }
        catch (error: any) {
            alert(error.message);
            this.logService.logToServer(`Error occurred: ${error.message}`);
        }
    }    
    cancelPlayback() {
        try {
            // Mute the player:
            this.playerVars = {
                mute: 1,
                controls: 0,  // This disables the player controls
                loop: 1,      // This enables looping of the video
                autoplay: 1,  // This enables autoplay of the video
                disablekb: 1,  // This disables keyboard controls
                playlist: this.videoId  // This sets the playlist to the same video ID
            };

        }
        catch (error: any) {
            alert(error.message);
            this.logService.logToServer(`Error occurred: ${error.message}`);
        }
    }
}
