import { Component, OnInit } from '@angular/core';
import { UserDbService } from '../providers/user-db/user-db.service';
import { LoadingController, ModalController } from '@ionic/angular';
import { ModalPage } from '../modal/modal.page';
import { Storage } from '@ionic/storage';
import { User_Class } from '../shared/User_class';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  email = "";
  name = "";
  mobile = "";
  company = "";
  id = 6;  //user id
  user: User_Class;

  user_id: "";
  constructor(public load: LoadingController,
    public modalController: ModalController,
    private storage: Storage,
    private userDb: UserDbService) {
  }

  async loading() {
    const loading = await this.load.create({
      message: 'Loading Profile..',
      spinner: 'dots',
      duration: 3000
    });
    return await loading.present();
  }
  async presentModal(action) {
    const modal = await this.modalController.create({
      component: ModalPage,
      componentProps: {
        'user': this.user,
        'action': action
      }
    });
    modal.onDidDismiss().then(a =>
      this.ngOnInit()
    );
    return await modal.present();
  }

  ngOnInit() {
    this.loading().then(a => console.log("loading presented."));

    this.storage.get('user_id').then((val) => {
      this.user_id = val;
      this.userDb.getUserById(this.user_id).subscribe(
        (data: User_Class[]) => {
          this.user = data[0];
          this.email = this.user.user_email;
          this.company = this.user.user_company_name;
          this.mobile = this.user.user_contact;
          this.name = this.user.user_name;
        },
        (err) => {
          console.log(err);
        },
        () => {
          this.load.dismiss();
        }
      );
    });
  }

}
