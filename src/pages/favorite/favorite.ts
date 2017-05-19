import {Component} from '@angular/core';
import {Storage} from '@ionic/storage';
import {NavController} from 'ionic-angular';
import {StripPage} from '../strip/strip';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-favorite',
  templateUrl: 'favorite.html'
})
export class FavoritePage {
  strip =[];

  constructor(public storage: Storage, public navCtrl: NavController) {
    storage.get('favImages').then((val) => {
      this.strip = val;
    });
  }

  itemTapped(event, item) {
    this.navCtrl.push(StripPage, {
      item: item,
      items: this.strip,
    });
  }
}
