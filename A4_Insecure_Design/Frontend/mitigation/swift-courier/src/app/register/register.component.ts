import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Register } from './register';
import { RegisterService } from './register.service';


@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent {

    register = new Register('', '', '', '', '', '');
    show = true;
    message = '';
    registered: any;
    loginBoolean: any;
    phnumber: any = '';


    constructor(private router: Router, private registerService: RegisterService) {
    }

    onSubmit() {
        this.phnumber = 0;
        for (let i of this.register.pNumber) {
            if (i !== '-') {
                this.phnumber += i;
            }
        }
        const phNo = Number(this.phnumber);
        const users = {
            userId: this.register.userId,
            password: this.register.password,
            name: this.register.name,
            city: this.register.city,
            email: this.register.email,
            phone: phNo,

        };
        this.registerService.fetchDetails(users).subscribe(data => {
            if (data === true) {
                this.show = false;
                this.loginBoolean = true;
                this.registerService.sendLoginValue(this.loginBoolean);
                this.router.navigate(['/login']);
            }
        }, error => {
            this.message = 'Error occurred, please try later';
            this.message = error.error.message;
        });
    }
}
