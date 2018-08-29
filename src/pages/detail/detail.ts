import { Component } from '@angular/core';
import { NavController, NavParams, Item } from 'ionic-angular';

@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {
  item: {title: string, note: string, icon: string};

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ngOnInit(){
    this.item= this.navParams.get('item');
  }

  ionViewDidLoad() {
    console.log(this.item);
  }
}
