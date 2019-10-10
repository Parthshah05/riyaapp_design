import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Products_Category_Classs } from '../../shared/Products_Category_class'

@Injectable({
  providedIn: 'root'
})
export class ProductsDbService {

  private url: string = "http://api.riyafoodslimited.co.uk/index.php/products";
  private urlByCat: string = "http://api.riyafoodslimited.co.uk/index.php/productbycategory/";

  constructor(public http: HttpClient) { }

  GetAllProducts() {
    return this.http.get(this.url,
      { headers: new HttpHeaders().set("Content-Type", "application/json") });
  }

  GetProductsByCategory(cat: number) {
    return this.http.get(this.urlByCat + cat,
      { headers: new HttpHeaders().set("Content-Type", "application/json") });
  }

  GetSnacksProducts() {
    return this.http.get(this.urlByCat + 2);
  }
}
