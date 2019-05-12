import { Component, OnInit } from '@angular/core';
import { IProduct } from '../interfaces/iproduct';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  
  cartItems: IProduct[];

  constructor(private service:DataService) { }

  ngOnInit() {
    this.getCartItems();
  }

  getCartItems(){
    this.cartItems = this.service.getSessionCartItems();
  }

  removeFromCart(item: number) {
    this.service.RemoveFromSessionStorage(item);
  }

}
