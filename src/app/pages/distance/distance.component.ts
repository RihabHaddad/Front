import * as L from 'leaflet';
// driver-map.component.ts
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-distance',
  templateUrl: './distance.component.html',
  styleUrls: ['./distance.component.scss']
})
export class DistanceComponent implements OnInit {

    
  private map: L.Map;
  private markers: L.Marker[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.initMap();
    this.fetchAndDisplayMarkers();
  }

  private initMap(): void {
    this.map = L.map('map').setView([33.8869, 9.5375], 7);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);
  }

  private fetchAndDisplayMarkers(): void {
    this.http.get<any[]>('http://localhost:8002/api/drivers') // Update the URL to your actual API endpoint
      .subscribe(
        drivers => {
          drivers.forEach(driver => {
            const location: L.LatLngExpression = [driver.latitude, driver.longitude];
            const marker = L.marker(location).addTo(this.map);
            this.markers.push(marker);
          });
        },
        error => {
          console.error('Error fetching driver locations:', error);
        }
      );
  }
}