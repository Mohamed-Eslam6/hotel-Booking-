import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HotelsComponent } from './components/hotels/hotels.component';
import { ContactComponent } from './components/contact/contact.component';
import { HotelDetailsComponent } from './components/hotel-details/hotel-details.component';
import {CheckoutComponent} from './components/checkout/checkout.component';
import { AdminPageComponent } from './components/adminpage/adminpage.component';
import { AdminGuard } from './auth/admin.guard';
import { AddHotelComponent} from './components/add-hotel/add-hotel.component'
import {AddRoomComponent} from './components/add-room/add-room.component'
import { EditHotelComponent } from './components/edit-hotel/edit-hotel.component';


export const appRoutes: Routes = [
  { path: '', component: HomeComponent , pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'hotels', component: HotelsComponent },
  { path: 'hotels/:id', component: HotelDetailsComponent },
  { path: 'contact', component: ContactComponent } ,
  { path: 'checkout/:roomId', component: CheckoutComponent },
  { path: 'admin', component: AdminPageComponent, canActivate: [AdminGuard] } ,
  { path: 'add-hotel', component: AddHotelComponent } ,
  { path: 'add-room/:hotelId', component: AddRoomComponent },
  {path : 'edit-hotel/:hotelId' , component:EditHotelComponent}

];
