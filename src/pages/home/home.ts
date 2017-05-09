import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {StripPage} from '../strip/strip';


@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    items = [];

    constructor(public navCtrl: NavController) {
        for (let i = 0; i < 5; i++) {
            this.items.push(this.items.length);
        }
    }

    doInfinite(infiniteScroll) {
        setTimeout(() => {
            for (let i = 0; i < 5; i++) {
                this.items.push( this.items.length );
            }

            infiniteScroll.complete();
        }, 500);
    }

    itemTapped(event, item) {

        this.navCtrl.push(StripPage, {
            item: item
        });
    }
}
