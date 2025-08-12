import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.services';

@Component({
  selector: 'app-add-room',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-room.component.html',
  styleUrls: ['./add-room.component.css']
})
export class AddRoomComponent implements OnInit {

  roomData = {
    hotelId: '',
    roomType: '',
    capacity: 1,
    price: 0,
    status: 'available',
    imageUrl: ''
  };

  constructor(
    private api: ApiService,
    private route: ActivatedRoute,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.roomData.hotelId = this.route.snapshot.paramMap.get('hotelId') || '';
  }

  saveRoom() {
    if (!this.roomData.roomType || !this.roomData.price) {
      alert('⚠️ Please fill all required fields');
      return;
    }

    this.api.addRoom(this.roomData).subscribe({
      next: () => {
        alert('✅ Room added successfully');
        this.router.navigate(['/admin']); 
      },
      error: (err) => alert('❌ Failed to add room: ' + err.message)
    });
  }

  cancel() {
    this.router.navigate(['/admin']);
  }
}
