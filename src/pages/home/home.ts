import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {StripPage} from '../strip/strip';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    items = [];

    constructor(public navCtrl: NavController, public http: Http) {
        this.http.get('http://localhost:3000/strips').map(res => res.json()).subscribe(data => {
            this.items = data;
            console.log(data);
        });
    }

    doInfinite(infiniteScroll) {
        setTimeout(() => {
            for (let i = 0; i < 5; i++) {
                this.items.push(this.items.length);
            }

            infiniteScroll.complete();
        }, 500);
    }

    itemTapped(event, item) {

        this.navCtrl.push(StripPage, {
            stripTitle: item.title,
            strip: item.mainImage
        });
    }
}
