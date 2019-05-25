import { Component, OnInit } from '@angular/core';
import { IProduct } from '../interfaces/iproduct';
import { DataService } from '../services/data.service';
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
  totalPrice = 0;

  faTrashAlt = faTrashAlt;


  constructor(
    private service:DataService,
    ) { }

  ngOnInit() {
    this.getCartItems();
    this.caluculateCost();
  }

  getCartItems(){
    this.cartItems = this.service.getSessionCartItems();
  }

  caluculateCost(){
    this.totalPrice = 0;
    for (let i = 0; i <this.cartItems.length; i++){
      this.totalPrice += this.cartItems[i].price;
    }
    return this.totalPrice;
  }


  removeFromCart(item: number) {
    this.service.RemoveFromSessionStorage(item);
    this.caluculateCost();
  }

}
