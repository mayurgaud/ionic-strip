export class ShareService {

    filterYear: number;
    filterMonth: number;

    constructor() {
        this.filterYear = 0;
        this.filterMonth = 0;
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
}