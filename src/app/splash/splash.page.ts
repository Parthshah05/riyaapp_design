/* import { Component, OnInit } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
//import { setTimeout } from 'timers';
import { ModalController } from '@ionic/angular';
import { timer } from 'rxjs';
import { Router } from '@angular/router';
import { ProductsDbService } from '../providers/products-db/products-db.service';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
})
export class SplashPage implements OnInit {

  constructor(public modalCtrl: ModalController, public splashscreen: SplashScreen, public route: Router, private productsService: ProductsDbService) { }

  ngOnInit() {
    this.productsService.GetAllProducts();
    console.log("inside splash");
    timer(3000).subscribe(() => {
      this.splashscreen.hide();
      console.log("aayu");
      this.route.navigateByUrl('/home');
    });
  }

}
 */

import { Component, OnInit } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
//import { setTimeout } from 'timers';
import { ModalController } from '@ionic/angular';
import { timer } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
})
export class SplashPage implements OnInit {

  constructor(public modalCtrl: ModalController, public splashscreen: SplashScreen, public route: Router) { }

  ngOnInit() {
    this.splashscreen.hide();

    timer(5000).subscribe(() => {
      console.log("aayu");
      this.route.navigateByUrl('/home');
    });
  }

}