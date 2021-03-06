import { async } from '@angular/core/testing';
import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { Platform, ModalController, AlertController, Events, IonRouterOutlet, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router, RouterEvent, NavigationEnd } from '@angular/router';

import { timer } from 'rxjs';
import { ProductsDbService } from './providers/products-db/products-db.service';
import { Storage } from '@ionic/storage';
import { isNullOrUndefined } from 'util';
import { CacheService, Cache } from 'ionic-cache-observable';
import { Products_Category_Classs } from './shared/Products_Category_class';
// import { Observable } from '../../node_modules/rxjs/internal/observable';
import { Observable } from '../../node_modules/rxjs/observable';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})

export class AppComponent implements OnInit {

  appPages: Array<{ title: string, url: string, icon: string }>;
  @ViewChildren(IonRouterOutlet) routerOutlets: QueryList<IonRouterOutlet>;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public modalCtrl: ModalController,
    public route: Router,
    private alertController: AlertController,
    private productService: ProductsDbService,
    private events: Events,
    private storage: Storage,
    private cacheService: CacheService,
    private navCtrl: NavController
  ) {

    this.initializeApp();
    this.backButtonEnable();


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
    // this.productService.GetAllProducts();
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
      setTimeout(() => {
        this.splashScreen.hide();
      }, 3000);
      // this.splashScreen.hide();
      this.route.navigateByUrl('/home');
      // timer(5000).subscribe(() => {
      //   this.route.navigateByUrl('/home');
      // });

    });

    document.addEventListener("offline", async () => {
      const alert = await this.alertController.create({
        header: 'Network was disconnected :-(',
        subHeader: 'Please check your connection and Try Again!',
        buttons: ['Okay']
      });
      await alert.present();
    }, false);
    const sourceData: Observable<Products_Category_Classs[]> = this.productService.GetAllProductsAnother();
    // let productsObservable:Observable<Products_Category_Classs[]>;
    this.cacheService.register('products', sourceData, true).mergeMap((cache: Cache<Products_Category_Classs[]>) => cache.get())
      .subscribe((data) => {
        console.log(' after registering in app.component.ts ', data);
      });
  }

  backButtonEnable() {
    this.platform.backButton.subscribe(
      async () => {
        this.routerOutlets.forEach(
          async (outlet: IonRouterOutlet) => {
            if (this.route.url === '/home' || this.route.url === '') {
              this.presentAlertConfirm();
            }
            else if (this.route.url === '/list' || this.route.url === '/cart' || this.route.url === '/contact' || this.route.url === '/profile') {
              this.navCtrl.navigateRoot(['/home']);
            }
          }
        );
      }
    );
  }


  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: 'Confirm Exit!',
      message: 'Do you want to exit???',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Yes',
          handler: () => {
            console.log('Confirm Okay');
            navigator['app'].exitApp();
          }
        }
      ]
    });

    await alert.present();
  }

}
