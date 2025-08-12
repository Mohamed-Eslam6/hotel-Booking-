import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { RouterModule } from '@angular/router';
import { ApiService } from '../../services/api.services';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [NavbarComponent, RouterModule, FormsModule ,CommonModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']  
})
export class ContactComponent implements OnInit {

  bookings: any[] = [];
  loading = true;

  constructor(private api: ApiService) {}

  ngOnInit(): void {
  const userEmail = localStorage.getItem('email') || '';
  this.api.getMyBookings(userEmail).subscribe({
    next: (res : any) => {
      console.log('✅ MyBookings Data:', res);
      this.bookings = res.bookings || [];

      this.loading = false;
    },
    error: (err) => {
      console.error('❌ Error fetching bookings:', err);
      this.loading = false;
    }
  });
}

}
