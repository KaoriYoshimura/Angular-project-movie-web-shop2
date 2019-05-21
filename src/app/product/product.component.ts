import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { IProduct } from '../interfaces/iproduct';
import { Router } from '@angular/router';
import { ICategory } from '../interfaces/icategory';

@Component({
  selector: 'app-details',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  details: IProduct;
  NumberOfCartItems : number;
  categories: ICategory[];
  categoryResults: ICategory[] = [];

  // Implement ActivatedRoute to use dependency injection
  constructor(
    private route: ActivatedRoute,
    private service: DataService,
    private router: Router,
    private location: Location
  ) { }

  // Get the property params from product.component, 'id' and copies the data into myParams. Use this id to collect the item with the same id from API.
  ngOnInit() {
    this.route.params.subscribe(myParams => {
      const id = myParams['id'];
      this.getMovie(id);
    });
  }

  // Create function separately in order to test even it works within ngOnInit
  getMovie(id: number) {
    this.service.getDetailById(id).subscribe((detailsFromApi)=> {
      this.details = detailsFromApi;
      this.findCcategory();
    });
  }

  // Back to previous page
  goBack(): void{
    this.location.back();
  }

  addToCart(): void{
    this.service.addToCart(this.details);
    this.router.navigate(['/cart']);
  }

  findCcategory(){
    this.service.getCategory().subscribe(
      response => {
        this.categories = response;
        for(var i=0; i<this.categories.length; i++){
          for(var j=0; j<this.details.productCategory.length; j++){
            if(this.categories[i].id === this.details.productCategory[j].categoryId){
              this.categoryResults.push(this.categories[i]);
            }
          }
        }
        console.log(this.categoryResults);
      },
      error => console.log(error),
      () => console.log('HPPT request for category completed')
    );
  }

}
