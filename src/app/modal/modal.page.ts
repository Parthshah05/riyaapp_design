import { Component, OnInit, Input } from '@angular/core';
import { User } from '../Classes/user_class';
import { NavParams, ModalController, LoadingController, ToastController } from '@ionic/angular';
import { UserDbService } from '../providers/user-db/user-db.service';
import { Storage } from '@ionic/storage';
import { UserEdit } from '../shared/User_class';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {
  @Input() user: User;
  @Input() action: string;
  old_password: string = "";
  new_password: string = "";
  confirm_password: string = "";

  user_id = "";

  email = "";
  name = "";
  mobile = "";
  company = "";
  constructor(public navparams: NavParams,
    public modalCtrl: ModalController,
    public load: LoadingController,
    public toast: ToastController,
    private userDb: UserDbService,
    private storage: Storage) {

  }

  ngOnInit() {
    this.user = this.navparams.get('user');
    console.log(this.user, 'profile');
    this.email = this.user.user_email;
    this.company = this.user.user_company_name;
    this.mobile = this.user.user_contact;
    this.name = this.user.user_name;
    this.action = this.navparams.get('action');
    this.storage.get('user_id').then((val) => {
      this.user_id = val;
    });
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
    this.userDb.editUser(new UserEdit(this.email, this.name, this.company, this.mobile))
      .subscribe(
        (data: any) => {
          console.log(data.result);
          if (data.result === true) {
            this.presentToast1();
            this.modalCtrl.dismiss(data);
          }
        },
        (err) => {
          console.log(err);
        },
        () => {

        }
      );
    /* this.udata.updateUser(this.user.user_id, this.user).subscribe(
      (data) => {
        console.log(data);
        this.presentToast1();
        this.modalCtrl.dismiss(data);
      },
      function (err) { console.log(err); },
      function () {
      }
    ); */
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
    if (this.new_password != this.confirm_password && this.new_password.length < 6) {
      this.confirm_password = "";
      alert("Confirm password does not match with new password.");
      return;
    }
    if (this.old_password != "" && this.new_password != "" && this.confirm_password != "") {
      this.loading2();
      this.userDb.changeUserPassword(this.user_id, this.old_password, this.new_password)
        .subscribe(
          (data: any) => {
            console.log(data);
            if (data.result === true) {
              this.presentToast2();
              this.modalCtrl.dismiss(data);
            }
            else if (data.result === false) {
              alert("Old password is invalid");
            }
          },
          (err) => {
            console.log(err);
          },
          () => {

          }
        )
      /* this.udata.changePass(this.user).subscribe(
        (data) => {
          console.log(data);
          this.presentToast2();
          this.modalCtrl.dismiss(data);
        },
        function (err) { console.log(err); },
        function () {

        }
      ); */
    }
    else {
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
