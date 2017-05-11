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

    items: any;

    constructor(public navCtrl: NavController, public http: Http) {
        this.http.get('http://104.131.168.232:3000/strips').map(res => res.json()).subscribe(data => {
            this.items = data;
        });
    }

    doInfinite(infiniteScroll) {
        setTimeout(() => {
            this.http.get('http://104.131.168.232:3000/strips?offset=' + this.items.length).map(res => res.json()).subscribe(data => {
                for(var i = 0; i < data.length; i++) {
                    this.items.push(data[i]);
                }
            });
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
