import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Bill } from '../models/bill.model';
import { BaseApi } from 'src/app/shared/core/base-api';

@Injectable()
export class BillService extends BaseApi {
    constructor(public http: HttpClient) {
        super(http);
    }

    getBill(): Observable<any> {
        return this.get('bill');
    }

    updateBill(bill: Bill): Observable<any> {
        return this.put('bill', bill);
    }

    getCurrency() {
        return this.http.get('http://data.fixer.io/api/latest?access_key=c391d1fdf045da8fe9228667d6621aef&format=1');
    }

}
