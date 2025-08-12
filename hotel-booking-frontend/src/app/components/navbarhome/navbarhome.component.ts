import { Component } from '@angular/core';
import { RouterModule , Router } from '@angular/router';

@Component({
  selector: 'app-navbarhome',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navbarhome.component.html',
  styleUrl: './navbarhome.component.css'
})
export class NavbarhomeComponent {
 constructor(private router: Router) {}

  logout() {
    localStorage.removeItem('token');   
    this.router.navigate(['/']);        
  }
}
