import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SseService {
  private eventSource: EventSource;

  constructor() {}

  initSse(driverId: string): Observable<any> {
    const url = `http://localhost:8002/sse/${driverId}`;
    this.eventSource = new EventSource(url);

    return new Observable<any>((observer) => {
      this.eventSource.onmessage = (event) => {
        observer.next(JSON.parse(event.data));
      };

      this.eventSource.onerror = (error) => {
        observer.error(error);
      };
    });
  }

  closeSse() {
    if (this.eventSource) {
      this.eventSource.close();
    }
  }
}
