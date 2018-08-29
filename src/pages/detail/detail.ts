import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {
  item: {title: string, note: string, icon: string};

  constructor(public viewCtrl: ViewController, public navParams: NavParams) {
  }

  ngOnInit(){
    this.item= this.navParams.get('item');
  }

  dismissModal(){
    this.viewCtrl.dismiss();
  }

  ionViewDidLoad() {
    console.log(this.item);
  }
}
