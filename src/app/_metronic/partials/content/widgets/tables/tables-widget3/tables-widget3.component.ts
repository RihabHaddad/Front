import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/pages/dashboard/DataService';
import { KpiService } from 'src/app/pages/driver-behavior/KpiService';

@Component({
  selector: 'app-tables-widget3',
  templateUrl: './tables-widget3.component.html',
})
export class TablesWidget3Component implements OnInit {
  driverId = '1';
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