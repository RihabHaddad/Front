import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/pages/dashboard/DataService';

@Component({
  selector: 'app-stats-widget2',
  templateUrl: './stats-widget2.component.html',
})
export class StatsWidget2Component implements OnInit, OnDestroy {
  @Input() title = '';
  @Input() description = '';
  @Input() avatar = '';

  data: any[] = [];
  private dataSubscription: Subscription;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.dataSubscription = this.dataService.getDataFromSpark().subscribe(
      response => {
        this.data = response;
      },
      error => {
        console.error('API request error:', error);
      }
    );
  }

  ngOnDestroy(): void {
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe();
    }
  }


  trackByDriverId(index: number, item: any) {
    return item.DriverId;
  }
}
