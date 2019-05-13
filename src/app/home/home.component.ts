import { Component, OnInit } from '@angular/core';
import { IProduct } from '../interfaces/iproduct';
// import { MockDataService } from '../services/mock-data.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: [
    './home.component.scss'
  ]
})
export class HomeComponent implements OnInit {
  products: IProduct[];
  searchResults: IProduct[];
  errorMessage: string;

  isValid = this.searchResults && this.searchResults.length;

  // Inject the class of DataService
  constructor(private service:DataService) { }

  ngOnInit() {
    this.getMovie()
  }

  getMovie(){
    this.service.getData().subscribe((data) => {
      this.products = data;
    });
  }

  searchProduct(QueryFromInput:string){
      this.service.searchProductApi(QueryFromInput).subscribe(
        response => this.products = response,
        error => console.log(error),
        () => console.log('HTTP request completed')
    );

    console.log(this.searchResults);

  //   this.service.searchProductApi(QueryFromInput).subscribe((data) =>{
  //     this.products = data;
    
  // });
  }

}
