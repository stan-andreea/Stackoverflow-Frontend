import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {AuthenticationService} from "../services/auth.service";
import {first} from "rxjs";
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  username: string = '';
  email: string = '';
  password: string = '';
  error: string = '';

  constructor(private authService: AuthenticationService, private router: Router) { }

  ngOnInit() {
  }

  onSubmit() {
    this.authService.signUp(this.username, this.email, this.password)
      .pipe(first())
      .subscribe(
      result => {
        if (result) {
          this.router.navigate(['']);
        } else {
          this.error = 'Username or email already exists';
        }
      },
      error => {
        this.error = 'Failed to signup';
      }
    );
  }

}
