import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';

@Component({
    selector: 'page-strip',
    templateUrl: 'strip.html'
})
export class StripPage {
    stripTitle: String;
    strip: String;

    constructor(public navCtrl: NavController, public navParams: NavParams) {
        // If we navigated to this page, we will have an item available as a nav param
        this.stripTitle = navParams.get('stripTitle');
        this.strip = navParams.get('strip');
    }

}
