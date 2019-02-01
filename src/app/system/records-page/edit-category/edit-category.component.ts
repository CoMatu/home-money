import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Category } from '../../shared/models/category.model';
import { Subscription } from 'rxjs';
import { CategoriesService } from '../../shared/services/categories.service';
import { Message } from 'src/app/shared/models/message.model';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit, OnDestroy {

  sub1: Subscription;

  @Input() categories: Category[] = [];
  @Output() categoryEdit = new EventEmitter<Category>();

  currentCategoryId = 1;
  currentCategory: Category;
  message: Message;

  constructor(private categoriesService: CategoriesService) { }

  ngOnInit() {
    this.message = new Message('success', '');
    this.onCategoryChange();
   }

  onCategoryChange() {
    this.currentCategory = this.categories
    .find(c => c.id === +this.currentCategoryId);
  }

  onSubmit(form: NgForm) {
    // tslint:disable-next-line:prefer-const
    let {capacity, name} = form.value;
    if (capacity < 0) { capacity *= -1; }

    const category = new Category(name, capacity, +this.currentCategoryId);

    this.sub1 = this.categoriesService.updateCategory(category)
    // tslint:disable-next-line:no-shadowed-variable
    .subscribe((category: Category) => {
      this.categoryEdit.emit(category);
      this.message.text = 'Категория успешно отредактирована.';
      window.setTimeout(() => this.message.text = '', 5000);

    });
  }

  ngOnDestroy() {
    if (this.sub1) {this.sub1.unsubscribe(); }
  }

}
