import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ReportComponent } from './report/report.component';
import { SendCourierComponent } from './send-courier/send-courier.component';
import { TrackOrderComponent } from './track-order/track-order.component';
import { ReportGuardService } from '../app/report/report-gaurd.service';
import { CourierGuardService } from '../app/send-courier/courier-gaurd.service';
import { TrackGuardService } from '../app/track-order/track-gaurd.service';
import { HomeGuardService } from '../app/home/home-gaurd.service';

const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'report', component: ReportComponent },
    { path: 'trackorder', component: TrackOrderComponent },
    { path: 'sendcourier', component: SendCourierComponent }
];
// , canActivate: [HomeGuardService], canActivate: [ReportGuardService] ,
// canActivate: [CourierGuardService] , canActivate: [TrackGuardService]
export const routing = RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' });
