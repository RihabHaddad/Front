import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { SseService } from 'src/app/pages/driver-behavior/SseService';

@Component({
  selector: 'app-lists-widget6',
  templateUrl: './lists-widget6.component.html',
})
export class ListsWidget6Component {
  notifications: any[] = [];
  driverId = '1'; // Replace with the desired driverId
  sseSubscription: Subscription;
  constructor(private sseService: SseService) {this.initSse();}
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

  ngOnDestroy() {
    this.sseService.closeSse();
    this.sseSubscription.unsubscribe();
  }

}
