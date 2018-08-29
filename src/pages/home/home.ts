import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  constructor(public navCtrl: NavController, private alertCtrl: AlertController) {
  }

  onToggleButton(){
    let alert = this.alertCtrl.create({
      title: 'Etes vous certain ?',
      subTitle: 'Appelez les anedek',
      buttons: [
        {
          text:'Annuler',
          role: 'cancel'
        },
        {
          text:'Oooh oui',
          handler:()=>console.log('confirmé')
        }
      ]
    });
    alert.present();
  }

}