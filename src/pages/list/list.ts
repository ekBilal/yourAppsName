import { Component, OnInit, OnDestroy } from '@angular/core';
import { ModalController, ToastController, LoadingController } from 'ionic-angular';
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
  itemsList: Array<Item>;
  itemsSubscription: Subscription;

  constructor(private modCtrl: ModalController, 
              private itemsService: ItemsService,
              private toastCtrl : ToastController,
              private loadingCtrl : LoadingController
            ) {
    // If we navigated to this page, we will have an item available as a nav param
    // this.selectedItem = navParams.get('item');

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

  onFetchList() {
    let loader = this.loadingCtrl.create({
      content: 'Récuperation en cours…'
    });
    loader.present();
    this.itemsService.retrieveData().then(
      () => {
        loader.dismiss();
        this.toastCtrl.create({
          message: 'Données récupérées !',
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
    this.onFetchList();
    this.itemsSubscription = this.itemsService.items$.subscribe(
      (items: Item[])=>{
        this.itemsList = items;
        console.log(items);
      }
    )
  }

  ngOnDestroy(){
    this.itemsSubscription.unsubscribe();
  }
}
