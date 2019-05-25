import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../services/data.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { IProduct } from '../interfaces/iproduct';
import { Router } from '@angular/router';
import { ICategory } from '../interfaces/icategory';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbdModalContent } from './error-dialog/error-dialog.component';

// @Component({
//   selector: 'ngbd-modal-content',
//   template: `
//     <div class="modal-header">
//       <h4 class="modal-title">Hi there!</h4>
//       <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
//         <span aria-hidden="true">&times;</span>
//       </button>
//     </div>
//     <div class="modal-body">
//       <p>Hello, {{name}}!</p>
//     </div>
//     <div class="modal-footer">
//       <button type="button" class="btn btn-outline-dark" (click)="activeModal.close('Close click')">Close</button>
//     </div>
//   `
// })
// export class NgbdModalContent {
//   @Input() name;

//   constructor(public activeModal: NgbActiveModal) {}
// }
@Component({
  selector: 'app-details',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  details: IProduct;
  categories: ICategory[];
  categoryResults: ICategory[] = [];

  // To check if product already exists in sessionStorage
  cartItems: IProduct[] = [];



  // Implement ActivatedRoute to use dependency injection
  constructor(
    private route: ActivatedRoute,
    private service: DataService,
    private router: Router,
    private location: Location,
    private modalService: NgbModal
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
    // Fetch cart items from sessionStorage
    this.cartItems = this.service.getSessionCartItems();
    console.log(this.cartItems);
    // If there is no items in cart add to cart
    if(this.cartItems.length === 0) {
      this.addSessionStorage();
      // Otherwise check if the product is already in the cart
    } else {
      let isDuplicate = false;
      for (var i=0; i<this.cartItems.length;i++){
        // If there is the same product in the cart mark as duplicate
        if(this.details.id === this.cartItems[i].id) {
          isDuplicate = true;
        }
      }
      // If there is no same component in the cart add to the cart
      if(!isDuplicate){
      this.addSessionStorage();
      // Otherwise show error dialog
      } else {
        this.errorDialog();
      }
    }
  }

  // add sessionStorage and move to cart page
  addSessionStorage(){
    this.cartItems.push(this.details);
    this.service.addToCart(this.cartItems);
    this.router.navigate(['/cart']);
  }

  // Show error dialog
  errorDialog(){
    const modalRef = this.modalService.open(NgbdModalContent, {
      centered: true }
      );
    modalRef.componentInstance.name = 'This product is already in the cart!';
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
      },
      error => console.log(error),
      () => console.log('HPPT request for category completed')
    );
  }

}
