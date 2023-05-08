import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import {HomeComponent} from "./home/home.component";
import {QuestionsPageComponent} from "./questions-page/questions-page.component";
import {LogoutComponent} from "./logout/logout.component";
import {QuestionDetailComponent} from "./question-detail/question-detail.component";
import {SignupComponent} from "./signup/signup.component";
import {ProfileComponent} from "./profile/profile.component";
import {AuthGuard} from "./services/auth.guard";
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,

  },
  {
    path : '',
    component : HomeComponent
  },

  {
    path : 'questions-page',
    component : QuestionsPageComponent,
  },
  {
    path : 'logout',
    component : LogoutComponent
  },
  {
    path: 'questions/:id',
    component: QuestionDetailComponent,
    canActivate: [AuthGuard]
  },
  {
    path : 'signup',
    component : SignupComponent
  },
  {
    path : 'profile',
    component : ProfileComponent,
    canActivate: [AuthGuard]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
