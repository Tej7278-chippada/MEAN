import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(public router: Router, private loginService: LoginService) {
  }
  logout(): void {
    sessionStorage.removeItem('userId');
    this.loginService.loggedOff();
  }
  register(): void {
    this.router.navigate(['/register']);
  }
}
