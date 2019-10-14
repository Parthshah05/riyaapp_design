import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { HttpClientModule } from "@angular/common/http";
import { AppComponent } from './app.component';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";

import { AppRoutingModule } from './app-routing.module';
<<<<<<< HEAD
import { UserDbService } from './user-db.service';
import { ModalPageModule } from './modal/modal.module';
=======
import { from } from 'rxjs';

import { ProductsDbService } from './providers/products-db/products-db.service';
import { UserDbService } from './providers/user-db/user-db.service';
>>>>>>> 42f84ebf0998e2f97060efae338adee7c4fc081b

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
<<<<<<< HEAD
    ModalPageModule
=======
    ReactiveFormsModule,
    FormsModule
>>>>>>> 42f84ebf0998e2f97060efae338adee7c4fc081b
  ],
  providers: [
    StatusBar,
    SplashScreen,
<<<<<<< HEAD
    UserDbService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
=======
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    ProductsDbService,
    UserDbService
>>>>>>> 42f84ebf0998e2f97060efae338adee7c4fc081b
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
