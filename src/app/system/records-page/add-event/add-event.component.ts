import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as moment from 'moment';

import { Category } from '../../shared/models/category.model';
import { AppEvent } from '../../shared/models/event.model';
import { EventsService } from '../../shared/services/events.service';
import { BillService } from '../../shared/services/bill.service';
import { Bill } from '../../shared/models/bill.model';
import { mergeMap } from 'rxjs/operators';
import { Message } from 'src/app/shared/models/message.model';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss']
})
export class AddEventComponent implements OnInit {

  @Input() categories: Category[] = [];
  types = [
    {type: 'income', label: 'Доход'},
    {type: 'outcome', label: 'Расход'}
  ];

  message: Message;

  constructor(
    private eventsService: EventsService,
    private billService: BillService
    ) { }

  ngOnInit() {
    this.message = new Message('danger', '');
  }

  private showMessage(text: string) {
    this.message.text = text;
    window.setTimeout(() => this.message.text = '', 5000);
  }

  onSubmit(form: NgForm) {
    let {amount, description, category, type} = form.value;
    if (amount < 0) {
      amount *= -1;
    }

    const event = new AppEvent(type, amount, +category,
    moment().format('DD.MM.YYYY HH:mm:ss'), description);

    console.log(event);

    this.billService.getBill()
    .subscribe((bill: Bill) => {
      let value = 0;
      if (type === 'outcome') { 
        if (amount > bill.value) {
          this.showMessage(`На счету недостаточно средств. Вам не хватает ${amount - bill.value}`);
          return;
        } else {
          value = bill.value - amount;
        }
      } else {
        value = bill.value + amount;
      }

      this.billService.updateBill({value, currency: bill.currency})
      .pipe(
        mergeMap(() => this.eventsService.addEvent(event))
      ).subscribe(() => {
        form.setValue({
          amount: 0,
          description: '',
          category: 1,
          type: 'outcome'
        });
      });
    });

  }

}
