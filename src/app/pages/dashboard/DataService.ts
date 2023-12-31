import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }
  private baseUrlsp = 'http://192.168.136.4:5000'; 
  getDataFromSpark3(driverId: string): Observable<any[]> {
    const baseUrlsp  = `${this.baseUrlsp}/api/data/${driverId}`;; // Replace with your data API URL
    return this.http.get<any[]>(baseUrlsp);
  }
  getDataFromSpark(): Observable<any[]> {
    const apiUrl = 'http://192.168.136.4:5002/api/data'; // Replace with your data API URL
    return this.http.get<any[]>(apiUrl);
  }

  getDataFromSpark2(): Observable<any[]> {
    const apiUrl = 'http://192.168.136.4:5001/api/data/eco'; // Replace with your eco data API URL
    return this.http.get<any[]>(apiUrl);
  }
  getDistanceAndTime(): Observable<any> {
    const apiUrl ='http://localhost:8002/api/distance/1';
    return this.http.get<any>(apiUrl);
  }

}
