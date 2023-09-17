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
    this.sseSubscription = this.sseService.initSse(this.driverIdd).subscribe(
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
    this.userService.getTotalUsers().subscribe(
    response => {
      this.totalUsers = response.totalUsers;
    },
    error => {
      console.error('Une erreur est survenue lors de la récupération du nombre total d\'utilisateurs :', error);
    }
  ); 
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
  

    
    
  this.startRefreshTimer();
}

  }
  

  

