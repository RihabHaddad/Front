// line-chart.component.ts
import { Component, Input, AfterViewInit, ViewChild, ElementRef, OnChanges, SimpleChanges } from '@angular/core';
import Chart from 'chart.js/auto';
import { DataService } from '../dashboard/DataService';
import { DistanceTimeData } from '../distancetravelled/Distancetmodel';

@Component({
  selector: 'app-line-chart',
  template: '<canvas #lineChartCanvas></canvas>',
})
export class LineChartComponent implements AfterViewInit, OnChanges {
  @Input() chartData: any; // Entrée pour les données du graphique
  @ViewChild('lineChartCanvas', { static: true }) lineChartCanvas: ElementRef;
  private chart: Chart; // Référence au graphique Chart.js

  constructor(private dataService: DataService) {}

  ngAfterViewInit(): void {
    const ctx: CanvasRenderingContext2D = this.lineChartCanvas.nativeElement.getContext('2d');

    this.createChart(ctx);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.chartData && this.chart) {
      this.chart.data = this.chartData;
      this.chart.update();
    }
  }

  private createChart(ctx: CanvasRenderingContext2D): void {
    this.dataService.getDistanceAndTime().subscribe((data: DistanceTimeData[]) => {
      console.log(data);
      this.chartData = {
        labels: data.map(entry => entry.Time),
        datasets: [{
          label: 'Distance',
          data: data.map(entry => entry.Distance),
          borderColor: 'rgba(75,192,192,1)',
          fill: false,
        }]
      };

      this.chart = new Chart(ctx, {
        type: 'line',
        data: this.chartData,
        options: {
          responsive: true,
          scales: {
            x: {
              display: false,
              title: {
                display: false,
                text: 'Time',
              },
            },
            y: {
              display: true,
              title: {
                display: false,
                text: 'Distance',
              },
            },
          },
        },
      });
    });
  }
}
