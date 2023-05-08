import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/auth.service';
import {User} from "../model/user.model";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user: User | null | undefined;

  constructor(private authService: AuthenticationService) { }

  ngOnInit() {
    this.authService.getCurrentUser().subscribe(user => {
      this.user = user;
    });
  }

}
