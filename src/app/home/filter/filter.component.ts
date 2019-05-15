import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ICategory } from 'src/app/interfaces/icategory';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  // Input decorator
  @Input() homeCategories: ICategory;

  // Output decorator
  @Output() queryEvent = new EventEmitter<string>();
  @Output() categoryEvent = new EventEmitter<number>();

  // Function to emit "query" when something is typed in the input filed
  searchByQuery(query: string){
    // pass query to EventEmitter
    this.queryEvent.emit(query);
  }
  
  filterByCategory(){
    // pass category to EventEmitter
    this.categoryEvent.emit(this.homeCategories.id);
  }
  constructor() { }

  ngOnInit() {
  }

}
