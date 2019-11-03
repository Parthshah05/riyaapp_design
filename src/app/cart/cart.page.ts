import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { CartDbService } from '../providers/cart-db/cart-db.service';
import { Cart_Class } from '../shared/Cart_class';
import { Storage } from '@ionic/storage';
import { isNullOrUndefined } from 'util';
import { async } from '@angular/core/testing';
import { Router } from '@angular/router';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  qty: any;

  cart: Cart_Class[] = [];
  user_id;
  showList: boolean = false;

  constructor(public alertCtrl: AlertController,
    private storage: Storage,
    private cartDB: CartDbService,
    private route: Router,
    public toastController: ToastController) {
    this.qty = 1;
  }


  ngOnInit() {
    this.storage.get('user_id').then((val) => {
      this.user_id = val;
      if (isNullOrUndefined(this.user_id)) {
        this.route.navigateByUrl('/login');
      }
      else {
        this.cartDB.getCartItems(this.user_id).subscribe(
          (data: any) => {
            this.cart = data;
            if (this.cart[0] == undefined) {
              this.showList = true;
            } else {
              this.showList = false;
            }
          },
          (err) => {
            console.log(err);
          },
          () => {

          }
        );
      }
    });
  }
  onDec(cart) {
    if (cart.product_qty - 1 < 1) {
      cart.product_qty = 1;
    } else {
      cart.product_qty -= 1;
    }

    this.storage.get('user_id').then((val) => {
      this.user_id = val;
      this.cartDB.updateCart(this.user_id, cart.product_id, cart.product_qty).subscribe(
        async (data: any) => {
          if (data.result === true) {
            const toast = await this.toastController.create({
              message: 'Cart Details updated!',
              duration: 2000,
              color: 'secondary'
            });
            toast.present();
          }
        }
      );
    });
  }
  onInc(cart) {
    cart.product_qty = Number(cart.product_qty) + 1;
    this.storage.get('user_id').then((val) => {
      this.user_id = val;
      this.cartDB.updateCart(this.user_id, cart.product_id, cart.product_qty).subscribe(
        async (data: any) => {
          if (data.result === true) {
            const toast = await this.toastController.create({
              message: 'Cart Details updated!',
              duration: 2000,
              color: 'secondary'
            });
            toast.present();
          }
        }
      );
    })
  }

  onqt() {
    this.storage.get('user_id').then((val) => {
      this.user_id = val;
      this.cartDB.checkoutCart(this.user_id).subscribe(
        async (data: any) => {
          if (data.reason === true) {
            const alert = await this.alertCtrl.create({
              header: 'Your Quatation',
              message: 'We Got Your Requirement List.We Will Contact With You Within Some Time.',
              buttons: ['OK']
            });

            await alert.present();
          }
        }
      )
    });

  }

  async onempty() {
    const alert = await this.alertCtrl.create({
      header: 'Empty Cart!',
      message: 'Are you sure you want to empty cart???',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
          }
        }, {
          text: 'Okay',
          handler: () => {
            this.storage.get('user_id').then(
              (val) => {
                this.user_id = val;
                this.cartDB.deleteCart(this.user_id).subscribe(
                  (data: any) => {
                    if (data.result === true) {
                      this.ngOnInit();
                    }
                  }
                );
              }
            );
          }
        }
      ]
    });

    await alert.present();
  }
}