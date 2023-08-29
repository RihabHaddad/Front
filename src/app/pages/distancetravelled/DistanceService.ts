import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Distance } from './Distancemodel';

@Injectable({
  providedIn: 'root'
})
export class DistanceService {
  private apiUrl = 'http://localhost:8002'; // Remplacez par l'URL de votre serveur Express

  constructor(private http: HttpClient) {}

  getDistanceForDriverId1(): Observable<Distance> {
    return this.http.get<Distance>(`${this.apiUrl}/api/total-distance/1`); // Remplacez "1" par le driverId que vous souhaitez récupérer
  }
  
}
