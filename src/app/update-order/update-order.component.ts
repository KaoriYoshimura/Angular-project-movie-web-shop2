import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { IPlacedOrders } from '../interfaces/iplaced-orders';
import { ActivatedRoute, Router } from '@angular/router';
import { faRedo, faCaretDown, faTrash, faSync } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-update-order',
  templateUrl: './update-order.component.html',
  styleUrls: ['./update-order.component.scss']
})
export class UpdateOrderComponent implements OnInit {
  faRedo = faRedo;
  faTrash = faTrash;
  faCaretDown = faCaretDown;
  faSync = faSync;
  orderDetails: IPlacedOrders;

  updateOrderForm = this.fb.group({
    payment: ['', Validators.required],
    status: ['', Validators.required],
    productId: ['', Validators.required],
    amount: ['', Validators.required],
    // items: this.fb.array([
    //   this.fb.control('')
    // ])
  });

  // get items() {
  //   return this.updateOrderForm.get('items') as FormArray;
  // }

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    // private location: Location,
    private service: DataService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getOrderId();
  }

  getOrderId(){
    this.route.params.subscribe(myParams => {
      const id = myParams['id'];
      this.getOrderDetails(id);
      console.log(id);
    });
  }

  getOrderDetails(id: number){
    this.service.getOrderDetailById(id).subscribe(
      response => {
        this.orderDetails = response;
        console.log(this.orderDetails);
      },
      error => console.log(error),
      () => console.log('HPPT request for getOrderDetails completed')
    );
  }

  // // Back to previous page
  // goBack(): void {
  //   this.location.back();
  // }

  updateOrder(id:number){
    
    // const input = this.matInputs.find(matInput => matInput.id === payment.paymentMethod);
    // this.service.updateOrders(id, this.updateOrder)
    // console.log(input);
    console.log(this.updateOrderForm.value, id);
    // console.log(MatInput);


  }

  deleteOrder(id:number){
    console.log(id);
    this.service.deleteOrder(id).subscribe(
      response => {
        console.log(response);
        this.getOrderDetails(id);
      },
      error => console.log(error),
      () => console.log('HPPT request for category completed')
    );
  }

}
