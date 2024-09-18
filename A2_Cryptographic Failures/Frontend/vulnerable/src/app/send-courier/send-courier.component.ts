import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SendCourier } from './send-courier';
import { SendCourierService } from './send-courier.service';

@Component({
  selector: 'app-send-courier',
  templateUrl: './send-courier.component.html',
  styleUrls: ['./send-courier.component.css']
})
export class SendCourierComponent {

  Courier = new SendCourier('', '', '', '', '', '');

  message = '';
  id: any;
  registered: any;
  flag = true;
  flag1 = false;

  constructor(private router: Router, private sendCourierService: SendCourierService) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    };
  }

  onSubmit() {
    const details = {
      sender: this.Courier.sender,
      senderAddress: this.Courier.senderAddress,
      senderCity: this.Courier.senderCity,
      receiver: this.Courier.receiver,
      receiverAddress: this.Courier.receiverAddress,
      receiverCity: this.Courier.receiverCity
    };

    this.sendCourierService.fetchDetails(details).subscribe(data => {
      if (data.id) {
        this.flag = false;
        this.id = data.id;
      }
    }, error => {
      this.flag1 = true;
      this.message = 'Error occurred, please try later';
      this.message = error.error.message;
    });
  }
}
