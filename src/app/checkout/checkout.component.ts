import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
import { IProduct } from '../interfaces/iproduct';
import { DataService } from '../services/data.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit{
  cartItems: IProduct[];
  totalCost = 0;
  isDisabled: boolean = true;

  // Inject FormBuilder service
  constructor(
    private fb: FormBuilder,
    private service: DataService,
    private location: Location,
    private router: Router
  ) { }


  ngOnInit() {
    this.getCartItems();
    this.caluculateCost();
  }

  userForm = this.fb.group({
    firstName: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', Validators.required],
    paymentMethod: ['', Validators.required],
    phoneNumber: ['', [Validators.required, Validators.minLength(7)]],
    phoneNumbers: this.fb.array([
      this.fb.control('')
    ])
  });

  get phoneNumbers() {
    return this.userForm.get('phoneNumbers') as FormArray;
  }

  addPhoneNumber() {
    this.phoneNumbers.push(
      this.fb.control('')
      );
  }

  removePhoneNumber(i: number) {
    this.phoneNumbers.removeAt(i);
}

  billingOnSubmit(){
    sessionStorage.setItem('userData', JSON.stringify(this.userForm.value));
    this.router.navigate(['/confirm']);
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

  // Back to previous page
  goBack(): void {
    this.location.back();
  }

}