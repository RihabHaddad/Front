import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  @Input() driverId: string = '';

  constructor(private dataService: DataService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.driverId = params['DriverId'];
    this.loadData(this.driverId);
  })}
  loadData(driverId: string) {
    this.dataSubscription = this.dataService.getDataFromSpark3(driverId).subscribe(
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
