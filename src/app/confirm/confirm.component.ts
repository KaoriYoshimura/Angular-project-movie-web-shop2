import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { IProduct } from '../interfaces/iproduct';
import { IUser } from '../interfaces/iuser';
import { IOrder, IOrderRow } from '../interfaces/iorder';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit {
  cartItems: IProduct[];
  totalCost = 0;
  userData: IUser;
  orders: IOrder;
  now = moment().format('LLLL');
  orderRows: IOrderRow[] = [];

  constructor(
    private service: DataService,
    private location: Location,
    private router: Router
    ) { }

  ngOnInit() {
    this.getCartItems();
    this.getUserData();
    this.caluculateCost();
  }

  getCartItems(){
    this.cartItems = this.service.getSessionCartItems();
  }

  caluculateCost(){
    for (let i = 0; i <this.cartItems.length; i++){
      this.totalCost += this.cartItems[i].price;
    }
    return this.totalCost;
}

  getUserData(){
    this.userData = this.service.getSessionUserData();
  }

  // Back to previous page
  goBack(): void {
    this.location.back();
  }

  createOrderRows(){
    for(var i=0; i<this.cartItems.length; i++){
      this.orderRows.push(
        {ProductId: this.cartItems[i].id, Amount: 1, Id: null}
        );
    }
  }

  createOrders(){
    this.createOrderRows();

    this.orders = {
      id: 0,
      companyId: 25,
      created: this.now,
      createdBy: this.userData.email,
      paymentMethod: this.userData.paymentMethod,
      totalPrice:this.totalCost,
      status: 0,
      orderRows: this.orderRows
    };
  }

  orderSubmit() {
    this.createOrders();

    this.service.submitOrder(this.orders).subscribe(
      response => {console.log(response);},
      err => {console.log(err.message);},
      () => { console.log('completed');}
    );

    sessionStorage.clear();
    this.getCartItems();
    // Trigger to update cart amount in header
    let numberOfCartItems = this.cartItems.length;
    this.service.onNotifyCartAmoutUpdated(numberOfCartItems);
    this.router.navigate(['/ordersent']);
 }

}
