import { Component, OnInit } from "@angular/core";
import { DataService } from "../services/data.service";
import { IPlacedOrders, IPlacedOrderRow } from "../interfaces/iplaced-orders";
import { ActivatedRoute, Router } from "@angular/router";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FormBuilder, FormArray, FormGroup } from "@angular/forms";
import { IOrder, IOrderRow } from "../interfaces/iorder";
import { IProduct } from "../interfaces/iproduct";
import { IStatus } from "../interfaces/IChoices";
import { forkJoin } from "rxjs";

@Component({
  selector: "app-update-order",
  templateUrl: "./update-order.component.html",
  styleUrls: ["./update-order.component.scss"]
})
export class UpdateOrderComponent implements OnInit {
  // Fontawesome icon
  faTrash = faTrash;

  orderDetails: IPlacedOrders;
  orderRows: IPlacedOrderRow[] = [];
  updateOrderDetails: IOrder;
  updateOrderRows: IOrderRow[] = [];
  updateTotalCost: number;
  products: IProduct[];
  productNames: string[] = [];
  totalPrice: number;

  // Declare FormGroup
  updateOrderForm: FormGroup;
  // Fetch choices for payement in checkout and update order page
  paymentChoices = this.service.paymentChoices;
  // Fetch choices for status in checkout and update order page
  statusChoices: IStatus[] = this.service.statusChoices;

  // Is is needed? paymentChoices and statusChoices works...
  getChoices() {
    forkJoin(
      this.service.paymentChoices,
      this.service.statusChoices
    ).subscribe(
      res => {
        console.log(res[0], res[1]);
      },
      error => console.log(error),
      () => console.log("HPPT request for getOrderDetails completed")
    );
  }

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private service: DataService
  ) // private router: Router
  {}

  ngOnInit() {
    this.getOrderId();
  }

  // Get the property params 'id' from admin.component, and copies the data into myParams. Use this id to collect the item with the same id from API.
  getOrderId() {
    this.route.params.subscribe(myParams => {
      const id = myParams["id"];
      this.getOrderDetails(id);
    });
  }

  getOrderDetails(id: number) {
    // Fetch both product list and order details
    forkJoin(
      this.service.getData(),
      this.service.getOrderDetailById(id)
    ).subscribe(
      res => {
        (this.products = res[0]), (this.orderDetails = res[1]);

        // Set FormBuilder
        this.setFormBuilder();

        // Get product names of items in orderRows
        this.getProductName();

        // Set items FormArray
        this.setItemsFormArray();
      },
      error => console.log(error),
      () => console.log("HPPT request for getOrderDetails completed")
    );
  }

  setFormBuilder() {
    this.updateOrderForm = this.fb.group({
      payment: this.orderDetails.paymentMethod,
      status: this.orderDetails.status,
      items: this.fb.array([])
    });
  }

  // Set items FormArray
  setItemsFormArray() {
    for (let i = 0; i < this.orderDetails.orderRows.length; i++) {
      const items = this.fb.group({
        id: this.orderDetails.orderRows[i].id,
        productId: this.orderDetails.orderRows[i].productId,
        productName: this.productNames[i],
        amount: this.orderDetails.orderRows[i].amount
      });
      // Push formGroup into FormArray
      (<FormArray>this.updateOrderForm.get("items")).push(items);
    }
  }

  // what is type?
  // Fetch product names from product list
  getProductName() {
    for (var j = 0; j < this.orderDetails.orderRows.length; j++) {
      for (var i = 0; i < this.products.length; i++) {
        if (this.orderDetails.orderRows[j].productId === this.products[i].id) {
          this.productNames.push(this.products[i].name);
        }
      }
    }
    return this.productNames;
  }

  // Collect updated date of orderRows and store
  createOrderRows() {
    for (var i = 0; i < this.updateOrderForm.value.items.length; i++) {
      this.updateOrderRows.push({
        ProductId: this.updateOrderForm.value.items[i].productId,
        Amount: this.updateOrderForm.value.items[i].amount
      });
    }
  }

  // Caluculate total price of new orderRows
  caluculateTotalPrice(): number {
    let price = 0;
    for (var j = 0; j < this.updateOrderRows.length; j++) {
      for (var i = 0; i < this.products.length; i++) {
        if (this.updateOrderRows[j].ProductId === this.products[i].id) {
          price += this.products[i].price;
        }
      }
    }
    console.log("total price", price);
    return price;
  }

  // Send put request
  updateOrder(id: number) {
    // Fake variable for put trial
    this.updateOrderDetails = {
      id: 896,
      companyId: 25,
      created: "2019",
      createdBy: "kaori",
      paymentMethod: "paypal",
      totalPrice: 50,
      status: 0,
      orderRows: [{ ProductId: 80, Amount: 1 }]
    };

    console.log("To API", this.updateOrderDetails);

    // Send update request to API
    this.service.updateOrders(id, this.updateOrderDetails).subscribe(
      response => console.log(response),
      err => console.log(err.message),
      () => console.log("Update order completed")
    );

    /* From here is the actual updated order */
    this.createOrderRows();

    // Fetch product list
    this.service.getData().subscribe(
      response => {
        // Store product data
        this.products = response;
        // Store all info into an object to send to API
        let updateOrderDetailsReal = {
          id: this.orderDetails.id,
          companyId: 25,
          created: this.orderDetails.created,
          createdBy: this.orderDetails.createdBy,
          paymentMethod: this.updateOrderForm.value.payment, //From FromGroup
          totalPrice: this.caluculateTotalPrice(),
          status: this.updateOrderForm.value.status, //From FromGroup
          orderRows: this.updateOrderRows
        };

        console.log("Real order update object", updateOrderDetailsReal);
      },
      error => console.log(error),
      () => console.log("HTTP request for getMovie completed")
    );
  }

  deleteOrder(id: number) {
    console.log(id);
    this.service.deleteOrder(id).subscribe(
      response => {
        console.log(response);
        this.getOrderDetails(id);
      },
      error => console.log(error),
      () => console.log("HPPT request for category completed")
    );
  }
}
