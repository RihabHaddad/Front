import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FuelConsumptionService } from 'src/app/_metronic/partials/content/widgets/mixed/mixed-widget11/FuelConsumptionService';
import { DataService } from 'src/app/pages/dashboard/DataService';

@Component({
  selector: 'app-feeds',
  templateUrl: './feeds.component.html',
})
export class FeedsComponent implements OnInit {
  @Input() title = '';
  @Input() description = '';
  @Input() avatar = '';
  data: any[] = [];


  private dataSubscription: Subscription;


  fuelConsumptionData: any[];

  constructor(private dataService: DataService,private fuelService: FuelConsumptionService) {}
  ngOnInit(): void {     const driverId = '1';

  // Appelez le service pour obtenir les données de consommation de carburant
  this.fuelService.getFuelConsumption(driverId).subscribe((data) => {
    this.fuelConsumptionData = data;
  });
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
    }}
