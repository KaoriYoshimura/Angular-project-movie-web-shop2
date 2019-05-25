import { Component, OnInit } from '@angular/core';
import { IProduct } from '../interfaces/iproduct';
import { DataService } from '../services/data.service';
import { Location } from '@angular/common';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartItems: IProduct[];
  NumberOfCartItems: number;
  isCartItems = this.NumberOfCartItems > 0;
  totaPrice = 0;

  faTrashAlt = faTrashAlt;


  constructor(
    private service:DataService,
    private location: Location,
    ) { }

  ngOnInit() {
    this.getCartItems();
    this.caluculateCost();
  }

  getCartItems(){
    this.cartItems = this.service.getSessionCartItems();
    this.countNumberOfCartItems();
  }

  caluculateCost(){
    for (let i = 0; i <this.cartItems.length; i++){
      this.totaPrice += this.cartItems[i].price;
    }
    return this.totaPrice;
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
