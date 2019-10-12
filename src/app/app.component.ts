import { Component } from '@angular/core';
import { Platform, ModalController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SplashPage } from './splash/splash.page';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})

export class AppComponent {
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Our Products',
      url: '/list',
      icon: 'list'
    },
    {
      title: 'Cart',
      url: '/cart',
      icon: 'cart'
    },
    {
      title: 'My Profile',
      url: '/profile',
      icon: 'contact'
    },
    {
      title: 'Contact Us',
      url: '/contact',
      icon: 'call'
    },
    {
      title: 'Login',
      url: '/login',
      icon: 'person-add'
    },
    {
      title: 'Logout',
      url: '',
      icon: 'log-out'
    }
  ];
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public modalCtrl: ModalController,
    public route:Router
  ) {
    platform.ready().then(() => {

      statusBar.styleDefault();

      this.presentModal();

    });
    this.initializeApp();
  }

  async presentModal() {
    const modal = await this.modalCtrl.create({
      component: SplashPage
    });
    modal.onDidDismiss().then(a=>{
      this.route.navigateByUrl("/home");
    });
    return await modal.present();
  }


  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      //this.splashScreen.hide();
    });
  }
}
