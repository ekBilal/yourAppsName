import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {
  item: {title: string, note: string, icon: string};

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.item = navParams.data;
    console.log(this.item);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailPage');
  }

}
