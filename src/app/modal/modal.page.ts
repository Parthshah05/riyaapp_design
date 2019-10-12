import { Component, OnInit, Input } from '@angular/core';
import { User } from '../Classes/user_class';
import { NavParams, ModalController, LoadingController, ToastController } from '@ionic/angular';
import { UserDbService } from '../user-db.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {
  @Input() user: User;
  @Input() action: string;
  old_password: string="";
  new_password: string="";
  confirm_password: string="";
  constructor(public navparams: NavParams, public modalCtrl: ModalController, public udata: UserDbService, public load: LoadingController,public toast:ToastController) {
    this.user = navparams.get('user');
    this.action = navparams.get('action');
  }

  ngOnInit() {

  }
  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }
  async loading1() {
    const loading = await this.load.create({
      message: 'Updating Profile..',
      spinner: 'dots',
      duration: 3000
    });
    return await loading.present();
  }

  async presentToast1() {  //for update
    const t = await this.toast.create({
      message: 'Your settings have been saved.',
      duration: 2000
    });
    t.present();
  }
  async presentToast2() { //for change pass
    const t = await this.toast.create({
      message: 'Your settings have been saved.',
      duration: 2000
    });
    t.present();
  }

  onUpdate() {
    this.loading1();
    
    this.udata.updateUser(this.user.user_id, this.user).subscribe(
      (data) => {
        console.log(data);
        this.presentToast1();
        this.modalCtrl.dismiss(data);
      },
      function (err) { console.log(err); },
      function () {
      }
    );
  }

  async loading2() {
    const loading = await this.load.create({
      message: 'Changing Password..',
      spinner: 'dots',
      duration: 3000
    });
    return await loading.present();
  }

  onChangePass() {
    if (this.old_password != this.user.user_password) {
      this.old_password = "";
      alert("please enter correct password.");
      return;   
    }
    if (this.new_password != this.confirm_password) {
      this.confirm_password = "";
      alert("Confirm password does not match with new password.");
      return;
    }
    if (this.old_password != "" && this.new_password != "" && this.confirm_password != "") {
      this.loading2();
      this.user.user_password = this.new_password;
      this.udata.changePass(this.user).subscribe(
        (data) => {
          console.log(data);
          this.presentToast2();
          this.modalCtrl.dismiss(data);
        },
        function (err) { console.log(err); },
        function () {

        }
      );
    }
    else{
      alert("password can not be empty");
      return;
    }
  }

  matchOldPass() {
    console.log("in the matcholdpass");
    
  }
  matchNewPass() {
    console.log("in the matchnewpass");
    
  }

}
