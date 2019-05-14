import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { IProduct } from '../interfaces/iproduct';
import { IUser } from '../interfaces/iuser';
import { IOrder } from '../interfaces/iorder';
import { Location } from '@angular/common';
import { Router } from '@angular/router';


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

  constructor(
    private service: DataService,
    private location: Location,
    private router: Router
    ) { }

  ngOnInit() {
    this.getCartItems();
    this.getUserData();
    // this.createOrders();


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
  }

  // Back to previous page
  goBack(): void {
    this.location.back();
  }

  orderRows: any = [];

  createOrderRows(){
    for(var i=0; i<this.cartItems.length; i++){
      this.orderRows.push(
        {productid: this.cartItems[i].id, amount: 1}
        );
    }
  }


 createOrders(){
  this.createOrderRows();

  this.orders = {
    companyId: 25,
    created: "2019-04-01T00:00:00",
    createdBy: this.userData.email,
    paymentMethod: this.userData.paymentMethod,
    totalPrice:this.totalCost,
    status: 0,
    orderRows: this.orderRows
  };

  }

  submit() {
    this.createOrders();

    this.service.submitOrder(this.orders).subscribe(
      response => {console.log(response);},
      err => {console.log(err.message);},
      () => { console.log('completed');}
    );
 }

}
