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
  message = '';
  loginBoolean = false;
  isLoggedin = false;

  constructor(private router: Router, private loginService: LoginService, private registerService: RegisterService) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      this.loginBoolean = false;
      return false;
    };
  }

  ngOnInit(): void {
    this.loginBoolean = this.registerService.fetchLoginValue();
    this.registerService.changeValue();
  }

  validateSubmit(): void {
    this.loginService.fetchDetails({ userId: this.login.userId, password: this.login.password }).subscribe(data => {
      if (data === true) {
        this.flag = false;
        this.isLoggedin = true;
        sessionStorage.setItem('userId', this.login.userId);

        this.loginService.sendUserData(this.login.userId, this.login.password);
        this.loginService.sendLoginValue(this.isLoggedin);
        this.router.navigate(['/home']);
      }
    }, error => {
      this.flag = true;
      this.message = 'Error occurred, please try later';
      this.message = error.error.message;
    });
  }
}
