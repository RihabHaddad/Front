import { Component, OnInit } from '@angular/core';
import { DataService } from '../dashboard/DataService';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-accident',
  templateUrl: './accident.component.html',
  styleUrls: ['./accident.component.scss']
})
export class AccidentComponent implements OnInit {

  data$: Observable<any[]>;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.dataService.getDataFromSpark().subscribe(
      response => {
        console.log('API Response:', response); // Check the response format
        if (typeof response === 'string') {
          try {
            const parsedResponse = JSON.parse(response);
            console.log('Parsed Response:', parsedResponse); // Log the parsed response
            this.data$ = parsedResponse;
          } catch (error) {
            console.error('Error parsing JSON:', error);
          }
        } else {
          console.error('API response is not a string:', response);
        }
      },
      error => {
        console.error('API request error:', error);
      }
    );
  }

  trackByDriverId(index: number, item: any) {
    return item.DriverId;
  }
}