import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.services';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-hotel',
  standalone : true , 
  imports : [CommonModule , FormsModule] ,
  templateUrl: './edit-hotel.component.html',
  styleUrls: ['./edit-hotel.component.css']
})
export class EditHotelComponent implements OnInit {
  hotelId: string = '';
  hotel: any = {
    name: '',
    location: '',
    description: '',
    pricePerNight: '' ,
    image: '',
    imageUrl: '',
  };

  rooms: any[] = [];
  selectedRoom: any = null;

  activeTab: 'hotel' | 'rooms' = 'hotel';
  loading: boolean = true;
  saving: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.hotelId = this.route.snapshot.paramMap.get('hotelId') || '';
    if (!this.hotelId) {
      alert('Missing hotel id');
      this.router.navigate(['/admin']);
      return;
    }

    this.loadData();
  }

  loadData() {
    this.loading = true;
    this.api.getHotelById(this.hotelId).subscribe({
      next: (res: any) => {
        if (!res) {
          alert('Hotel not found');
          this.router.navigate(['/admin']);
          return;
        }
        this.hotel = res;
        if (!this.hotel.imageUrl && this.hotel.image) {
          this.hotel.imageUrl = `assets/hotels/${this.hotel.image}`;
        }
      },
      error: (err) => {
        console.error(err);
        alert('Failed to load hotel');
        this.router.navigate(['/admin']);
      },
      complete: () => {
        this.api.getRoomsByHotel(this.hotelId).subscribe({
          next: (rooms: any[]) => {
            this.rooms = rooms || [];
            this.rooms = this.rooms.map((r, i) => {
              if (!r.imageUrl && r.image) r.imageUrl = `assets/rooms/${r.image}`;
              return r;
            });
          },
          error: (err) => {
            console.error('Failed to load rooms', err);
            this.rooms = [];
          },
          complete: () => this.loading = false
        });
      }
    });
  }

  setTab(t: 'hotel' | 'rooms') {
    this.activeTab = t;
  }

  pickRoom(room: any) {
    this.selectedRoom = { ...room };
  }

  saveHotel() {
    this.saving = true;
    this.api.updateHotel(this.hotelId, this.hotel).subscribe({
      next: () => {
        alert('✅ Hotel updated');
        this.saving = false;
        this.router.navigate(['/admin']);
      },
      error: (err) => {
        console.error(err);
        alert('❌ Failed to update hotel: ' + (err?.message || err));
        this.saving = false;
      }
    });
  }

  saveRoom() {
    if (!this.selectedRoom || !this.selectedRoom._id) {
      alert('Select a room first');
      return;
    }
    this.saving = true;
    this.api.updateRoom(this.selectedRoom._id, this.selectedRoom).subscribe({
  next: (res) => {
    alert('✅ Room updated');

    const idx = this.rooms.findIndex(r => r._id === this.selectedRoom._id);
    if (idx >= 0) this.rooms[idx] = { ...res };

    this.rooms[idx].imageUrl = this.rooms[idx].imageUrl + '?v=' + new Date().getTime();

    this.selectedRoom = null;
    this.saving = false;
  },
  error: (err) => {
    console.error(err);
    alert('❌ Failed to update room: ' + (err?.message || err));
    this.saving = false;
  }
});

  }

  cancelRoomEdit() {
    this.selectedRoom = null;
  }

  deleteRoom(roomId: string) {
    if (!confirm('⚠️ Are you sure you want to delete this room?')) return;
    this.api.deleteRoom(roomId).subscribe({
      next: () => {
        alert('✅ Room deleted');
        this.rooms = this.rooms.filter(r => r._id !== roomId);
        if (this.selectedRoom && this.selectedRoom._id === roomId) this.selectedRoom = null;
      },
      error: (err) => {
        console.error(err);
        alert('❌ Failed to delete room: ' + (err?.message || err));
      }
    });
  }

  goBack() {
    this.router.navigate(['/admin']);
  }
}
