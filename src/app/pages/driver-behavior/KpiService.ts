import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class KpiService {
  private baseUrl = 'http://localhost:8002'; // L'URL de votre serveur

  constructor(private http: HttpClient) {}

  getDriverKPIs(driverId: string): Observable<any> {
    const url = `${this.baseUrl}/kpi/${driverId}`;
    return this.http.get(url);
  }
  getLatestSpeedData() {
    return this.http.get<any>('http://localhost:8002/latest_speed_data'); // Remplacez l'URL par votre endpoint
  }

}
