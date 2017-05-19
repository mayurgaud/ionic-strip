import {Storage} from '@ionic/storage';
import {Injectable} from "@angular/core";
@Injectable()
export class ShareService {

  filterYear: number;
  filterMonth: number;
  favItems = [];
  constructor(public storage:Storage) {
    this.filterYear = 0;
    this.filterMonth = 0;
    this.storage.get('favImages').then((val) => {
      if(val) {
        val.forEach((item) => {
          this.favItems.push(item);
        });
      }
    });
  }
  setYear(year) {
    this.filterYear = year;
  }

  getYear() {
    return this.filterYear;
  }

  setMonth(month) {
    this.filterMonth = month;
  }

  getMonth() {
    return this.filterMonth;
  }

  setFavItems(item) {
    this.favItems.push(item);
  }

  getFavItems() {
    return this.favItems;
  }
}
