import { Injectable  } from '@angular/core';
import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http: HttpClient) {}
  
 postRequest(body:any): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'text/html');
    const  apiUrl = 'https://yqsmgmgbyj.execute-api.us-west-1.amazonaws.com/default/WebScraberService'; // Replace with your API URL
    return this.http.post<any>(apiUrl, body,{ headers: headers })
  }
}
