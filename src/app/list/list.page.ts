import { Component, OnInit } from '@angular/core';
import { queue } from '../../../node_modules/rxjs/internal/scheduler/queue';
import { LoadingController, NavController, NavParams } from '../../../node_modules/@ionic/angular';
import { NavComponent } from '../../../node_modules/@ionic/core';
import { Router, RouterModule, ActivatedRoute } from '../../../node_modules/@angular/router';

import { ProductsDbService } from '../providers/products-db/products-db.service'
import { Products_Category_Classs } from "../shared/Products_Category_class";


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
    private productsDB: ProductsDbService) {
    console.log(activated_route.snapshot.paramMap.get('cat'));
    this.category = 'products';
  }

  async ngOnInit() {
    if (this.activated_route.snapshot.paramMap.get('cat') != null) {
      this.category = this.activated_route.snapshot.paramMap.get('cat');
      var cat_id;
      if (this.category === 'sweets') {
        cat_id = 1;
      }
      else if (this.category === 'snacks') {
        cat_id = 2;
      }
      // this.products=this.productsDB.GetProductsByCategory(cat_id);
      // this.productsDB.GetProductsByCategory(cat_id).subscribe(
      //   (data: Products_Category_Classs[]) => {
      //     this.products = data;
      //     this.productsDup = data;
      //     this.products.forEach(product => { product.qty = 1; });
      //     /* console.log(this.products); */
      //   },
      //   err => {
      //     console.log(err);
      //   },
      //   () => {

      //   }
      // )
    }
    else {
      this.products = this.productsDB.GetAllProducts();
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
  // add back when alpha.4 is out
  // navigate(item) {
  //   this.router.navigate(['/list', JSON.stringify(item)]);
  // }
}
