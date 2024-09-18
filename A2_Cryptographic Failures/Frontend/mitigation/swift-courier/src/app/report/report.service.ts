import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { LoginService } from '../login/login.service';


@Injectable({
  providedIn: 'root'
})
export class ReportService {

  users: any[] = [];

  constructor(private http: HttpClient) {
  }

  fetchDetails(arg: any): Observable<any> {
    return this.http.get('https://localhost:3000/transactions/' + arg.senderCity + '/' + arg.receiverCity)
      .pipe(catchError(this.handleError));
  }
 
  handleError(error: any) {
    return throwError(() => error);
  }
}
