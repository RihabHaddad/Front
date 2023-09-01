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
  driverId = '4';
  driverKPIs: any[] = [];
    data: any[] = [];
    private dataSubscription: Subscription;

  constructor(private kpiService:KpiService,private dataService: DataService) { }

  ngOnInit(): void {
    this.loadDriverKPIs(); 
    this.loadData();
  }
  loadData() {
    this.dataSubscription = this.dataService.getDataFromSpark2().subscribe(
      response => {
        this.data = response;
      },
      error => {
        console.error('API request error:', error);
      }
    );
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
