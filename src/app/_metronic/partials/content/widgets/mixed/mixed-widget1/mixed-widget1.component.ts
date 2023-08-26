import { Component, Input } from '@angular/core';
import { KpiService } from 'src/app/pages/driver-behavior/KpiService';

@Component({
  selector: 'app-mixed-widget1',
  templateUrl: './mixed-widget1.component.html',
})
export class MixedWidget1Component {
  @Input() color: string = '';
  driverId = '1'; // ID du driver que vous souhaitez afficher
  driverKPIs: any[] = []; // Tableau pour stocker les KPI du driver

  constructor(private kpiService: KpiService) {}

  ngOnInit(): void {
    this.loadDriverKPIs();
  }

  loadDriverKPIs(): void {
    this.kpiService.getDriverKPIs(this.driverId).subscribe(
      (data) => {
        console.log('Driver KPIs:', data);
        this.driverKPIs = data; // Mettre à jour les KPIs du driver
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }
}
