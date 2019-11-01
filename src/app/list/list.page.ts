import { Component, OnInit } from '@angular/core';
import { queue } from '../../../node_modules/rxjs/internal/scheduler/queue';
import { LoadingController, NavController, NavParams, AlertController, ToastController } from '../../../node_modules/@ionic/angular';
import { NavComponent } from '../../../node_modules/@ionic/core';
import { Router, RouterModule, ActivatedRoute } from '../../../node_modules/@angular/router';

import { ProductsDbService } from '../providers/products-db/products-db.service'
import { Products_Category_Classs } from "../shared/Products_Category_class";
import { CartDbService } from '../providers/cart-db/cart-db.service';
import { Storage } from '@ionic/storage';
import { isNumber, isNullOrUndefined } from 'util';


@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {
  category = 'products';
  qty: number = 1;

  products: Products_Category_Classs[] = [];
  productsDup: Products_Category_Classs[] = [];

  public items: Array<{ title: string; categ: string; qty: number }> = [];
  constructor(private activated_route: ActivatedRoute,
    private productsDB: ProductsDbService,
    private cartDB: CartDbService,
    private storage: Storage,
    private alertCtrl: AlertController,
    private toastController: ToastController) {
    console.log(activated_route.snapshot.paramMap.get('cat'));
    this.category = 'products';
  }

  async ngOnInit() {
    if (this.activated_route.snapshot.paramMap.get('cat') != null) {
      this.category = this.activated_route.snapshot.paramMap.get('cat');
      this.productsDup = this.products;
      var cat_id;
      if (this.category === 'sweets') {
        cat_id = 1;
      }
      else if (this.category === 'snacks') {
        cat_id = 2;
      }
      this.products = this.productsDB.GetProductsByCategory(cat_id);
      this.products.forEach(product => { product.qty = 1; });
    }
    else {
      this.products = this.productsDB.GetAllProducts();
      this.productsDup = this.products;
      this.products.forEach(product => { product.qty = 1; });
    }
  }
  onInc(prod: Products_Category_Classs) {
    prod.qty++;
    
  }
  onDec(prod: Products_Category_Classs) {
    if (prod.qty > 0) {
      prod.qty--;
    }
  }

  getItems(ev) {
    this.products = this.productsDup;
    const val = ev.target.value;
    if (val && val.trim() !== "") {
      this.products = this.products.filter(
        x => x.product_name.toLowerCase().indexOf(val.toLowerCase()) > -1
      );
    }
  }

  addtocart(prod) {
    var user_id;
    this.storage.get('user_id').then(async (val) => {
      user_id = val;
      if (!isNullOrUndefined(user_id)) {
        this.cartDB.addtoCart(user_id, prod.product_id, prod.qty).subscribe(
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
      else {

        const alert = await this.alertCtrl.create({
          header: 'Alert',
          subHeader: 'Please log-in to Add to Cart!',
          buttons: ['OK']
        });
        await alert.present();
      }
    })
  }
  // add back when alpha.4 is out
  // navigate(item) {
  //   this.router.navigate(['/list', JSON.stringify(item)]);
  // }
}
