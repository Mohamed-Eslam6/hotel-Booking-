import { Component , OnInit} from '@angular/core';
import { ActivatedRoute, RouterModule , Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.services';

@Component({
  selector: 'app-hotel-details',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './hotel-details.component.html',
  styleUrl: './hotel-details.component.css'
})
export class HotelDetailsComponent implements OnInit {
  hotel: any;

  constructor(private route: ActivatedRoute, private api: ApiService , private router: Router) {}
  private prepareImage(hotel: any, id: number) {
    if (!hotel.imageUrl && !hotel.image) {
      hotel.imageUrl = `../../../assets/hotels/hotel${id}.jpg`;
    } else if (!hotel.imageUrl && hotel.image) {
      hotel.imageUrl = `../../../assets/hotels/${hotel.image}`;
    }
    return hotel;
  }

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      const id = Number(idParam);
      this.api.getHotelById(idParam).subscribe({
        next: (data: any) => {
          if (!data) {
            this.router.navigate(['/hotels']);
            return;
          }
          this.hotel = this.prepareImage(data, id);
        },
        error: () => {
          this.router.navigate(['/hotels']);
        }
      });
    }
  }
  
}