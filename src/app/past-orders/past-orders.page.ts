import { Component, OnInit } from '@angular/core';
import { CartDbService } from '../providers/cart-db/cart-db.service';
import { Past_Orders } from '../shared/Past_orders';
import { Storage } from '@ionic/storage';
import { LoadingController, ToastController } from '@ionic/angular';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-past-orders',
  templateUrl: './past-orders.page.html',
  styleUrls: ['./past-orders.page.scss'],
})
export class PastOrdersPage implements OnInit {

  orders: Past_Orders[] = [];
  user_id;

  constructor(
    private storage: Storage,
    private cartDB: CartDbService,
    private loadingController: LoadingController,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    this.storage.get('user_id').then(
      async (val) => {
        this.user_id = val;

        const loading = await this.loadingController.create({
          message: 'Loading...',
          /* duration: 2000, */
          spinner: 'bubbles'
        });
        await loading.present();

        this.cartDB.getPastOrders(this.user_id).subscribe(
          (data: any) => {
            this.orders = data;
            console.log(this.orders);
          },
          (err) => {
            console.log(err);
          },
          () => {
            loading.dismiss();
          }

        );
      });
  }

  addtoCart(order) {
    this.storage.get('user_id').then(
      async (val) => {
        this.user_id = val;
        this.cartDB.addtoCart(this.user_id, order.product_id, order.product_qty).subscribe(
          async (data: any) => {
            if (data.result === true) {
              const toast = await this.toastController.create({
                message: 'Product added to cart!',
                duration: 2000,
                color: 'primary'
              });
              toast.present();
            }
            else {
              const toast = await this.toastController.create({
                message: 'Something Went Wrong!!!',
                duration: 2000,
                color: 'warning'
              });
              toast.present();
            }
          }
        );
      }
    );
  }

}
