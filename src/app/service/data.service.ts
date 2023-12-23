import { Injectable  } from '@angular/core';
import { HttpClient ,HttpHeaders,HttpErrorResponse } from '@angular/common/http';
import { Observable,throwError  } from 'rxjs';
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http: HttpClient) {}
  headers = new HttpHeaders().set('Content-Type', 'text/html');
 postRequest(body:any): Observable<any> {
    const  apiUrl = 'https://yqsmgmgbyj.execute-api.us-west-1.amazonaws.com/default/WebScraberService'; // Replace with your API URL
    return this.http.post<any>(apiUrl, body,{ headers: this.headers })
  }

  getData(url: string): Observable<string> {
    return this.http.get(url, { responseType: 'text' });
  }

  getRequest(url:string)
  {
    return this.http.get<any>(url).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'Unknown error occurred';
        if (error.error instanceof ErrorEvent) {
          // Client-side error
          errorMessage = `Error: ${error.error.message}`;
        } else {
          // Server-side error
          errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        console.error(errorMessage);
        return throwError(errorMessage); // Throw an observable error
      })
    );
  }
}