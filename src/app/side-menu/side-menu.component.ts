import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
})
export class SideMenuComponent implements OnInit {

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
    private storage: Storage,
    private menuCtrl: MenuController) { }

  ngOnInit() {
    var user_id = "";
    this.storage.get('user_id').then((val) => {
      console.log('user_id', val);
      user_id = val;
    });

    if (user_id.length > 0) {
      this.menuCtrl.enable(true, 'withLogout');
      this.menuCtrl.open('withLogout');
    }
    else {
      this.menuCtrl.enable(true, 'withoutLogout');
      this.menuCtrl.open('withoutLogout');
    }
  }

}
