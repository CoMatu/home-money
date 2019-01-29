import { Component, OnInit, OnDestroy } from '@angular/core';

import { BillService } from '../shared/services/bill.service';
import { combineLatest, Subscription, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Bill } from '../shared/models/bill.model';

@Component({
  selector: 'app-bill-page',
  templateUrl: './bill-page.component.html',
  styleUrls: ['./bill-page.component.scss']
})
export class BillPageComponent implements OnInit, OnDestroy {
  subscription: Subscription;

  constructor(private billService: BillService) { }

  ngOnInit() {
    this.subscription = combineLatest(
      this.billService.getBill(),
      this.billService.getCurrency()
    )
    .subscribe((data: [Bill, any]) => {
      console.log(data);
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
