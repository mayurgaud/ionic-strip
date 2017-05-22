import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {StripPage} from '../strip/strip';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {ShareService} from '../services/ShareService'
import {ENV} from '../../config/environment.prod'

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    items: any;

    constructor(public navCtrl: NavController, public http: Http, private shareService: ShareService) {
        let month = this.shareService.getMonth();
        let year = this.shareService.getYear();

        if (month && year) {
            this.http.get(ENV.API_URL + '?year=' + year + '&month=' + month).map(res => res.json()).subscribe(data => {
                this.items = data;
            });
        } else if (year) {
            this.http.get(ENV.API_URL + '?year=' + year).map(res => res.json()).subscribe(data => {
                this.items = data;
            });
        } else if (month) {
            this.http.get(ENV.API_URL + '?month=' + month).map(res => res.json()).subscribe(data => {
                this.items = data;
            });
        } else {
            this.http.get(ENV.API_URL).map(res => res.json()).subscribe(data => {
                this.items = data;
            });
        }

    }

    doInfinite(infiniteScroll) {
        let month = this.shareService.getMonth();
        let year = this.shareService.getYear();

        setTimeout(() => {
            if (month && year) {
                this.http.get(ENV.API_URL + '?year=' + year + '&month=' + month + '&offset=' + this.items.length).map(res => res.json()).subscribe(data => {
                    for (var i = 0; i < data.length; i++) {
                        this.items.push(data[i]);
                    }
                });
            } else if (year) {
                this.http.get(ENV.API_URL + '?year=' + year + '&offset=' + this.items.length).map(res => res.json()).subscribe(data => {
                    for (var i = 0; i < data.length; i++) {
                        this.items.push(data[i]);
                    }
                });
            } else if (month) {
                this.http.get(ENV.API_URL + '?month=' + month + '&offset=' + this.items.length).map(res => res.json()).subscribe(data => {
                    for (var i = 0; i < data.length; i++) {
                        this.items.push(data[i]);
                    }
                });
            } else {
                this.http.get(ENV.API_URL + '?offset=' + this.items.length).map(res => res.json()).subscribe(data => {
                    for (var i = 0; i < data.length; i++) {
                        this.items.push(data[i]);
                    }
                });
            }
            infiniteScroll.complete();
        }, 500);
    }

    itemTapped(event, item) {
        this.navCtrl.push(StripPage, {
            item: item,
            items: this.items,
        });
    }
}
