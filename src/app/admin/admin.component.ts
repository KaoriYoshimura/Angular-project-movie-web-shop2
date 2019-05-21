import { Component, OnInit, ViewChild } from '@angular/core';
import { IPlacedOrders, IPlacedOrderRow } from '../interfaces/iplaced-orders';
import { DataService } from '../services/data.service';

import { MatTableDataSource, MatPaginator } from '@angular/material';
import { faRedo, faCaretDown, faTrash, faSync } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  faRedo = faRedo;
  faTrash = faTrash;
  faCaretDown = faCaretDown;
  faSync = faSync;

  // For Material Design table
  displayedColumns: string[] = [
    'id', 'OrderedOn', 'orderedBy', 'paymentMethod', 'totalPrice', 'status', 'update', 'showOrderItems', 'delete'
  ];
  orders: MatTableDataSource<IPlacedOrders>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  orderRows: IPlacedOrderRow[];
  updatedOrders: IPlacedOrders[];

  constructor(private service: DataService) { }

  ngOnInit() {
    this.getOrders();
  }

  getOrders(){
    this.service.getOrders().subscribe(
      response => {
        this.orders = new MatTableDataSource<IPlacedOrders>(response as IPlacedOrders[]);
        this.orders.paginator = this.paginator;
      },
      error => console.log(error),
      () => console.log('HPPT request for category completed')
    );
  }

  showOrderRow(id:number){
    // Define the array to be pushed
    this.orderRows = [];

    for(var i=0; i<this.orders.data.length; i++){
      for(var j=0; j<this.orders.data[i].orderRows.length; j++){
        if(this.orders.data[i].orderRows[j].orderId === id){
          this.orderRows.push(this.orders.data[i].orderRows[j]);
        }
      };
    }
  }

  // updateOrders(){
    // this.createOrderRows();

  //   this.updatedOrders = {
    //   id: use "="
  //     companyId: 25,
  //     created: this.now,
  //     createdBy: this.userData.email,
  //     paymentMethod: this.userData.paymentMethod,
  //     totalPrice:this.totalCost,
  //     status: 0,
  //     orderRows: this.orderRows
  //   };
  // }


  updateOrder(payment:string, status:number , id:string){
    // this.service.updateOrders(id, this.updateOrder)
    console.log(payment, status, id );
  }

  deleteOrder(id:number){
    console.log(id);
    this.service.deleteOrder(id).subscribe(
      response => {
        console.log(response);
        this.getOrders();
      },
      error => console.log(error),
      () => console.log('HPPT request for category completed')
    );
  }

  deleteOrderRow(id:number){
    console.log(id);
    // this.service.deleteOrder(id).subscribe(
    //   response => {
    //     console.log(response);
    //     this.getOrders();
    //   },
    //   error => console.log(error),
    //   () => console.log('HPPT request for category completed')
    // );

        // Define the array to be pushed
        // this.orderRows = [];

        // for(var i=0; i<this.orders.data.length; i++){
        //   for(var j=0; j<this.orders.data[i].orderRows.length; j++){
        //     if(this.orders.data[i].orderRows[j].orderId === id){
        //       this.orderRows.push(this.orders.data[i].orderRows[j]);
        //     }
        //   };
        // }
  }
}
