import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Cart_Update_Class } from 'src/app/shared/Cart_class';

@Injectable({
  providedIn: 'root'
})
export class CartDbService {


  url: string = 'http://api.riyafoodslimited.co.uk/index.php/cart';
  urlCheck: string = 'http://api.riyafoodslimited.co.uk/index.php/checkout';
  urlPast: string = 'http://api.riyafoodslimited.co.uk/index.php/pastorders';

  constructor(private http: HttpClient) { }

  getCartItems(user_id) {
    return this.http.get(this.url + '/' + user_id);
  }

  addtoCart(user_id, product_id, product_qty) {
    var cart = {
      user_id: user_id,
      product_id: product_id,
      product_qty: product_qty
    };
    const body = JSON.stringify(cart);
    return this.http.post(this.url, body,
      { headers: new HttpHeaders().set('Content-Type', 'application/json') }
    );
  }

  updateCart(user_id, product_id, product_qty) {
    var cart = {
      user_id: user_id,
      product_id: product_id,
      product_qty: product_qty
    };
    const body = JSON.stringify(cart);
    return this.http.put(this.url, body,
      { headers: new HttpHeaders().set('Content-Type', 'application/json') }
    );
  }

  deleteCart(user_id) {
    return this.http.delete(this.url + '/' + user_id,
      { headers: new HttpHeaders().set("Content-Type", "application/json") }
    );
  }

  checkoutCart(user_id) {
    var user = {
      user_id: user_id
    };
    const body = JSON.stringify(user);
    return this.http.post(this.urlCheck, body,
      { headers: new HttpHeaders().set('Content-Type', 'application/json') }
    );
  }
  deleteCartProduct(cart_update_obj:Cart_Update_Class){
    const body = JSON.stringify(cart_update_obj);
    return this.http.put(this.url, body,
      { headers: new HttpHeaders().set('Content-Type', 'application/json') }
    );
  }
  getPastOrders(user_id) {
    return this.http.get(this.urlPast + '/' + user_id);
  }
}
