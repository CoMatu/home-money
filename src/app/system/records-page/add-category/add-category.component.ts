import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Category } from '../../shared/models/category.model';
import { CategoriesService } from '../../shared/services/categories.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent {

  @Output() categoryAdd = new EventEmitter<Category>();

  constructor(private categoriesService: CategoriesService) { }

  onSubmit(form: NgForm) {
    let { name, capacity } = form.value;
    if (capacity < 0) { capacity *= -1; }

    const category = new Category(name, capacity);

    this.categoriesService.addCategory(category)
    .subscribe(() => {
      form.reset();
      form.form.patchValue({capacity: 1});
      this.categoryAdd.emit(category);
      console.log(category);
    });
  }

}
