import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { NavbarhomeComponent } from "./components/navbarhome/navbarhome.component"; 
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, NavbarhomeComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Hotel Booking Frontend';
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token'); 
  }
}
