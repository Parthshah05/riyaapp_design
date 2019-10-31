import { Component, ViewChild, OnInit } from '@angular/core';
import { IonSlides, NavController } from '../../../node_modules/@ionic/angular';
import { Router } from '../../../node_modules/@angular/router';
import { Storage } from '@ionic/storage';
import { isNumber } from 'util';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild('Slides', null) slides: IonSlides;
  @ViewChild('Slides2', null) slides2: IonSlides;

  menu = "withoutLogout";
  user_id = "";
  constructor(public route: Router,
    private storage: Storage) { }

  ngOnInit() {
    console.log('1');
    this.storage.get('user_id').then((val) => {
      console.log('user_id ' + val + ' home');
      this.user_id = val;
      if (isNumber(this.user_id)) {
        this.menu = "withLogout";
      }
      else {
        this.menu = "withoutLogout";
      }
    });
  }

  last() {
    this.slides.slideTo(2);
    this.slides2.slideTo(2);
  }
  first() {
    this.slides.slideTo(0);
    this.slides2.slideTo(0);
  }
  next() {
    this.slides.slideNext();
    this.slides2.slideNext();
  }
  prev() {
    this.slides.slidePrev();
    this.slides2.slidePrev();
  }
  onSweet() {
    this.route.navigateByUrl('/list/sweets');
  }
  onSnack() {
    this.route.navigateByUrl('/list/snacks');
  }
  cart() {
    this.route.navigateByUrl('/cart');
  }
}
