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

  // Function to emit "query" when something is typed in the input filed
  searchByQuery(query: string){
    // pass query to EventEmitter
    this.queryEvent.emit(query);
  }
  
  constructor() { }

  ngOnInit() {
  }

}
