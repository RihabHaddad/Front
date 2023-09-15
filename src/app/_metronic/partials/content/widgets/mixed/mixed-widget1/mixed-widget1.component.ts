import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/pages/dashboard/DataService';
import { KpiService } from 'src/app/pages/driver-behavior/KpiService';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-mixed-widget1',
  templateUrl: './mixed-widget1.component.html',
})
export class MixedWidget1Component implements OnInit {
  @Input() color: string = '';
  driverKPIs: any[] = [];
  data: any[] = [];
  private dataSubscription: Subscription;
  @Input() driverId: string = '';

  constructor(
    private kpiService: KpiService,
    private dataService: DataService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    console.log('Component initialized');
    // Assurez-vous d'obtenir le driverId depuis les paramètres de l'URL ou d'une autre source
    this.route.params.subscribe(params => {
      this.driverId = params['DriverId'];
      this.loadDriverKPIs(this.driverId);
      this.loadData(this.driverId);
    });
  }
  
  loadData(driverId: string) {
    console.log('Loading data...');
    this.dataSubscription = this.dataService.getDataFromSpark3(this.driverId).subscribe(
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

  loadDriverKPIs(driverId: string): void {
    console.log('Loading driver KPIs for driver ID:', driverId);
    this.kpiService.getDriverKPIs(driverId).subscribe(
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
