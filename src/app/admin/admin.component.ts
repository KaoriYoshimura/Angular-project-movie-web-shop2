import { Component, OnInit, ViewChild } from '@angular/core';
import { IPlacedOrders, IPlacedOrderRow } from '../interfaces/iplaced-orders';
import { DataService } from '../services/data.service';
import { MatTableDataSource, MatPaginator } from '@angular/material';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

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

  getOrderRow(id:number){
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


  // UpdateOrder(payment:string, status:number, id:string){
  //   this.service.updateOrders(id, this.updateOrder)
  //   console.log(payment, status, id);
  // }

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

  // // Remove item from the array to print out
  // removeOrderRowFromArray(id:number){
  //   for (let i = 0; i < this.orders.data.length; i++) {
  //     if(this.orders.data[i].id === id){
        
  //       this.orders.data.splice(i, 1);
  //       // this.checkOrderRows.splice(i, 1);
  //       console.log(this.orders.data);
  //     }
  //   }
  // }
}
