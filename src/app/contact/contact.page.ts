import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { UserDbService } from '../providers/user-db/user-db.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage implements OnInit {

  contact: FormGroup;

  constructor(public formBuilder: FormBuilder,
    private userDb: UserDbService,
    private alertController: AlertController) {
    this.contact = this.formBuilder.group({
      'name': new FormControl('', Validators.required),
      'email': new FormControl('', Validators.compose([
        Validators.required,
        Validators.email
      ])),
      'subject': new FormControl('', Validators.compose([
        Validators.maxLength(100),
        Validators.required
      ])),
      'message': new FormControl('', Validators.required)
    });
  }

  ngOnInit() {
  }

  onContact() {
    this.userDb.contactUS(this.contact.get('name').value,
      this.contact.get('email').value,
      this.contact.get('subject').value,
      this.contact.get('message').value).subscribe(
        async (data: any) => {
          if (data.result === true) {
            const alert = await this.alertController.create({
              header: 'Submitted!',
              subHeader: 'Thanks for contacting us!',
              message: 'We will get back to you soon...',
              buttons: ['OK']
            });
            await alert.present();
          }
        }
      )
  }

}
