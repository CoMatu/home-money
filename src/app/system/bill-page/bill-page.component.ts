import { Component, OnInit } from '@angular/core';

import { BillService } from '../shared/services/bill.service';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-bill-page',
  templateUrl: './bill-page.component.html',
  styleUrls: ['./bill-page.component.scss']
})
export class BillPageComponent implements OnInit {

  constructor(private billService: BillService) { }

  ngOnInit() {
    const value = combineLatest(
      this.billService.getBill(),
      this.billService.getCurrency()
    )
    .pipe(map((bill: any, currency: any) => {
      return {bill, currency};
    }));

    console.log(value);
  }

}
