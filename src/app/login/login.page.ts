import { Component, OnInit } from '@angular/core';
import { Router } from '../../../node_modules/@angular/router';
import { ToastController, Events } from '@ionic/angular';
import { AlertController } from "@ionic/angular";

import { Storage } from "@ionic/storage";
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms";
import { UserDbService } from '../providers/user-db/user-db.service';
import { async } from '@angular/core/testing';
import { User_Class } from '../shared/User_class';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(public route: Router,
    public toastController: ToastController,
    public alertController: AlertController,
    public formBuilder: FormBuilder,
    private userDB: UserDbService,
    private toast: ToastController,
    private storage: Storage,
    private alertCtrl: AlertController,
    private events: Events) {

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

  ngOnInit() {

  }

  showPrompt() {  //for forgot password
  }

  onSubmitLogin() {
    this.userDB.loginUser(
      this.loginForm.get('email').value,
      this.loginForm.get('password').value).subscribe(
        async (data: any) => {

          if (data.length == 1) {
            if(data[0].IsVerified=="1"){
            const t1 = await this.toast.create({
              message: "Successfull Login!",
              duration: 1000,
              showCloseButton: true,
              closeButtonText: 'Okay',
              color: 'success'
            });
            this.storage.set('user_id', data[0].user_id);
            this.events.publish('user:loggedin');
            this.route.navigateByUrl('/home');
            t1.present();
           
            }
            else{
              let uid=data[0].user_id;
              const alert = await this.alertController.create({
                header: 'Enter OTP',
                inputs: [
                  {
                    name: 'name1',
                    type: 'number',
                    placeholder: 'Your OTP',
                    max: '4',
          
                  }
                ],
          
                buttons: [
                  {
                    text: 'Proceed',
                    handler: data => {
                      this.userDB.verifyUser(data.name1).subscribe(
                        async (data: any) => {
                          if (data.result === true) {
                            let t1 = await this.toast.create({
                              message: 'User Verified Successfully!',
                              color: 'success',
                              showCloseButton: true,
                              closeButtonText: 'Done',
                              duration: 1000,
                            });
                            // t1.present();
                            this.storage.set('user_id', uid);
                            this.events.publish('user:loggedin');
                            this.route.navigateByUrl('/home');
                            t1.present();
                          }
                          else if (data.result === false) {
                            let t2 = await this.toast.create({
                              message: 'Invalid OTP',
                              color: 'warning',
                              showCloseButton: true,
                              closeButtonText: 'Done',
                              duration: 1000,
                            });
                            t2.present();
                          }
                        },
                        (err) => {
                          console.log(err);
                        },
                        () => {
          
                        }
                      )
                    }
                  },
                  {
                    text: 'Cancel',
                    role: 'cancel'
                  }
                ]
              });
          
              await alert.present(); 
            }
          }
          else {
            const t2 = await this.toast.create({
              message: "Invalid User Name or Password!",
              duration: 1000,
              showCloseButton: true,
              closeButtonText: 'Okay',
              color: 'danger'
            });
            t2.present();
          }
        },
        (err) => {
          console.log(err);
        },
        () => {

        }
      )

  }

  onSignup() {
    var email = this.signUpForm.get('s_email').value;
    var pass = this.signUpForm.get('s_password').value;
    var fname = this.signUpForm.get('fname').value;
    var comp = this.signUpForm.get('company').value;
    var cont = this.signUpForm.get('contact').value;
    this.userDB.signupUser(new User_Class(
      email,
      pass,
      fname,
      comp,
      cont)).subscribe(
        async (data: any) => {
            if (data.result === true) {
              let alert = await this.alertCtrl.create({
                header: 'Signup',
                subHeader: 'Please Check your email. An otp has been sent to your email which is valid for 15 minutes!',
                buttons: ['Okay']
              });
              alert.present();
              // this.onotp();
            }
            else if (data.reason === "User exist") {
              let alert = await this.alertCtrl.create({
                header: 'Error',
                subHeader: 'User already exist. Please login.',
                buttons: ['Okay']
              });
              alert.present();
            }
        }
      );
  }

  async onotp() {
    const alert = await this.alertController.create({
      header: 'Enter OTP',
      inputs: [
        {
          name: 'name1',
          type: 'number',
          placeholder: 'Your OTP',
          max: '4',

        }
      ],

      buttons: [
        {
          text: 'Proceed',
          handler: data => {
            this.userDB.verifyUser(data.name1).subscribe(
              async (data: any) => {

                if (data.result === true) {
                  let t1 = await this.toast.create({
                    message: 'User Verified Successfully! Please Login!',
                    color: 'success',
                    showCloseButton: true,
                    closeButtonText: 'Done',
                    duration: 1000,
                  });
                  t1.present();
                }
                else if (data.result === false) {
                  let t2 = await this.toast.create({
                    message: 'Invalid OTP',
                    color: 'warning',
                    showCloseButton: true,
                    closeButtonText: 'Done',
                    duration: 1000,
                  });
                  t2.present();
                }
              },
              (err) => {
                console.log(err);
              },
              () => {

              }
            )
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });

    await alert.present();
  }
}
