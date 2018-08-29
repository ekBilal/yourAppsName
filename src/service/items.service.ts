import { Subject } from "rxjs/Subject";
import { Item } from "../models/Item";
import * as firebase from "firebase";
import DataSnapshot = firebase.database.DataSnapshot;

export class ItemsService{
  items$ = new Subject<Item[]>();
  itemsList: Item[];

  saveData() {
    console.log(this.itemsList);
    return new Promise((resolve, reject) => {
      firebase.database().ref('items').set(this.itemsList).then(
        (data: DataSnapshot) => {
          console.log("OK");
          console.log(data);
          resolve(data);
        },
        (error) => {
          console.log("K0");
          reject(error);
        }
      );
    });
  }
    
  retrieveData() {
    return new Promise((resolve, reject) => {
      firebase.database().ref('items').once('value').then(
        (data: DataSnapshot) => {
          this.itemsList = data.val();
          this.emitItems();
          resolve('Données récupérées avec succès !');
        }, (error) => {
          reject(error);
        }        
      );
    });
  }

  emitItems(){
    this.items$.next(this.itemsList.slice());
  }
}