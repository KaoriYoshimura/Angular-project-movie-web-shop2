import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { IProduct } from '../interfaces/iproduct';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-details',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  details: IProduct;
  NumberOfCartItems : number;

  // Implement ActivatedRoute to use dependency injection
  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private service: DataService
  ) { }

  // Get the property params from product.component, 'id' and copies the data into myParams. Use this id to collect the item with the same id from API.
  ngOnInit() {
    this.route.params.subscribe(myParams => {
      const id = myParams['id'];
      this.getMovie(id);
      this.NumberOfCartItems = this.service.countNumberOfCartItems();
    });

  }

  // Create function separately in order to test even it works within ngOnInit
  getMovie(id: number){
    this.service.getDetailById(id).subscribe((detailsFromApi)=> {
      this.details = detailsFromApi;
    });
  }

  // Back to previous page
  goBack(): void {
    this.location.back();
  }

  addToCart(): void {
    this.service.addToCart(this.details);
    this.NumberOfCartItems = this.service.countNumberOfCartItems();
  }
}
