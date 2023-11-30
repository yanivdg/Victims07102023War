import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ScraperService {
  private baseUrl = 'https://yqsmgmgbyj.execute-api.us-west-1.amazonaws.com/default/WebScraberService'; // Replace with your backend URL

  constructor(private http: HttpClient) {}

  scrapeWebsite(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/scrape`);
  }
}
