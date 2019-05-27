import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { IPlacedOrders, IPlacedOrderRow } from '../interfaces/iplaced-orders';
import { ActivatedRoute, Router } from '@angular/router';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, Validators, FormArray, FormGroup } from '@angular/forms';
import { IOrder, IOrderRow } from '../interfaces/iorder';


@Component({
  selector: 'app-update-order',
  templateUrl: './update-order.component.html',
  styleUrls: ['./update-order.component.scss']
})
export class UpdateOrderComponent implements OnInit {
  // Fontawesome icon
  faTrash = faTrash;
  orderDetails: IPlacedOrders;
  orderRows: IPlacedOrderRow[] = [];
  updateOrderDetails: IOrder;
  updateOrderRows: IOrderRow[] = [];

  formData = {
    items: [{
        productId: ['', Validators.required],
        amount: ['', Validators.required],
      }]
  }

  updateOrderForm: FormGroup;
  items: FormArray;


  // get items() {
  //   return this.updateOrderForm.get('items') as FormArray;
  // }

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    // private location: Location,
    private service: DataService,
    // private router: Router
  ) { }

  ngOnInit() {

    this.updateOrderForm = this.fb.group({
      payment: ['', Validators.required],
      status: ['', Validators.required],
      items: this.fb.array([])
    });


    console.log(this.updateOrderForm.controls);


    this.getOrderId();
    // this.setItems();
    
    // this.addItem();
  }

  // createItems(): FormGroup {
  //   return this.fb.group({
  //     productId: '',
  //     amount:  ''
  //   })
  // }

  // addItem(){
  //   for(var i=0; i<this.orderDetails.orderRows.length; i++){
  //     this.items = this.updateOrderForm.get('items') as FormArray;
  //     this.items.push(this.createItems());

  //   }
  // }

  getOrderId(){
    this.route.params.subscribe(myParams => {
      const id = myParams['id'];
      this.getOrderDetails(id);
      console.log(id);
    });
  }

  // setOrders(){
  //   let control = <FormArray>this.updateOrderForm.controls.orders;
  //   this.formData.orderDetailsFormat.forEach(x => {
  //     control.push(this.fb.group({
  //       payment: x.payment,
  //       status: x.status,
  //       items: this.setItems(x)
  //     }))
  //   })
  // }

  // setItems() {
  //   let control = <FormArray>this.updateOrderForm.controls.items;
  //   // let arr = new FormArray([])
  //   this.formData.items.forEach(x => {
  //     control.push(this.fb.group({
  //       productId: x.productId,
  //       amount: x.amount
  //     }))
  //   })
  //   console.log(control);
  // }

  getOrderDetails(id: number){
    this.service.getOrderDetailById(id).subscribe(
      response => {
        this.orderDetails = response;
        this.getOrderRows();

        for(let i= 0; i<this.orderRows.length; i++) {
          const items = this.fb.group({
          productId: '',
          amount:  ''
          });
          (<FormArray>this.updateOrderForm.get('items')).push(items);
          }
          console.log(this.orderRows);

      },
      error => console.log(error),
      () => console.log('HPPT request for getOrderDetails completed')
    );
  }

  getOrderRows(){
    for(var i=0; i<this.orderDetails.orderRows.length; i++){
      this.orderRows.push(this.orderDetails.orderRows[i]);
    }
  }

  // // Back to previous page
  // goBack(): void {
  //   this.location.back();
  // }

  // createOrderRows(){
  //   for(var i=0; i<this.orderRows.length; i++){
  //     this.updateOrderRows.push(
  //       // put uppdatorderform.value?
  //       {ProductId: this.cartItems[i].id, Amount: 1}
  //       );
  //   }
  // }

  // createOrders(){
  //   this.createOrderRows();

  //   this.updateOrder = {
  //     companyId: 25,
  //     created: this.now,
  //     createdBy: this.userData.email,
  //     paymentMethod: this.userData.paymentMethod,
  //     totalPrice:this.totalCost,
  //     status: 0,
  //     orderRows: this.orderRows
  //   };
  // }


  updateOrder(id:number){
    
    // const input = this.matInputs.find(matInput => matInput.id === payment.paymentMethod);
    // this.service.updateOrders(id, this.updateOrder)
    // console.log(input);
    console.log(this.updateOrderForm.value, id);
    console.log(this.updateOrderForm.value.items.value, id);


    // const orders = {
    //   companyId: 25,
    //   created: this.orderDetails.created,
    //   createdBy: this.orderDetails.createdBy,
    //   paymentMethod: this.updateOrderForm.value.paymentMethod,
    //   totalPrice:this.totalCost,
    //   status: 0,
    //   orderRows: this.orderRows
    // };

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
