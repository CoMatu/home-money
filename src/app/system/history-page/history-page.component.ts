import { Component, OnInit, OnDestroy } from '@angular/core';
import { combineLatest, Subscription } from 'rxjs';

import { CategoriesService } from '../shared/services/categories.service';
import { EventsService } from '../shared/services/events.service';
import { Category } from '../shared/models/category.model';
import { AppEvent } from '../shared/models/event.model';

@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.scss']
})
export class HistoryPageComponent implements OnInit, OnDestroy {

  sub1: Subscription;

  isLoaded = false;

  chartData = [];

  categories: Category[] = [];
  events: AppEvent[] = [];

  constructor(
    private categoriesService: CategoriesService,
    private eventService: EventsService
  ) { }

  ngOnInit() {
    this.sub1 = combineLatest(
      this.categoriesService.getCategories(),
      this.eventService.getEvents()
    )
      .subscribe((data: [Category[], AppEvent[]]) => {
        this.categories = data[0];
        this.events = data[1];

        this.calculateChartData();

        this.isLoaded = true;
      });
  }

  calculateChartData(): void {
    this.chartData = [];

    this.categories.forEach((cat) => {
      const catEvent = this.events.filter((e) => e.category === cat.id && e.type === 'outcome');
      this.chartData.push({
        name: cat.name,
        value: catEvent.reduce((total, e) => {
          total += e.amount;
          return total;
        }, 0)
      }
      );
    });
  }

  ngOnDestroy() {
    if (this.sub1) {
      this.sub1.unsubscribe();
    }
  }

}
