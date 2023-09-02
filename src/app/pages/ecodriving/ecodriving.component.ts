import { Component, OnInit } from '@angular/core';
import { KpiService } from '../driver-behavior/KpiService';
import { DataService } from '../dashboard/DataService';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-ecodriving',
  templateUrl: './ecodriving.component.html',
  styleUrls: ['./ecodriving.component.scss']
})
export class EcodrivingComponent implements OnInit {
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  userRating: number = 0;

  setRating(rating: number) {
    this.userRating = rating;
    // Envoyez cette note au serveur ou à votre système de stockage de données ici
  }}