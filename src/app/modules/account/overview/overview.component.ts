import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { FuelConsumptionService } from 'src/app/_metronic/partials/content/widgets/mixed/mixed-widget11/FuelConsumptionService';
import { DataService } from 'src/app/pages/dashboard/DataService';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
})
export class OverviewComponent implements OnInit {
  @Input() title = '';
  @Input() description = '';
  @Input() avatar = '';
  data: any[] = [];
  @Input() driverId: string = '';

  private dataSubscription: Subscription;


  fuelConsumptionData: any[];

  constructor(private dataService: DataService,private fuelService: FuelConsumptionService,private route: ActivatedRoute) {}
  ngOnInit(): void {     const driverId = '1';
  this.route.params.subscribe(params => {
    this.driverId = params['DriverId'];
    this.loadData(this.driverId);
  });
  // Appelez le service pour obtenir les données de consommation de carburant
  this.fuelService.getFuelConsumption(driverId).subscribe((data) => {
    this.fuelConsumptionData = data;
  });

    
  }
  
   

  loadData(driverId:string) {
    this.dataSubscription = this.dataService.getDataFromSpark2().subscribe(
      response => {
        this.data = response;
      },
      error => {
        console.error('API request error:', error);
      }
    );
    }}

