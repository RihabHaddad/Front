import { Component, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/pages/dashboard/DataService';
import { KpiService } from 'src/app/pages/driver-behavior/KpiService';

@Component({
  selector: 'app-mixed-widget1',
  templateUrl: './mixed-widget1.component.html',
})
export class MixedWidget1Component {
  @Input() color: string = '';
  driverId = '1';
  driverKPIs: any[] = [];
  data: any[] = [];
  private dataSubscription: Subscription;

  constructor(private kpiService: KpiService, private dataService: DataService) {}

  ngOnInit(): void {
    console.log('Component initialized');
    this.loadDriverKPIs();
    this.loadData();
  }

  loadData() {
    console.log('Loading data...');
    this.dataSubscription = this.dataService.getDataFromSpark().subscribe(
      response => {
        console.log('Data loaded:', response);
        this.data = response;
      },
      error => {
        console.error('API request error:', error);
      }
    );
  }

  ngOnDestroy(): void {
    console.log('Component destroyed');
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe();
    }
  }

  trackByDriverId(index: number, item: any) {
    return item.DriverId;
  }

  loadDriverKPIs(): void {
    console.log('Loading driver KPIs...');
    this.kpiService.getDriverKPIs(this.driverId).subscribe(
      (data) => {
        console.log('Driver KPIs:', data);
        this.driverKPIs = data;
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }
}
