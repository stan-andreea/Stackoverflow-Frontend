import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';


import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

// import ReactiveFormsModule for reactive form
import { ReactiveFormsModule } from '@angular/forms';

// import module for Routing.
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import {AppRoutingModule} from "./app-routing.module";

import {HttpInterceptorService} from "./services/http-interceptor.service";
import {HomeComponent} from "./home/home.component";
import { QuestionsPageComponent } from './questions-page/questions-page.component';
import { LogoutComponent } from './logout/logout.component';
import { QuestionDetailComponent } from './question-detail/question-detail.component';
import {SignupComponent} from "./signup/signup.component";
import { HttpClient } from '@angular/common/http';
import { ProfileComponent } from './profile/profile.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    QuestionsPageComponent,
    LogoutComponent,
    QuestionDetailComponent,
    SignupComponent,
    ProfileComponent

    /* HomeComponent,
     SignupComponent,
     ProfileComponent,*/
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,



  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
