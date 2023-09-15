import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApexOptions } from 'ng-apexcharts';
import { getCSSVariableValue } from 'src/app/_metronic/kt/_utils/DomHelpers';

@Component({
  selector: 'app-driver-behavior',
  templateUrl: './driver-behavior.component.html',
  styleUrls: ['./driver-behavior.component.scss']
})
export class DriverBehaviorComponent implements OnInit {

  @Input() title = '';
  @Input() color = '';
  @Input() description = '';
  @Input() change = '';
  @ViewChild('chartRef', { static: true }) chartRef: ElementRef;
  height: number;
  @ViewChild('lineChartCanvas', { static: true }) lineChartCanvas: ElementRef;

  lineChartData: any = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [{
      label: 'Series A',
      data: [65, 59, 80, 81, 56, 55, 40],
      borderColor: 'rgba(75,192,192,1)',
      fill: false,
    }]
  };
  chartOptions: any = {};
  labelColor: string;
  baseColor: string;
  lightColor: string;
  

  constructor(private route:ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const driverId= params['DriverId']; // Utilisez le nom du paramètre approprié
      // Faites quelque chose avec id ici
    });
    

    this.height = 150;
    this.labelColor = getCSSVariableValue('--bs-gray-800');
    this.baseColor = getCSSVariableValue('--bs-' + this.color);
    this.lightColor = getCSSVariableValue('--bs-light-' + this.color);
    this.chartOptions = getChartOptions(
      this.height,
      this.labelColor,
      this.baseColor,
      this.lightColor
    );
  }
}

function getChartOptions(
  height: number,
  labelColor: string,
  baseColor: string,
  lightColor: string
): ApexOptions {
  const options: ApexOptions = {
    series: [
      {
        name: 'Net Profit',
        data: [30, 45, 32, 70, 40],
      },
    ],
    chart: {
      fontFamily: 'inherit',
      type: 'area',
      height: height,
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
      sparkline: {
        enabled: true,
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
      categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        show: false,
        style: {
          colors: labelColor,
          fontSize: '12px',
        },
      },
      crosshairs: {
        show: false,
        position: 'front',
        stroke: {
          color: '#E4E6EF',
          width: 1,
          dashArray: 3,
        },
      },
      tooltip: {
        enabled: false,
      },
    },
    yaxis: {
      min: 0,
      max: 80,
      labels: {
        show: false,
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
        formatter: function (val) {
          return '$' + val + ' thousands';
        },
      },
    },
    colors: [lightColor],
    markers: {
      colors: [lightColor],
      strokeColors: [baseColor],
      strokeWidth: 3,
    },
  };
  return options;
  
}


