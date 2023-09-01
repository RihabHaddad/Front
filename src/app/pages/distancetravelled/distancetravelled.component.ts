// distancetravelled.component.ts
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Distance } from './Distancemodel';
import { DistanceService } from './DistanceService';
import { DataService } from '../dashboard/DataService';

@Component({
  selector: 'app-distancetravelled',
  templateUrl: './distancetravelled.component.html',
  styleUrls: ['./distancetravelled.component.scss']
})
export class DistancetravelledComponent implements OnInit {
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() svgIcon: string = ''; // Le nom de l'icône SVG à afficher
  @Input() iconColor: string = '';
  @Input() color: string = '';
  @Input() distance: number = 0; //
  distanceData: Distance;

  @ViewChild('lineChartCanvas', { static: true }) lineChartCanvas: ElementRef;

  lineChartData: any = {
    labels: [],
    datasets: [{
      label: 'Distance',
     
    }]
  };


  constructor(private distanceService: DistanceService,private dataService: DataService) {}

  ngOnInit(): void {
    
    this.distanceService.getDistanceForDriverId1().subscribe(data => {
      this.distanceData = data;
    });
  }
}
