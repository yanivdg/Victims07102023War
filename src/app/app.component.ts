import { Component, OnInit } from '@angular/core';
import { Router  } from '@angular/router';
//import { HomeComponent } from './home/home.component';
//import { HomeModule } from './home/home.module';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  
  showContent = true;
  title = "User";
 constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
    const currentURL = window.location.href;

// Check if the URL does not contain 'localhost'
if (!currentURL.includes('localhost')) {
  // If the URL does not contain 'localhost', find and click a button by its ID
  this.navigateToHome();
  }
  }

 navigateToHome(): void {
   this.router.navigate(['/home']); // Navigate to the 'home' route on button click
   this.showContent = false;

}
}

