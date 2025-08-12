import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.services';
import { NavbarComponent } from "../navbar/navbar.component";
import { RouterModule , Router } from '@angular/router';


@Component({
  selector: 'app-hotels',
  standalone: true,
  imports: [CommonModule, NavbarComponent , RouterModule],
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.css']
})
export class HotelsComponent implements OnInit {
  hotels: any[] = [];
  loading = true;

  constructor(private api: ApiService, private router: Router) {}

  viewHotel(id: number) {
  this.router.navigate(['/hotels', id]); 
}

private prepareImage(hotel: any, index: number) {
    if (!hotel.imageUrl && !hotel.image) {
      hotel.imageUrl = `../../../assets/hotels/hotel${index + 1}.jpg`;
    } else if (!hotel.imageUrl && hotel.image) {
      hotel.imageUrl = `../../../assets/hotels/${hotel.image}`;
    }
    return hotel;
  }

  ngOnInit() {
 this.api.getHotels().subscribe({
      next: (data) => {
        this.hotels = data.map((hotel: any, index: number) =>
          this.prepareImage({ ...hotel }, index)
        ).map((h : any) => ({...h,
          rating: Math.floor(Math.random() * (7 - 3 + 1)) + 3
        }));
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }
}
