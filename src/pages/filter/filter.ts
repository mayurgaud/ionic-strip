import {Component} from '@angular/core';
import {ShareService} from '../services/ShareService'
@Component({
    selector: 'page-filter',
    templateUrl: 'filter.html'
})
export class FilterPage {
    year: number;
    month: number;

    constructor(private shareService: ShareService) {
        this.month = this.shareService.getMonth();
        this.year = this.shareService.getYear();
    }

    onMonthChange(monthValue) {
        this.shareService.setMonth(monthValue);
    }

    onYearChange(yearValue) {
        this.shareService.setYear(yearValue);
    }

    clearClick() {
        this.shareService.setMonth(0);
        this.shareService.setYear(0);
        this.month = 0;
        this.year = 0;
    }
}
