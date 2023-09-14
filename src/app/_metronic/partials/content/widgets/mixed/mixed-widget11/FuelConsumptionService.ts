import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FuelConsumptionService {
  private baseUrl = 'http://localhost:8002/api/fuel'; // L'URL de votre API

  constructor(private http: HttpClient) {}

  getFuelConsumption(driverId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${driverId}`);
  }
}
