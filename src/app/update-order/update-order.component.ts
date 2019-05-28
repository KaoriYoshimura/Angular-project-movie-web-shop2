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

  paymentChoices = [
    'Paypal',
    'Bank Id',
    'Credit card'
  ]


  statusChoices = [
    { id: 0, status: '0: Waiting for payment'},
    { id: 1, status: '1: Paid'},
    { id: 2, status: '2: Pending'}
  ]

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    // private location: Location,
    private service: DataService,
    // private router: Router
  ) { }

  ngOnInit() {

    // this.updateOrderForm = this.fb.group({
    //   payment: [this.orderDetails.paymentMethod, Validators.required],
    //   status: [this.orderDetails.status, Validators.required],
    //   items: this.fb.array([])
    // });

    this.getOrderId();

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

        this.updateOrderForm = this.fb.group({
          payment: [this.orderDetails.paymentMethod, Validators.required],
          status: [this.orderDetails.status, Validators.required],
          items: this.fb.array([])
        });
    

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
          console.log(this.orderDetails);

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
        this.caluculateTotalCost();
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
    console.log(this.updateOrderForm.value.items);
    console.log(this.updateOrderRows);
  }

  caluculateTotalCost(): number{
    let price = 0;
    for(var j=0; j<this.updateOrderRows.length; j++){
      for(var i=0; i<this.products.length; i++){
        if(this.updateOrderRows[j].ProductId === this.products[i].id){
          price += this.products[i].price;
        }
      }
    }

    return price;
  }

  createOrders(){
    this.createOrderRows();

    this.service.getData().subscribe(
      response => {
        this.products = response;
        this.updateOrderDetails = {
          id: this.orderDetails.id,
          companyId: 25,
          created: this.orderDetails.created,
          createdBy: this.orderDetails.createdBy,
          paymentMethod: this.updateOrderForm.value.paymentMethod,
          totalPrice:this.caluculateTotalCost(),
          status: 0,
          orderRows: this.updateOrderRows
        };

      console.log(this.updateOrderDetails);

      },
      error => console.log(error),
      () => console.log('HTTP request for getMovie completed')
    );


  }


  updateOrder(id:number){
    console.log(id);
    // this.getMovie();
    // console.log(this.products);
    this.updateOrderDetails = {
      id: 896,
      companyId: 25,
      created: '2019',
      createdBy: 'kaori',
      paymentMethod: 'paypal',
      totalPrice:50,
      status: 0,
      orderRows: [{ProductId:80, Amount:1}]
    };

  console.log(this.updateOrderDetails);

  this.service.updateOrders(id, this.updateOrderDetails).subscribe(
  response => {console.log(response);},
  err => {console.log(err.message);},
  () =>{console.log('completed');}
);
    // console.log(this.updateOrderForm.value.payment);
    // console.log(this.updateOrderForm.value.items[0].productId);

    // this.createOrderRows();

    this.service.getData().subscribe(
      response => {
        this.products = response;
        this.updateOrderDetails = {
          id: this.orderDetails.id,
          companyId: 25,
          created: this.orderDetails.created,
          createdBy: this.orderDetails.createdBy,
          paymentMethod: this.updateOrderForm.value.payment,
          totalPrice:this.caluculateTotalCost(),
          status: this.updateOrderForm.value.status,
          orderRows: this.updateOrderRows
        };

        // this.updateOrderDetails = {
        //   id: 896,
        //   companyId: 25,
        //   created: '2019',
        //   createdBy: 'kaori',
        //   paymentMethod: 'paypal',
        //   totalPrice:50,
        //   status: 0,
        //   orderRows:  [{ ProductId: 81, Amount: 3 }]
        // };

      console.log(this.updateOrderDetails);

    //   this.service.updateOrders(id, this.updateOrderDetails).subscribe(
    //   response => {console.log(response);},
    //   err => {console.log(err.message);},
    //   () =>{console.log('completed');}
    // );
      },
      error => console.log(error),
      () => console.log('HTTP request for getMovie completed')
    );


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
