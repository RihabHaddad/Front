import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccidentService {
  private apiUrl = 'http://localhost:8002/acc'; // Remplacez par l'URL de votre API backend

  constructor(private http: HttpClient) { }

  getAccidents(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
