import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppComponent } from './app.component';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";

import { AppRoutingModule } from './app-routing.module';
import { UserDbService } from './user-db.service';
import { ModalPageModule } from './modal/modal.module';
import { from } from 'rxjs';

import { ProductsDbService } from './providers/products-db/products-db.service';
/* import { UserDbService } from './providers/user-db/user-db.service'; */

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    ModalPageModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    UserDbService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    ProductsDbService,
    UserDbService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
