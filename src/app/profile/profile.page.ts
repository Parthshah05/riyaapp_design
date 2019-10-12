import { Component, OnInit } from '@angular/core';
import { User } from '../Classes/user_class';
import { UserDbService } from '../user-db.service';
import { LoadingController, ModalController } from '@ionic/angular';
import { ModalPage } from '../modal/modal.page';
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
  user: User;

  constructor(public user_db: UserDbService, public load: LoadingController, public modalController: ModalController) {

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

    this.user_db.getUser(this.id).subscribe(
      (u: User[]) => {
        for (let item of u) {
          this.user = item;
          this.email = item.user_email;
          this.name = item.user_name;
          this.mobile = item.user_contact;
          this.company = item.user_company_name;
          this.load.dismiss().then(a => console.log("Loading dismissed."));
        }
      }
    )
  }

}
