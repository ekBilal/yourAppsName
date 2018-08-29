import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavParams, ModalController, ToastController, LoadingController } from 'ionic-angular';
import { DetailPage } from '../detail/detail';
import { Item } from '../../models/Item';
import { Subscription } from 'rxjs/Subscription';
import { ItemsService } from '../../service/items.service';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})

export class ListPage implements OnInit, OnDestroy{
  selectedItem: any;
  icons: string[];
  itemsList: Item[];
  itemsSubscription: Subscription;

  constructor(private modCtrl: ModalController, 
              private navParams: NavParams,
              private itemsService: ItemsService,
              private toastCtrl : ToastController,
              private loadingCtrl : LoadingController
            ) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');

    // Let's populate this page with some filler content for funzies
    this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
    'american-football', 'boat', 'bluetooth', 'build'];

    for (let i = 1; i < 21; i++) {
      this.itemsList.push({
        title: 'Item ' + i,
        note: 'This is item #' + i,
        icon: this.icons[Math.floor(Math.random() * this.icons.length)]
      });
    }
  }

  itemTapped(event, item) {
    let modal = this.modCtrl.create(DetailPage, {
      item: item
    });
    modal.present();
  }

  onSaveList() {
    let loader = this.loadingCtrl.create({
      content: 'Sauvegarde en cours…'
    });
    loader.present();
    this.itemsService.saveData().then(
      () => {
        loader.dismiss();
        this.toastCtrl.create({
          message: 'Données sauvegardées !',
          duration: 3000,
          position: 'bottom'
        }).present();
      },
      (error) => {
        loader.dismiss();
        this.toastCtrl.create({
          message: error,
          duration: 3000,
          position: 'bottom'
        }).present();
      }
    );
  }

  ngOnInit(){
    this.itemsSubscription = this.itemsService.items$.subscribe(
      (items: Item[])=>{
        this.itemsList = items;
      }
    )
  }

  ngOnDestroy(){
    this.itemsSubscription.unsubscribe();
  }
}
