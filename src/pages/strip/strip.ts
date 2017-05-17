import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';

@Component({
  selector: 'page-strip',
  templateUrl: 'strip.html'
})
export class StripPage {
  stripTitle: String;
  strip: String;
  nextTitle: String;
  prevTitle: String;
  prevMainImage: String;
  nextMainImage: String;
  items: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    // If we navigated to this page, we will have an item available as a nav param
    this.stripTitle = navParams.get('stripTitle');
    this.strip = navParams.get('strip');
    this.items = navParams.get('items');
  }

  previousImage(event) {
    this.items.forEach((item, index) => {
      if (item.title == this.stripTitle) {
        this.prevTitle = (index > 0) ? this.items[index - 1].title : this.items[0].title;
        this.prevMainImage = (index > 0) ? this.items[index - 1].mainImage : this.items[0].mainImage;
        this.stripTitle = this.prevTitle;
        this.strip = this.prevMainImage;
      }
    });
  }

  nextImage(event, title) {
    let itemLength = this.items.length;
    this.items.forEach((item, index) => {
      if (item.title == title) {
        this.nextTitle = (index < (itemLength - 1)) ? this.items[index + 1].title : this.items[itemLength - 1].title;
        this.nextMainImage = (index < (itemLength - 1)) ? this.items[index + 1].mainImage : this.items[itemLength - 1].mainImage;
        this.stripTitle = this.nextTitle;
        this.strip = this.nextMainImage;
      }
    });
  }
}
