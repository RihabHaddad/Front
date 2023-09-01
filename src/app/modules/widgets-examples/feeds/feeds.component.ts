import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/pages/dashboard/DataService';

@Component({
  selector: 'app-feeds',
  templateUrl: './feeds.component.html',
})
export class FeedsComponent implements OnInit {
 
  data: any[] = [];


  private dataSubscription: Subscription;


  
  constructor(private dataService: DataService,) {}
  ngOnInit(): void {     this.loadData(); 
  }
  
   

  loadData() {
    this.dataSubscription = this.dataService.getDataFromSpark2().subscribe(
      response => {
        this.data = response;
      },
      error => {
        console.error('API request error:', error);
      }
    );
    }}
