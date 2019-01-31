import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Category } from '../../shared/models/category.model';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit {

  @Input() categories: Category[] = [];
  @Output() categoryEdit = new EventEmitter<Category>();

  constructor() { }

  ngOnInit() { }

  onSubmit(form: NgForm) {

  }

}
