import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor() { }
  email = '';
  password = '';

  s_email='';
  s_password='';
  mobile=null;
  name='';
  cname='';

  ngOnInit() {
  }

  showPrompt() {  //for forgot password
  }
  onLogin(){
  }
  onSignup(){
  }
}
