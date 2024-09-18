import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {

  userId: string | null = sessionStorage.getItem('userId');

  constructor(private router: Router) {
  }
  sendCourier(): void {
    this.router.navigate(['/sendcourier']);
  }
  generateReport(): void {
    this.router.navigate(['/report']);
  }
}
