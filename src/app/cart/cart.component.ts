import { Component, OnInit } from '@angular/core';
import { IProduct } from '../interfaces/iproduct';
import { DataService } from '../services/data.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  
  cartItems: IProduct[];
  NumberOfCartItems: number;
  isCartItems = this.NumberOfCartItems > 0;

  constructor(
    private service:DataService,
    private location: Location,
    ) { }

  ngOnInit() {
    this.getCartItems();
    console.log(this.isCartItems);
    console.log(this.NumberOfCartItems);

  }

  getCartItems(){
    this.cartItems = this.service.getSessionCartItems();
    this.countNumberOfCartItems();
  }

  countNumberOfCartItems() {
    this.NumberOfCartItems = this.cartItems.length;

    return this.NumberOfCartItems;
  }

  removeFromCart(item: number) {
    this.service.RemoveFromSessionStorage(item);
    // location.reload(true);
  }

  // Back to previous page
  goBack(): void {
    this.location.back();
  }

}
