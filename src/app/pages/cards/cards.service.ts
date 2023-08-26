import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Card } from './card.model';


@Injectable({
  providedIn: 'root'
})
export class CardService {
  private apiUrl = 'http://localhost:8002/api/car'; // Replace with your API endpoint
  private apiUrll = 'http://localhost:8002'; 
  constructor(private http: HttpClient) { }

  // Create a new card
  createCard(card: Card): Observable<Card> {
    return this.http.post<Card>(`${this.apiUrl}/addcar`, card);
  }

  // Get all cards
  getAllCards(): Observable<Card[]> {
    return this.http.get<Card[]>(`${this.apiUrl}/`);
  }

  // Get a single card by ID
  getCardById(cardId: string): Observable<Card> {
    return this.http.get<Card>(`${this.apiUrl}/${cardId}`);
  }


  updateCard(card: Card): Observable<Card> {
    const url = `${this.apiUrl}/updatecar/${card._id}`; // Assuming your API endpoint for updating a user is /users/:id
    return this.http.put<Card>(url, card);
  }
  // Delete a card by ID
  deleteCard(_id: string): Observable<Card> {
    return this.http.delete<Card>(`${this.apiUrl}/deletecar/${_id}`);
  }
  getCarStats(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrll}/calculateCarsByBrand`);
  }
}
