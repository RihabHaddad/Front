import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RatingService {
  private apiUrl = 'http://localhost:8002/api/ratings'; // Replace with your server URL

  constructor(private http: HttpClient) { }

  sendRating(userId: string, rating: number): Observable<any> {
    // Send the rating to the server using a POST request, including the driver's ID
    return this.http.post(`${this.apiUrl}/${userId}`, { rating });
  }
}
