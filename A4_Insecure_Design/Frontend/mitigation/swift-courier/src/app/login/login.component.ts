import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from './login';
import { LoginService } from './login.service';
import { RegisterService } from '../register/register.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  flag = false;
  login = new Login('', '');
  message: any;
  loginBoolean: any = false;
  isLoggedin = false;
  forgotPwd: any = true;
  otp: any;
  otpFlag: any = false;

  constructor(private router: Router, private loginService: LoginService, private registerService: RegisterService) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      this.loginBoolean = false;
      return false;
    };
  }

  ngOnInit() {
    this.loginBoolean = this.registerService.fetchLoginValue();
    this.registerService.changeValue();
  }

  async validateSubmit() {
    this.loginService.fetchDetails({ userId: this.login.userId, password: this.login.password }).subscribe(data => {
      if (data === true) {
        this.flag = false;
        this.isLoggedin = true;
        this.loginService.sendUserData(this.login.userId, this.login.password);
        sessionStorage.setItem('userId', this.login.userId);
        this.loginService.sendLoginValue(this.isLoggedin);
        this.router.navigate(['/home']);
      }
    }, error => {
      this.flag = true;
      this.message = 'Error occurred, please try later';
      this.message = error.error.message;
    });
  }

  forgotPassword() {
    this.forgotPwd = false;
  }


  getOtp() {
    this.loginService.getOTP(this.login.userId).subscribe(data => {
      this.otpFlag = true;
    }, error => {
      this.flag = true;
      this.message = 'No Such User Id';
      this.message = error.error.message;
    });
  }

  validateOtp() {
    this.flag = false;
    this.isLoggedin = true;
    this.loginService.verifyOTP(this.login.userId, this.otp).subscribe((data) => {
      if (data == true) {
        this.isLoggedin = true;
        sessionStorage.setItem('userId', this.login.userId);
        this.loginService.sendLoginValue(this.isLoggedin);
        this.router.navigate(['/home']);
      }
    }, error => {
      this.flag = true;
      this.message = 'OTP DOES NOT MATCH!!!';
    });






  }
}
