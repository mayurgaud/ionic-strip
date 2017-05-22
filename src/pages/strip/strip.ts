import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Storage} from '@ionic/storage';
import {ShareService} from '../services/ShareService';

@Component({
    selector: 'page-strip',
    templateUrl: 'strip.html'
})
export class StripPage {
    strip: Object;
    prevItem: Object;
    nextItem: Object;
    items: any;

    constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, private shareService: ShareService) {
        // If we navigated to this page, we will have an item available as a nav param
        this.strip = navParams.get('item');
        this.items = navParams.get('items');
    }

    previousImage(event, item) {
        let index = this.items.findIndex(x => x.title === item.title);
        this.prevItem = (index > 0) ? this.items[index - 1] : this.items[0];

        this.navCtrl.push(StripPage, {
            item: this.prevItem,
            items: this.items,
        });
    }

    nextImage(event, item) {
        let itemLength = this.items.length;
        let index = this.items.findIndex(x => x.title === item.title);
        this.nextItem = (index < (itemLength - 1)) ? this.items[index + 1] : this.items[itemLength - 1];

        this.navCtrl.push(StripPage, {
            item: this.nextItem,
            items: this.items,
        });
    }

    favoriteImage(event, item) {
        this.shareService.setFavItems(item);
        this.storage.set('favImages', this.shareService.getFavItems());
    }
}
