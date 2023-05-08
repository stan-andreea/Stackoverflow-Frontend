import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AuthenticationService} from "../services/auth.service";
import {first} from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username = ''
  password = ''
  error: string = '';

  constructor(private router: Router,
              private authService: AuthenticationService) { }

  ngOnInit() {
  }

  checkLogin() {
    console.log("login component start");
    this.authService.authenticate(this.username, this.password)
      .subscribe(
        result => {
          if (result) {
            this.router.navigate(['questions-page'])
            console.log("done");
          } else {
            this.error = "Invalid username or password!"
          }
          }
      );
  }

}
