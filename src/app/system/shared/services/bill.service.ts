import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Bill } from '../models/bill.model';

@Injectable()
export class BillService {
    constructor(private http: HttpClient) {}

    getBill(): Observable<any> {
        return this.http.get('http://localhost:3000/bill');
    }

    getCurrency() {
        return this.http.get('http://data.fixer.io/api/latest?access_key=c391d1fdf045da8fe9228667d6621aef&format=1');
    }

}
