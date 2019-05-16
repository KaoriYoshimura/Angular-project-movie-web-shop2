import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ICategory } from 'src/app/interfaces/icategory';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  // Input decorator
  @Input() homeCategories: ICategory;

  // Output decorator
  @Output() categoryEvent = new EventEmitter<number>();

  filterByCategory(){
    // pass category to EventEmitter
    // this.categoryEvent.emit(this.homeCategories.id);
    this.categoryEvent.emit(6);
  }
  
  constructor() { }

  ngOnInit() {
  }

}
