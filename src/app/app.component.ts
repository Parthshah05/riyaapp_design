import { Component, OnInit, ViewChild } from '@angular/core';
import { Platform, ModalController, MenuController, AlertController, Events } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';

import { timer } from 'rxjs';
import { Storage } from '@ionic/storage';
import { isNumber } from 'util';
import { ProductsDbService } from './providers/products-db/products-db.service';


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
      title: 'Past Orders',
      url: '/past-orders',
      icon: 'list-box'
    }/* ,
    {
      title: 'Logout',
      url: '',
      icon: 'log-out'
    } */
  ];

  appPages: Array<{ title: string, url: string, icon: string }>;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public modalCtrl: ModalController,
    public route: Router,
    private storage: Storage,
    private menuCtrl: MenuController,
    private alertController: AlertController,
    private productService: ProductsDbService,
    private events: Events
  ) {

    this.initializeApp();

    this.appPages = [
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

    this.events.subscribe('user:loggedin', () => {
      this.appPages = [
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
          title: 'Past Orders',
          url: '/past-orders',
          icon: 'list-box'
        },
        {
          title: 'Logout',
          url: '/logout',
          icon: 'log-out'
        }
      ]
    });

    this.events.subscribe('user:loggedout', () => {
      this.appPages = [
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
    });


  }

  ngOnInit() {
    var user_id = "";
    this.productService.GetAllProducts();
    
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

    document.addEventListener("offline", async () => {
      const alert = await this.alertController.create({
        header: 'Network was disconnected :-(',
        subHeader: 'Please check your connection and Try Again!',
        buttons: ['Okay']
      });
      console.log('no internet');
      await alert.present();
    }, false);
  }

  logout() {
    this.storage.remove('user_id');
    this.storage.clear();

    this.menuCtrl.enable(true, 'withoutLogout');
    this.menuCtrl.open('withoutLogout');
  }
}
