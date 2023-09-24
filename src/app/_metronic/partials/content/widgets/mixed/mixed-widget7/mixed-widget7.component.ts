import { Component, Input, OnInit } from '@angular/core';
import { getCSSVariableValue } from '../../../../../kt/_utils';
import { FuelConsumptionService } from '../mixed-widget11/FuelConsumptionService';
@Component({
  selector: 'app-mixed-widget7',
  templateUrl: './mixed-widget7.component.html',
})
export class MixedWidget7Component implements OnInit {
  @Input() chartColor: string = '';
  @Input() chartHeight: string;
  chartOptions: any = {};

  constructor(private fuelService: FuelConsumptionService) {}

  ngOnInit(): void {
    const driverId = '1'; // Replace with the actual driver ID
    this.fuelService.getFuelConsumption(driverId).subscribe((fuelData: any) => {
      const fuelConsumptionData = fuelData.map((entry: any) => entry.FuelConsumption);
    this.chartOptions = getChartOptions(this.chartHeight, this.chartColor, fuelConsumptionData);
  });


function getChartOptions(chartHeight: string, chartColor: string ,fuelConsumptionData: number[]) {
  const baseColor = getCSSVariableValue('--bs-' + chartColor);
  const lightColor = getCSSVariableValue('--bs-light-' + chartColor);
  const labelColor = getCSSVariableValue('--bs-gray-700');
  const roundedFuelConsumptionData = fuelConsumptionData.map(value => Number(value.toFixed(2)));
  return {
    series: [roundedFuelConsumptionData ],
    chart: {
      fontFamily: 'inherit',
      height: chartHeight,
      type: 'radialBar',
    },
    plotOptions: {
      radialBar: {
        hollow: {
          margin: 0,
          size: '65%',
        },
        dataLabels: {
          name: {
            show: false,
            fontWeight: '700',
          },
          value: {
            color: labelColor,
            fontSize: '30px',
            fontWeight: '700',
            offsetY: 12,
            show: true,
            formatter: function (val: number) {
              return val + '%';
            },
          },
        },
        track: {
          background: lightColor,
          strokeWidth: '100%',
        },
      },
    },
    colors: [baseColor],
    stroke: {
      lineCap: 'round',
    },
    labels: ['Progress'],
  };
}
  }}