import * as moment from 'moment';

import { Component, OnInit } from '@angular/core';
import { getCSSVariableValue } from '../../../../../kt/_utils';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-charts-widget3',
  templateUrl: './charts-widget3.component.html',
})
export class ChartsWidget3Component implements OnInit {
  chartOptions: any = {};

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchDriverData();
  }

  fetchDriverData() {
    this.http.get<any>('http://localhost:8002/api/driver1Data').subscribe((data) => {
      const speedData = data.speedData;
      const timeData = data.timeData;
  
      // Convert timeData to Date objects
      const dateObjects = timeData.map((timeStr: string) => new Date(timeStr));
  
      // Format date objects as strings in the desired format
      const formattedTimeData = dateObjects.map((date: Date) => moment(date).format("YYYY-MM-DD HH:mm:ss"));
  
      // Update the chartOptions with the fetched data and formatted time
      this.chartOptions = getChartOptions(speedData, formattedTimeData);
    });
  }
  
}

function getChartOptions(speedData: number[], timeData: Date[]) {
  const labelColor = getCSSVariableValue('--bs-gray-500');
  const borderColor = getCSSVariableValue('--bs-gray-200');
  const baseColor = getCSSVariableValue('--bs-info');
  const lightColor = getCSSVariableValue('--bs-light-info');

  return {
    series: [
      {
        name: 'Speed Data',
        data: speedData,
      },
    ],
    chart: {
      fontFamily: 'inherit',
      type: 'area',
      height: 350,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {},
    legend: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    fill: {
      type: 'solid',
      opacity: 1,
    },
    stroke: {
      curve: 'smooth',
      show: true,
      width: 3,
      colors: [baseColor],
    },
    xaxis: {
      categories: timeData, // Use timeData as categories
      // ... Rest of your xaxis configuration ...
      axisTicks: {
        show: false,
      },
      labels: {
        style: {
          colors: labelColor,
          fontSize: '12px',
        },
      },
      crosshairs: {
        position: 'front',
        stroke: {
          color: baseColor,
          width: 1,
          dashArray: 3,
        },
      },
      tooltip: {
        enabled: true,
        formatter: undefined,
        offsetY: 0,
        style: {
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
       
      },
    },
    colors: [lightColor],
    grid: {
      borderColor: borderColor,
      strokeDashArray: 4,
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    markers: {
      strokeColors: baseColor,
      strokeWidth: 3,
    },
  };
}