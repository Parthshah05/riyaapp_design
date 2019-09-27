import { Component, OnInit } from '@angular/core';
import { Router } from '../../../node_modules/@angular/router';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(public route: Router,public toastController: ToastController) { }
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
    
     
       
    this.route.navigateByUrl('/home');
    
  }
  onSignup(){
   
  }
}
