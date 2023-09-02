import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RatingService {
  private apiUrl = 'https://localhost:8002/api/ratings'; // Remplacez par l'URL de votre serveur

  constructor(private http: HttpClient) { }

  sendRating(rating: number) {
    // Envoie la note au serveur via une requête POST
    return this.http.post(this.apiUrl, { rating });
  }
}
