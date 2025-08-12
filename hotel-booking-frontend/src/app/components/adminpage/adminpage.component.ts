import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.services';

@Component({
  selector: 'app-admin-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './adminpage.component.html',
  styleUrls: ['./adminpage.component.css']
})
export class AdminPageComponent implements OnInit {

  bookings: any[] = [];
  hotels: any[] = [];
  customers: any[] = [];
  selectedHotelRooms: any[] = [];  
  selectedHotelId: string = '';
  showRoomDeleteModal: boolean = false;
  loading = true;
  activeTab: string = 'hotels';

  constructor(private api: ApiService, public router: Router) {}

  ngOnInit(): void {
    this.loadBookings();
    this.loadHotels();
    this.loadCustomers();

  }

  setTab(tab: string) {
    this.activeTab = tab;
    if (tab === 'customers') {
    this.loadCustomers();
  }
  }

  loadCustomers() {
  this.api.getCustomers().subscribe({
    next: (res: any) => this.customers = res || [],
    error: (err) => console.error('❌ Error fetching customers', err)
  });
}

  
  

  loadBookings() {
    this.api.getAllBookings().subscribe({
      next: (res: any) => this.bookings = res || [],
      error: (err) => console.error('❌ Error fetching bookings', err)
    });
  }

  loadHotels() {
    this.api.getHotelsAdmin().subscribe({
      next: (res: any) => this.hotels = res.hotels || res || [],
      error: (err) => console.error('❌ Error fetching hotels', err),
      complete: () => this.loading = false
    });
  }

  goHome() { this.router.navigate(['/']); }
  goToAddHotel() { this.router.navigate(['/add-hotel']); }
  goToAddRoom(hotelId: string) { this.router.navigate(['/add-room', hotelId]); }

  editHotel(id: string) {
    this.router.navigate(['/edit-hotel', id]);
  }

  deleteHotel(id: string) {
    if (confirm('⚠️ Are you sure you want to delete this hotel?')) {
      this.api.deleteHotel(id).subscribe({
        next: () => {
          alert('✅ Hotel deleted successfully');
          this.loadHotels();
        },
        error: (err) => alert('❌ Failed to delete hotel: ' + err.message)
      });
    }
  }

  openDeleteRoom(hotelId: string) {
    this.selectedHotelId = hotelId;
    this.api.getRoomsByHotel(hotelId).subscribe({
      next: (rooms: any[]) => {
        this.selectedHotelRooms = rooms;
        this.showRoomDeleteModal = true;
      },
      error: (err) => alert('❌ Failed to fetch rooms: ' + err.message)
    });
  }

  confirmDeleteRoom(roomId: string) {
    if (confirm('⚠️ Are you sure you want to delete this room?')) {
      this.api.deleteRoom(roomId).subscribe({
        next: () => {
          alert('✅ Room deleted successfully');
          this.selectedHotelRooms = this.selectedHotelRooms.filter(r => r._id !== roomId);
          if (this.selectedHotelRooms.length === 0) this.showRoomDeleteModal = false;
        },
        error: (err) => alert('❌ Failed to delete room: ' + err.message)
      });
    }
  }

  closeModal() {
    this.showRoomDeleteModal = false;
  }

}
