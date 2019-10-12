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

  constructor(public modalCtrl:ModalController,public splashscreen:SplashScreen,public route:Router) { }

  ngOnInit() {
    this.splashscreen.hide();

    timer(5000).subscribe(()=>{
      console.log("aayu");
      this.route.navigateByUrl('/home');
    });
  }

}
