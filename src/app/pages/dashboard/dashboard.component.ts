import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { getCSSVariableValue } from 'src/app/_metronic/kt/_utils';
import { Chart } from 'chart.js';
import { UserService } from '../user.service';
import { Subscription } from 'rxjs';
import { SseService } from '../driver-behavior/SseService';
import { DataService } from './DataService';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  data: string;
  totalUsers: number | undefined;
  notifications: any[] = [];
  driverIdd = '0'; // Replace with the desired driverId
  sseSubscription: Subscription;
  selectedInterval: number = 5000; // Valeur par défaut en millisecondes (ici, 5 secondes)
  public doughnutChartData: number[] = [250, 100, 50];
  public doughnutChartLabels: string[] = ['Actives', 'Expirées', 'En attente de renouvellement'];
  public doughnutChartType: string = 'doughnut';
  @ViewChild('myChart') myChartRef!: ElementRef;
  @Input() driverId: string = '';
  constructor(private dataService: DataService ,private userService: UserService,private sseService: SseService) {this.initSse();}
  chartOptions: any = {};
  totalAssures = 0;
  chart: Chart;
  initSse() {
    this.sseSubscription = this.sseService.initSse(this.driverId).subscribe(
      (notification) => {
        this.notifications.push(notification);
      },
      (error) => {
        console.error('SSE error:', error);
      }
    );
  }
  
  
  
  
  
  startRefreshTimer() {
    console.log('Minuterie de rafraîchissement démarrée avec intervalle', this.selectedInterval, 'ms');
  
    const updateData = () => {
      console.log('Données mises à jour !');
      setTimeout(updateData, this.selectedInterval);
    };
  
    setTimeout(updateData, this.selectedInterval);
  }
  ngOnDestroy() {
    this.sseService.closeSse();
    this.sseSubscription.unsubscribe();
  }

  ngOnInit(): void {   
    const ctx = this.myChartRef.nativeElement.getContext('2d');
  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: this.doughnutChartLabels,
      datasets: [
        {
          data: this.doughnutChartData,
          backgroundColor: ['#36A2EB', '#FF6384', '#FFCE56'],
        },
      ],
    },
    options: {
      responsive: true,
    },
  });

    this.dataService.getDataFromSpark3(this.driverId).subscribe(
      (response: any) => {
        this.data = response;
      },
      error => {
        console.error('Erreur lors de la récupération des données:', error);
      }
    );
  
    this.chartOptions = getChartOptions(350); this.userService.getTotalUsers().subscribe(
    response => {
      this.totalUsers = response.totalUsers;
    },
    error => {
      console.error('Une erreur est survenue lors de la récupération du nombre total d\'utilisateurs :', error);
    }
  );
  this.startRefreshTimer();
}

  }
  

  function getChartOptions(height: number) {
    const labelColor = getCSSVariableValue('--bs-gray-500');
    const borderColor = getCSSVariableValue('--bs-gray-200');
    const baseColor = getCSSVariableValue('--bs-primary');
    const secondaryColor = getCSSVariableValue('--bs-gray-300');
  
    return {
      series: [
        {
          name: 'Nombre de véhicules assurés',
          data: [120, 85, 95, 70, 60],
        },
  
        
      ],
      chart: {
        fontFamily: 'inherit',
        type: 'bar',
        height: height,
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '12%',
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
        categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
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
        opacity: 1,
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
            return '$' + val + ' thousands';
          },
        },
      },
      colors: [baseColor, secondaryColor],
      grid: {
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

