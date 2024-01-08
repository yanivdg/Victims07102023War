import { Component, OnInit  } from '@angular/core';
import { Router  } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  startPlayerVars:any|undefined;
  startvideoID: string = '';
  muteCode: number = 0;
  showContent = true;
  title = "User";
 constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    //this.startPlayerVars = {};
    const dev = '0';
 // Check if the URL does not contain 'localhost'
      if (!window.location.href.includes('localhost') && dev === '0') {
         //If the URL does not contain 'localhost', find and click a button by its ID
          this.navigateToHome();
       }
    }
placevalues():void{
this.startPlayerVars = 
{controls: 0,  
  loop: 1,
  autoplay: 1,  
  disablekb: 1, 
  playlist: 
  this.startvideoID,
  mute:this.muteCode}
}
 navigateToHome(): void {
    let queryParams = { mute: 1 };
    const confirmed = window.confirm('The Page involved videos with sound, do you agree to proceed with sound in the background?');
    if (confirmed) {
        // Use the YouTube player API to mute the player
        queryParams = { mute: 0 };
      }
    this.router.navigate(['/home'],{queryParams,skipLocationChange: true }); // Navigate to the 'home' route on button click
    this.showContent = false;
  }
}

