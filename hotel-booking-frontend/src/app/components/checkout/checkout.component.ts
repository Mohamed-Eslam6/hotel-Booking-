import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.services';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [FormsModule, CommonModule, NavbarComponent],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  roomId!: string;
  room: any;
  nights: number = 1;
  paymentMethod: string = 'card';
  cardNumber: string = '';

  constructor(private route: ActivatedRoute, private api: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.roomId = this.route.snapshot.paramMap.get('roomId')!;
    
    this.api.getRoomById(this.roomId).subscribe({
      next: (res) => this.room = res,
      error: (err) => console.error('❌ Error loading room', err)
    });
  }

  confirmBooking() {
    const userEmail = localStorage.getItem('email') || 'guest@example.com';

    if (this.paymentMethod === 'card') {
      const cardRegex = /^\d{12,19}$/;
      if (!cardRegex.test(this.cardNumber)) {
        alert('⚠️ Please enter a valid card number (at least 12 digits).');
        return;
      }
    }

    const checkIn = new Date();
    const checkOut = new Date();
    checkOut.setDate(checkOut.getDate() + this.nights);

    const bookingData = {
      room: this.roomId,
      checkIn: checkIn.toISOString(),
      checkOut: checkOut.toISOString(),
      paymentMethod: this.paymentMethod,
      cardNumber: this.paymentMethod === 'card' ? this.cardNumber : '',
      userEmail: userEmail
    };

    this.api.bookRoom(bookingData).subscribe({
      next: () => {
        alert('✅ Booking confirmed!');
        this.router.navigate(['/contact']);
      },
      error: (err) => {
        console.error('❌ Booking failed:', err);
        alert('❌ Could not complete booking.');
      }
    });
  }

}
