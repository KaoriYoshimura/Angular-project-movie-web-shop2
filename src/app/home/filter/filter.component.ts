import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  // Create output decorator
  @Output() queryEvent = new EventEmitter<string>();

  // Function to emit "query" when something is typed in the input filed
  filterByCategory(query: string){
    // pass query to EventEmitter
    this.queryEvent.emit(query);
  }
  
  constructor() { }

  ngOnInit() {
  }

}
