import { Component } from '@angular/core';
import {AuthenticationService} from "../services/auth.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor(protected authService: AuthenticationService) { }


}
