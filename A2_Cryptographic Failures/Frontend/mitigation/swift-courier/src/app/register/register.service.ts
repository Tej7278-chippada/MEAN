import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  users: any[] = [];
  loginBoolean: any;
  url = 'https://localhost:3000/register';
  constructor(private http: HttpClient) {
  }

  fetchDetails(arg: any): Observable<any> {
    return this.http.post(this.url,
      {
        userId: arg.userId,
        password: arg.password,
        name: arg.name,
        city: arg.city,
        email: arg.email,
        phone: arg.phone
      },
      {
        headers: { 'Content-Type': 'application/json' }
      }).pipe(catchError(this.handleError));
  }
  sendLoginValue(loginB: boolean): void {
    this.loginBoolean = loginB;
  }
  fetchLoginValue() {
    return this.loginBoolean;
  }
  changeValue(): void {
    this.loginBoolean = false;
  }
  handleError(error: any) {
    return throwError(error);
  }

}
