import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { IProduct } from '../interfaces/iproduct';
import { IUser } from '../interfaces/iuser';
import { IOrder } from '../interfaces/iorder';


@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit {
  cartItems: IProduct[];
  totalCost = 0;
  userData: IUser;
  location: any;
  order: IOrder [];

  constructor(
    private service: DataService
    ) { }

  ngOnInit() {
    this.getCartItems();
    this.getUserData();
    // console.log(this.userData);

  }

  getCartItems(){
    this.cartItems = this.service.getSessionCartItems();
    this.caluculateCost()
  }

  caluculateCost(){
    this.totalCost = this.service.caluculateTotalCost();
  }

  getUserData(){
    this.userData = this.service.getSessionUserData();
    console.log(this.userData);
  }

  // Back to previous page
  goBack(): void {
    this.location.back();
  }

  submit(order: IOrder) {
    this.service.submitOrder(order);
  }
}
