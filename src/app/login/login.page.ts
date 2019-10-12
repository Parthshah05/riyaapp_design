import { Component, OnInit } from '@angular/core';
import { Router } from '../../../node_modules/@angular/router';
import { ToastController } from '@ionic/angular';
import { AlertController } from "@ionic/angular";


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(public route: Router,public toastController: ToastController,public alertController: AlertController) { }
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
  async onotp(){
    const alert = await this.alertController.create({
      header: 'Enter OTP',
      inputs: [
        {
          name: 'name1',
          type: 'number',
          placeholder: 'Your OTP',
          max:'4',
          
        }
      ],
    
      //message: 'This is an alert message.',
      buttons: ['Proceed','Cancel']
    });

    await alert.present();
  }
}
