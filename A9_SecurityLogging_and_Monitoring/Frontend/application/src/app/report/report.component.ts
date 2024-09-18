import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ReportService } from './report.service';
import { Report } from './report';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})

export class ReportComponent {

  formStatus = false;
  flag = false;
  flag2 = false;
  report = new Report('', '');
  message: any;
  data: any[] = [];
  arr: any[] = [];
  pageSize = 5;
  pageCount = 1;
  page = 1;

  constructor(private router: Router, private reportService: ReportService) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    };
  }

  change(i: number) {
    this.page = i;
  }

  validateSubmit() {
    this.reportService.fetchDetails({ senderCity: this.report.sender, receiverCity: this.report.receiver }).subscribe(
      data => {
        this.data = data;
        if (this.data) {
          this.formStatus = true;
          this.flag = true;
          this.flag2 = false;
          this.pageCount = (this.data.length) / 5;
          if ((this.data.length) % 5 === 0) {
            if (this.pageCount > 1) {
              for (let i = 1; i <= this.pageCount; i++) {
                this.arr.push(i);
              }
            } else {
              this.arr.push(1);
            }
          }
          if ((this.data.length) % 5 !== 0) {
            if (this.pageCount > 1) {
              this.pageCount = this.pageCount + 1;
              for (let i = 1; i < this.pageCount; i++) {
                this.arr.push(i);
              }
            } else {
              this.arr.push(1);
            }
          }
        }
      },

      error => {
        this.flag2 = true;
        this.flag = false;
        this.message = 'Error occurred, please try later';
        this.message = error.error.message;
      });
  }
}
