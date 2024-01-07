import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-full-screen-iframe',
  templateUrl: './full-screen-iframe.component.html',
  styleUrls: ['./full-screen-iframe.component.css'] // Use 'styleUrls' instead of 'styleUrl'
})
export class FullScreenIframeComponent {
  @Input() show = false;
  //@Input() youtubePlayer:YouTubePlayer|undefined;
  @Input() videoIdfullscreen: string|undefined;
  @Input() heightfullscreen: number|undefined;
  @Input() widthfullscreen: number|undefined;
  @Input() playerVarsfullscreen: any |undefined;

  showFullScreen: boolean = false;

  open(){
    
  }
  close() {
    this.show = false;
  }

}