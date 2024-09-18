import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  users: any[] = [];
  isLoggedIn = false;
  userId = '';
  password = '';
  url = 'http://localhost:3000/login';
  // url = 'https://localhost:3000/login';
  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };

  fetchDetails(arg: any): Observable<any> {
    return this.http.post(this.url, arg,
      this.httpOptions).pipe(catchError(this.handleError));
  }
  handleError(error: any) {
    return throwError(error);
  }
  sendLoginValue(loginValue: boolean): void {
    this.isLoggedIn = loginValue;
  }
  isUserLoggedIn(): boolean {
    return this.isLoggedIn;
  }
  loggedOff(): void {
    this.isLoggedIn = false;
  }
  sendUserData(userID: string, password: string): void {
    this.userId = userID;
    this.password = password;
  }
  getUserData() {
    return { userId: this.userId, password: this.password };
  }
}
