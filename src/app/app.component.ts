import { Component  } from '@angular/core';
import { Router  } from '@angular/router';
//import { HomeComponent } from './home/home.component';
//import { HomeModule } from './home/home.module';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  
  showContent = true;
  title = "User";
 constructor(
    private router: Router,
  ) { }

 navigateToHome(): void {
   this.router.navigate(['/home']); // Navigate to the 'home' route on button click
   this.showContent = false;

}
}

