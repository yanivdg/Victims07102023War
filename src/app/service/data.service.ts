import { Injectable } from '@angular/core';
import { HttpClient ,HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http: HttpClient) {}

  postRequest(body:any) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const  apiUrl = 'https://yqsmgmgbyj.execute-api.us-west-1.amazonaws.com/default/WebScraberService'; // Replace with your API URL
    return this.http.post(apiUrl, body,{ headers: headers });
  }
}