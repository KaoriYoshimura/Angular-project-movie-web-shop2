import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { IPlacedOrders, IPlacedOrderRow } from '../interfaces/iplaced-orders';
import { ActivatedRoute, Router } from '@angular/router';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, Validators, FormArray, FormGroup } from '@angular/forms';
import { IOrder, IOrderRow } from '../interfaces/iorder';
import { IProduct } from '../interfaces/iproduct';


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
  updateTotalCost: number;
  products:IProduct[] ;

  // formData = {
  //   items: [{
  //       productId: ['', Validators.required],
  //       amount: ['', Validators.required],
  //     }]
  // }

  updateOrderForm: FormGroup;
  //items: FormArray;


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



    this.getOrderId();
    this.getMovie();
    // this.setItems();

    // this.addItem();
  }

  // For FormArray no longer needed ..?
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

  // For FormArray, no longer in use?
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
          id: this.orderRows[i].id,
          productId: this.orderRows[i].productId,
          // product: this.orderRows[i].product,
          amount: this.orderRows[i].amount,
          // orderId: this.orderRows[i].orderId
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

  getMovie(){
    this.service.getData().subscribe(
      response => {
        this.products = response;
      },
      error => console.log(error),
      () => console.log('HTTP request for getMovie completed')
    );
  }

  createOrderRows(){
    for(var i=0; i<this.updateOrderForm.value.items.length; i++){
      this.updateOrderRows.push(
        {ProductId: this.updateOrderForm.value.items[i].productId, Amount: this.updateOrderForm.value.items[i].amount}
        );
    }
    console.log(this.updateOrderRows);
  }

  // caluculateTotalCost(): number{
  //   let price = 0;
  //   for(var j=0; j<this.updateOrderRows.length; j++){
  //     for(var i=0; i<this.products.length; i++){
  //       if(this.updateOrderRows[j].ProductId === this.products[i].id){
  //         price += 
  //         console.log('price',this.products[i].price);
  //       }
  //     }
  //   }

  //   return price;
  // }

  // createOrders(){
  //   this.createOrderRows();

  //   this.updateOrderDetails = {
  //     id: 0,
  //     companyId: 25,
  //     created: this.orderDetails.created,
  //     createdBy: this.orderDetails.createdBy,
  //     paymentMethod: this.updateOrderForm.value.paymentMethod,
  //     totalPrice:this.caluculateTotalCost(),
  //     status: 0,
  //     orderRows: this.updateOrderRows
  //   };
  // }


  updateOrder(id:number){
    
    console.log(this.updateOrderForm.value, id);
    console.log(this.updateOrderForm.value.items[0].productId, id);
    this.createOrderRows();
    // this.caluculateTotalCost();

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
