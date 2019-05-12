import { Component, OnInit } from '@angular/core';
import { IProduct } from '../interfaces/iproduct';
// import { MockDataService } from '../services/mock-data.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  products: IProduct[];

  // Inject the class of DataService
  constructor(private service:DataService) { }

  ngOnInit() {
    this.service.getData().subscribe((data) => {
      this.products = data;
    });
  }

}
