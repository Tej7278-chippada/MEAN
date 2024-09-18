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

  constructor(private http: HttpClient, private loginService: LoginService) {
  }

  fetchDetails(arg: any): Observable<any> {
    const obj = this.loginService.getUserData();
    const username = obj.userId;
    const password = obj.password;
    return this.http.get('http://localhost:3000/transactions/' + arg.senderCity + '/' + arg.receiverCity, {
      headers: new HttpHeaders({
        'Authorization': 'Basic ' + btoa(username + ':' + password)
      })
    })
      .pipe(catchError(this.handleError));
  }
  handleError(error: any) {
    return throwError(error);
  }
}
