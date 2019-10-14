import { Component, OnInit } from '@angular/core';
import { Router } from '../../../node_modules/@angular/router';
import { ToastController } from '@ionic/angular';
import { AlertController } from "@ionic/angular";

import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms";


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {


  constructor(public route: Router,public toastController: ToastController,public alertController: AlertController,public formBuilder: FormBuilder) { 

    this.loginForm = this.formBuilder.group({
      'email': new FormControl('', Validators.compose([
        Validators.required,
        Validators.email
      ])),
      'password': new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6)
      ]))
    });

    this.signUpForm = this.formBuilder.group({
      'fname': new FormControl('', Validators.required),
      'company': new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(5)
      ])),
      's_email': new FormControl('', Validators.compose([
        Validators.required,
        Validators.email
      ])),
      's_password': new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6)
      ])),
      'contact': new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(15)
      ]))
    });

  }
  email = '';
  password = '';

  loginForm: FormGroup;
  signUpForm: FormGroup;

  



  s_email = '';
  s_password = '';
  mobile = null;
  name = '';
  cname = '';

  ngOnInit() {
  }

  showPrompt() {  //for forgot password
  }

  onSubmitLogin() {
    console.log('email:', this.loginForm.get('email').value);
    console.log('password:', this.loginForm.get('password').value);
    /* this.route.navigateByUrl('/home'); */
  }

  onLogin() {

  }
  onSignup() {

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
