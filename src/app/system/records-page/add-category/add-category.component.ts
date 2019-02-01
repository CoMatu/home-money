import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Category } from '../../shared/models/category.model';
import { CategoriesService } from '../../shared/services/categories.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnDestroy {

  sub1: Subscription;

  @Output() categoryAdd = new EventEmitter<Category>();

  constructor(private categoriesService: CategoriesService) { }

  onSubmit(form: NgForm) {
    // tslint:disable-next-line:prefer-const
    let { name, capacity } = form.value;
    if (capacity < 0) { capacity *= -1; }

    const category = new Category(name, capacity);

    this.sub1 = this.categoriesService.addCategory(category)
    .subscribe(() => {
      form.reset();
      form.form.patchValue({capacity: 1});
      this.categoryAdd.emit(category);
      console.log(category);
    });
  }

  ngOnDestroy() {
    if (this.sub1) {this.sub1.unsubscribe(); }
  }

}
