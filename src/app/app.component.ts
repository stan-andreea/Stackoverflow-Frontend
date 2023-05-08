import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-example';
  username : string ="";
  password : string ="";
  show: boolean= false;
  user: any;
  submit(){
    console.log("user name is " + this.username)
    this.clear();
  }
  clear(){
    this.username ="";
    this.password = "";
    this.show = true;
  }

  logout() {

  }
}
