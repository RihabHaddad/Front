import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SelectedDriverService {
  private selectedDriverId: string = '';

  setSelectedDriver(driverId: string) {
    this.selectedDriverId = driverId;
  }

  getSelectedDriver(): string {
    return this.selectedDriverId;
  }
}
