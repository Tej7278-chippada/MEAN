import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { routing } from './app.routes';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { ReportComponent } from './report/report.component';
import { LoginService } from './login/login.service';
import { RegisterComponent } from './register/register.component';
import { ReportService } from './report/report.service';
import { SendCourierComponent } from './send-courier/send-courier.component';
import { CourierGuardService } from './send-courier/courier-gaurd.service';
import { ReportGuardService } from '../app/report/report-gaurd.service';
import { HomeComponent } from './home/home.component';
import { NumberPipe } from './register/number.pipe';
import { TrackOrderComponent } from './track-order/track-order.component';
import { TrackGuardService } from './track-order/track-gaurd.service';
import { HomeGuardService } from './home/home-gaurd.service';

@NgModule({
  imports: [BrowserModule, HttpClientModule, FormsModule, ReactiveFormsModule, routing],
  declarations: [SendCourierComponent, HomeComponent, AppComponent, LoginComponent,
    ReportComponent, RegisterComponent, NumberPipe, TrackOrderComponent],
  providers: [LoginService, ReportService, ReportGuardService, CourierGuardService, TrackGuardService, HomeGuardService],
  bootstrap: [AppComponent],

})

export class AppModule { }
