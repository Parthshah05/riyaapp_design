import { Component, ViewChild } from '@angular/core';
import { IonSlides, NavController } from '../../../node_modules/@ionic/angular';
import { Router } from '../../../node_modules/@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  @ViewChild('Slides', null) slides: IonSlides;
  @ViewChild('Slides2', null) slides2: IonSlides;
  constructor(public route: Router) { }
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
