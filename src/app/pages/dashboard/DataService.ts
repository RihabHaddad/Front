import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

 
  getDataFromSpark(): Observable<any[]> {
    const apiUrl = 'http://192.168.136.4:5000/api/data'; // Replace with your data API URL
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
