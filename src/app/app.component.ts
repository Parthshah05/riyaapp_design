import { Component, OnInit } from '@angular/core';
import { Platform, ModalController, MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SplashPage } from './splash/splash.page';
import { Router } from '@angular/router';

import { timer } from 'rxjs';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})

export class AppComponent implements OnInit {

  public appPages1 = [
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
      title: 'Contact Us',
      url: '/contact',
      icon: 'call'
    },
    {
      title: 'Login',
      url: '/login',
      icon: 'person-add'
    }
  ];

  public appPages2 = [
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
    public route: Router,
    private storage: Storage,
    private menuCtrl: MenuController
  ) {
    this.initializeApp();

  }

  ngOnInit() {
    var user_id = "";
    this.storage.get('user_id').then((val) => {
      console.log('user_id', val);
      user_id = val;
    });

    if (user_id.length !== null) {
      /* this.menuCtrl.close('withoutLogout'); */
      this.menuCtrl.enable(true, 'withLogout');
      this.menuCtrl.open('withLogout');
    }
    else {
      /* this.menuCtrl.close('withLogout'); */
      this.menuCtrl.enable(true, 'withoutLogout');
      this.menuCtrl.open('withoutLogout');
    }
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.show();
      this.statusBar.backgroundColorByHexString("#01528f");
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      timer(5000).subscribe(() => {
        console.log("aayu");
        this.route.navigateByUrl('/home');
      });

    });
  }
}
