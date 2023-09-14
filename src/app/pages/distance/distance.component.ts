import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { AccidentService } from './AccidentService';

@Component({
  selector: 'app-distance',
  templateUrl: './distance.component.html',
  styleUrls: ['./distance.component.scss']
})
export class DistanceComponent implements OnInit {
  private map: L.Map;
  private markers: L.Marker[] = [];

  constructor(private accidentService: AccidentService) {} // Injectez votre service AccidentService

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
    this.accidentService.getAccidents() // Utilisez la méthode du service pour obtenir les données d'accidents
      .subscribe(
        accidents => {
          accidents.forEach(accident => {
            const location: L.LatLngExpression = [accident.Latitude, accident.Longitude];
            const marker = L.marker(location).addTo(this.map);
            marker.bindPopup(`Driver ID: ${accident._id}<br>Altitude: ${accident.Altitude}<br>Status: ${accident.Status}`);

            // Zoom sur l'emplacement de l'accident avec un niveau de zoom
            this.map.setView(location, 15);
          });
        },
        error => {
          console.error('Error fetching accidents:', error);
        }
      );
  }
}
