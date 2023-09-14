import { Component, Input, OnInit } from '@angular/core';
import { getCSSVariableValue } from '../../../../../kt/_utils';
import { FuelConsumptionService } from './FuelConsumptionService';

@Component({
  selector: 'app-mixed-widget11',
  templateUrl: './mixed-widget11.component.html',
})
export class MixedWidget11Component implements OnInit {
  @Input() chartColor: string = '';
  @Input() chartHeight: string;
  chartOptions: any = {};

  constructor(private fuelService: FuelConsumptionService) {}

  ngOnInit(): void {
    // Assuming you have an array of fuel consumption data for a driver
    const driverId = '1'; // Replace with the actual driver ID
    this.fuelService.getFuelConsumption(driverId).subscribe((fuelData: any) => {
      const fuelConsumptionData = fuelData.map((entry: any) => entry.FuelConsumption);
      this.chartOptions = this.getChartOptions(this.chartHeight, this.chartColor, fuelConsumptionData);
    });
  }

  getChartOptions(chartHeight: string, chartColor: string, fuelConsumptionData: number[]) {
    const labelColor = getCSSVariableValue('--bs-gray-500');
    const borderColor = getCSSVariableValue('--bs-gray-200');
    const secondaryColor = getCSSVariableValue('--bs-gray-300');
    const baseColor = getCSSVariableValue('--bs-' + chartColor);

    return {
      series: [
        {
          name: 'Fuel Consumption',
          data: fuelConsumptionData,
        },
      ],
      chart: {
        fontFamily: 'inherit',
        type: 'bar',
        height: chartHeight,
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '50%',
          borderRadius: 5,
        },
      },
      legend: {
        show: false,
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent'],
      },
      xaxis: {
        categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'], // Replace with actual time periods
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        labels: {
          style: {
            colors: labelColor,
            fontSize: '12px',
          },
        },
      },
      yaxis: {
        labels: {
          style: {
            colors: labelColor,
            fontSize: '12px',
          },
        },
      },
      fill: {
        type: 'solid',
      },
      states: {
        normal: {
          filter: {
            type: 'none',
            value: 0,
          },
        },
        hover: {
          filter: {
            type: 'none',
            value: 0,
          },
        },
        active: {
          allowMultipleDataPointsSelection: false,
          filter: {
            type: 'none',
            value: 0,
          },
        },
      },
      tooltip: {
        style: {
          fontSize: '12px',
        },
        y: {
          formatter: function (val: number) {
            return val + ' Fuel Consumption';
          },
        },
      },
      colors: [baseColor],
      grid: {
        padding: {
          top: 10,
        },
        borderColor: borderColor,
        strokeDashArray: 4,
        yaxis: {
          lines: {
            show: true,
          },
        },
      },
    };
  }
}
