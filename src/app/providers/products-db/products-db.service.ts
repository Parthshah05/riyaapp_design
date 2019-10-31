import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Products_Category_Classs } from '../../shared/Products_Category_class'

@Injectable({
  providedIn: 'root'
})
export class ProductsDbService {
  private url: string = "http://api.riyafoodslimited.co.uk/index.php/products";
  private urlByCat: string = "http://api.riyafoodslimited.co.uk/index.php/productbycategory/";
  public products: Products_Category_Classs[] = [];
  constructor(public http: HttpClient) { }
  GetAllProducts() {
    if (this.products.length === 0) {
      this.http.get(this.url,
        { headers: new HttpHeaders().set("Content-Type", "application/json") }).subscribe((data: Products_Category_Classs[]) => {
          this.products = data;
        });
    }
    return this.products;
  }

  GetProductsByCategory(cat: number) {
    let cat_name;
    if (cat == 1) {
      cat_name = "Sweet";
    }
    else {
      cat_name = "Snacks";
    }
    if (this.products.length === 0) {
      this.http.get(this.url,
        { headers: new HttpHeaders().set("Content-Type", "application/json") }).subscribe((data: Products_Category_Classs[]) => {
          this.products = data;
        });
    }
    let cat_products: Products_Category_Classs[] = [];
    this.products.forEach(element => {
      if (element.cat_name == cat_name) {
        cat_products.push(element);
      }
    });
    return cat_products;
  }
}
