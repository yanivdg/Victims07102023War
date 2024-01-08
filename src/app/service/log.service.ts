import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LogService {
  private serverEndpoint = 'https://iv879ieewa.execute-api.us-west-1.amazonaws.com/default/errorLogHandlerService'; // Replace with your server endpoint

  constructor(private http: HttpClient) {}

  logToServer(logMessage: string): void {
    this.http.put(this.serverEndpoint, { log: logMessage })
      .subscribe(
        () => console.log('Log sent to server'),
        error => console.error('Error sending log to server:', error)
      );
  }
}
