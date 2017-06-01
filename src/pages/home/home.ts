import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {StripPage} from '../strip/strip';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import {ShareService} from '../services/ShareService'
import {ENV} from '../../config/environment.prod'
import {Storage} from '@ionic/storage';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    items: any;
    token: string;

    constructor(public navCtrl: NavController, public http: Http, private shareService: ShareService, private storage: Storage) {
        this.storage.get('token').then((val) => {
            if (val) {
                this.getStrips();
            } else {
                this.authenticate();
                this.getStrips();
            }
        });
    }

    getStrips() {
        let month = this.shareService.getMonth();
        let year = this.shareService.getYear();
        this.storage.get('token').then((val) => {
            let headers = new Headers({'Authorization': val});
            let options = new RequestOptions({headers: headers});

            if (month && year) {
                this.http.get(ENV.API_STRIPS_URL + '?year=' + year + '&month=' + month, options).map(res => res.json()).subscribe(data => {
                    this.items = data;
                });
            } else if (year) {
                this.http.get(ENV.API_STRIPS_URL + '?year=' + year, options).map(res => res.json()).subscribe(data => {
                    this.items = data;
                });
            } else if (month) {
                this.http.get(ENV.API_STRIPS_URL + '?month=' + month, options).map(res => res.json()).subscribe(data => {
                    this.items = data;
                });
            } else {
                this.http.get(ENV.API_STRIPS_URL, options).map(res => res.json()).subscribe(data => {
                    this.items = data;
                }, error => {
                    console.log(error);
                });
            }
        });

    }

    private authenticate() {
        let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
        let options = new RequestOptions({headers: headers});
        let body = `name=${ENV.username}&password=${ENV.password}`;

        this.http.post(ENV.API_URL + 'authenticate', body, options).map(res => res.json()).subscribe(data => {
            this.storage.set('token', data.token);
        }, error => {
            console.log(error);
        });
    }

    doInfinite(infiniteScroll) {
        this.storage.get('token').then((val) => {
            let month = this.shareService.getMonth();
            let year = this.shareService.getYear();
            let headers = new Headers({'Authorization': val});
            let options = new RequestOptions({headers: headers});

            setTimeout(() => {
                if (month && year) {
                    this.http.get(ENV.API_STRIPS_URL + '?year=' + year + '&month=' + month + '&offset=' + this.items.length, options).map(res => res.json()).subscribe(data => {
                        for (var i = 0; i < data.length; i++) {
                            this.items.push(data[i]);
                        }
                    });
                } else if (year) {
                    this.http.get(ENV.API_STRIPS_URL + '?year=' + year + '&offset=' + this.items.length, options).map(res => res.json()).subscribe(data => {
                        for (var i = 0; i < data.length; i++) {
                            this.items.push(data[i]);
                        }
                    });
                } else if (month) {
                    this.http.get(ENV.API_STRIPS_URL + '?month=' + month + '&offset=' + this.items.length, options).map(res => res.json()).subscribe(data => {
                        for (var i = 0; i < data.length; i++) {
                            this.items.push(data[i]);
                        }
                    });
                } else {
                    this.http.get(ENV.API_STRIPS_URL + '?offset=' + this.items.length, options).map(res => res.json()).subscribe(data => {
                        for (var i = 0; i < data.length; i++) {
                            this.items.push(data[i]);
                        }
                    });
                }
                infiniteScroll.complete();
            }, 500);
        });
    }

    itemTapped(event, item) {
        this.navCtrl.push(StripPage, {
            item: item,
            items: this.items,
        });
    }
}
