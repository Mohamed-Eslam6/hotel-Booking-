import { Component } from '@angular/core';
import { NavbarhomeComponent } from "../navbarhome/navbarhome.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarhomeComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
