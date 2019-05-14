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

  // Inject FormBuilder service
  constructor(
    private fb: FormBuilder,
    private service: DataService,
    private location: Location,
    private router: Router
  ) { }


  userForm = this.fb.group({
    firstName: ['', [Validators.required, Validators.minLength(2)]],
    lastName: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', Validators.required],
    confirmEmail: ['', Validators.required],
    paymentMethod: ['', Validators.required],
    street: ['', Validators.required],
    street2: [''],
    city: ['', Validators.required],
    postcode: ['', [Validators.required, Validators.minLength(5)]],
    phoneNumber: ['', [Validators.required, Validators.minLength(7)]],
    phoneNumbers: this.fb.array([
      this.fb.control('')
    ])
  },{Validator: matchingFields('password', 'confirmEmail')});

  get phoneNumbers() {
    return this.userForm.get('phoneNumbers') as FormArray;
  }

  addPhoneNumber() {
    this.phoneNumbers.push(
      this.fb.control('')
      );
      console.log(this.phoneNumbers);
  }

  removePhoneNumber(i: number) {
    this.phoneNumbers.removeAt(i);
}

  billingOnSubmit(){
    console.log(this.userForm.value);
    sessionStorage.setItem('userData', JSON.stringify(this.userForm.value));
    this.router.navigate(['/confirm']);
  }


  ngOnInit() {
    this.getCartItems();
    // this.caluculateCost();
  }

  getCartItems(){
    this.cartItems = this.service.getSessionCartItems();
    this.caluculateCost();
  }

  caluculateCost(){
    this.totalCost = this.service.caluculateTotalCost();
}

  // Back to previous page
  goBack(): void {
    this.location.back();
  }

}

function matchingFields(field1, field2){
  console.log('works')
  return form => {
    if(form.controls[field1].value !== form.controls[field2].value)
     return {matchingFields: true}
  }
}