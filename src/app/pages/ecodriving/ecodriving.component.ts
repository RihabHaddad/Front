import { Component, OnInit } from '@angular/core';
import { KpiService } from '../driver-behavior/KpiService';

@Component({
  selector: 'app-ecodriving',
  templateUrl: './ecodriving.component.html',
  styleUrls: ['./ecodriving.component.scss']
})
export class EcodrivingComponent implements OnInit {
  driverId = '4';
  driverKPIs: any[] = [];
  constructor(private kpiService:KpiService) { }

  ngOnInit(): void {
    this.loadDriverKPIs();
  }
  loadDriverKPIs(): void {
    console.log('Loading eco KPIs...');
    this.kpiService.getecoKPIs(this.driverId).subscribe(
      (data) => {
        console.log('eco KPIs:', data);
        this.driverKPIs = data;
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }
}
