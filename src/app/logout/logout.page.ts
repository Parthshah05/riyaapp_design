import { Component, OnInit } from '@angular/core';
import { Events } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.page.html',
  styleUrls: ['./logout.page.scss'],
})
export class LogoutPage implements OnInit {

  constructor(
    private events: Events,
    private storage: Storage,
    private route: Router
  ) {


  }

  ngOnInit() {
    this.storage.remove('user_id');
    this.storage.clear();
    this.events.publish('user:loggedout');
    this.route.navigateByUrl('/home');
  }

}
