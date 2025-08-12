import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.services';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-hotel',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './add-hotel.component.html',
  styleUrls: ['./add-hotel.component.css']
})
export class AddHotelComponent {
  hotel = {
    name: '',
    location: '',
    description: '',
    pricePerNight: null,
    imageUrl: ''
  };

  constructor(private api: ApiService, private router: Router) {}

  submitHotel() {
    if (!this.hotel.name || !this.hotel.location || !this.hotel.pricePerNight) {
      alert('⚠️ Please fill all required fields');
      return;
    }

    this.api.addHotel(this.hotel).subscribe({
      next: () => {
        alert('✅ Hotel added successfully');
        this.router.navigate(['/admin']); 
      },
      error: (err) => alert('❌ Failed to add hotel: ' + err.message)
    });
  }
}
