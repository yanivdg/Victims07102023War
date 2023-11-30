import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ScraperService {
  private baseUrl = 'http://localhost:3000'; // Replace with your backend URL

  constructor(private http: HttpClient) {}

  scrapeWebsite(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/scrape`);
  }
}
