import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SendCourierService {

  url: any = 'http://localhost:3000/transactions';

  constructor(private http: HttpClient) {
  }

  fetchDetails(arg: any): Observable<any> {
    return this.http.post(this.url,
      {
        sender: arg.sender,
        senderAddress: arg.senderAddress,
        senderCity: arg.senderCity,
        receiver: arg.receiver,
        receiverAddress: arg.receiverAddress,
        receiverCity: arg.receiverCity,
        hash:arg.hash
      }).pipe(catchError(this.handleError));
  }
  handleError(error: any) {
    return throwError(error);
  }
}

