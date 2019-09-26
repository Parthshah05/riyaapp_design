import { Component, OnInit } from '@angular/core';
import { queue } from '../../../node_modules/rxjs/internal/scheduler/queue';
import { LoadingController, NavController, NavParams } from '../../../node_modules/@ionic/angular';
import { NavComponent } from '../../../node_modules/@ionic/core';
import { Router, RouterModule, ActivatedRoute } from '../../../node_modules/@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {
  category = 'All products';
  qty: number = 1;
  public items: Array<{ title: string; categ: string; qty: number }> = [];
  constructor(activated_route: ActivatedRoute) {
    console.log(activated_route.snapshot.paramMap.get('cat'));
    this.category = 'All products';
    if (activated_route.snapshot.paramMap.get('cat') != null) {
      this.category = activated_route.snapshot.paramMap.get('cat');
    }
    for (let i = 1; i < 11; i++) {
      this.items.push({
        title: 'Item ' + i,
        categ: this.category ,
        qty: 1
      });
    }
  }

  ngOnInit() {
  }
  onInc(e, i) {
    i.qty += 1;
  }
  onDec(e, i) {
    i.qty -= 1;
  }
  // add back when alpha.4 is out
  // navigate(item) {
  //   this.router.navigate(['/list', JSON.stringify(item)]);
  // }
}
