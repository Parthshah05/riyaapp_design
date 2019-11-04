import { Component, OnInit } from '@angular/core';
import { Platform, ModalController, AlertController, Events } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';

import { timer } from 'rxjs';
import { ProductsDbService } from './providers/products-db/products-db.service';
import { Storage } from '@ionic/storage';
import { isNullOrUndefined } from 'util';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})

export class AppComponent implements OnInit {

  appPages: Array<{ title: string, url: string, icon: string }>;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public modalCtrl: ModalController,
    public route: Router,
    private alertController: AlertController,
    private productService: ProductsDbService,
    private events: Events,
    private storage: Storage
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
    this.productService.GetAllProducts();
    this.storage.get('user_id').then(
      (val) => {
        if (isNullOrUndefined(val)) {
          this.events.publish('user:loggedout');
        }
        else {
          this.events.publish('user:loggedin');
        }
      }
    )
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.show();
      this.statusBar.backgroundColorByHexString("#01528f");
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      timer(5000).subscribe(() => {
        this.route.navigateByUrl('/home');
      });

    });

    document.addEventListener("offline", async () => {
      const alert = await this.alertController.create({
        header: 'Network was disconnected :-(',
        subHeader: 'Please check your connection and Try Again!',
        buttons: ['Okay']
      });
      await alert.present();
    }, false);
  }
}
