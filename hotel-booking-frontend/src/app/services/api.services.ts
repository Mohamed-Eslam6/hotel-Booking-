// src/app/services/api.services.ts
import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private baseUrl = 'http://localhost:3333/api'; 

  constructor(private http: HttpClient) {}

  getHotels(page: number = 1, limit: number = 10): Observable<any> {
  return this.http.get(`${this.baseUrl}/hotels?page=${page}&limit=${limit}`);
}

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/users/login`, { email, password });
  }

  register(name: string, email: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/users/register`, { name, email, password });
  }
  getHotelById(id: string) {
  return this.http.get(`${this.baseUrl}/hotels/${id}`);
  }

  createBooking(roomId: string, checkIn: string, checkOut: string): Observable<any> {
  return this.http.post(`${this.baseUrl}/bookings`, { room: roomId, checkIn, checkOut });
  }

  getAllBookings() {
  const token = localStorage.getItem('token') || '';
  return this.http.get(`${this.baseUrl}/bookings/all`, {
    headers: { Authorization: token }
  });
}


  getRoomById(id: string) {
  return this.http.get(`${this.baseUrl}/rooms/${id}`);
}

bookRoom(bookingData: any) {
  return this.http.post(`${this.baseUrl}/bookings`, bookingData);
}


  getMyBookings(email: string) {
  return this.http.get(`${this.baseUrl}/bookings/mybookings?email=${email}`);
}

 getHotelsAdmin(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.baseUrl}/hotels`, { headers });
  }


 deleteHotel(id: string): Observable<any> {
  const token = localStorage.getItem('token') || '';
  const headers = new HttpHeaders().set('Authorization', token); 
  return this.http.delete(`${this.baseUrl}/hotels/${id}`, { headers });
}

addHotel(hotelData: any) {
  const token = localStorage.getItem('token') || '';
  const headers = new HttpHeaders().set('Authorization', token); 
  return this.http.post(`${this.baseUrl}/hotels/add`, hotelData, { headers });
}
addRoom(roomData: any) {
  const token = localStorage.getItem('token') || '';
  const headers = new HttpHeaders().set('Authorization', token); 
  return this.http.post(`${this.baseUrl}/rooms/add`, roomData, { headers });
}

getRoomsByHotel(hotelId: string) {
  return this.http.get<any[]>(`${this.baseUrl}/rooms/byhotel/${hotelId}`);
}

deleteRoom(roomId: string) {
  const token = localStorage.getItem('token') || '';
  const headers = new HttpHeaders().set('Authorization', token);
  return this.http.delete(`${this.baseUrl}/rooms/${roomId}`, { headers });
}
updateHotel(id: string, hotelData: any): Observable<any> {
  const token = localStorage.getItem('token') || '';
  const headers = new HttpHeaders().set('Authorization', token);
  return this.http.put(`${this.baseUrl}/hotels/${id}`, hotelData, { headers });
}

updateRoom(id: string, roomData: any): Observable<any> {
  const token = localStorage.getItem('token') || '';
  const headers = new HttpHeaders().set('Authorization', token);
  return this.http.put(`${this.baseUrl}/rooms/${id}`, roomData, { headers });
}
getCustomers() {
  const token = localStorage.getItem('token') || '';
  const headers = new HttpHeaders().set('Authorization', token);
  return this.http.get<any[]>(`${this.baseUrl}/users/customers`);
}







}
