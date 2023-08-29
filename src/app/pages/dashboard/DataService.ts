import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getDataFromSpark(): Observable<any[]> {
    const apiUrl = 'http://192.168.136.4:5000/api/data';
    return this.http.get<any[]>(apiUrl);
  }
}
