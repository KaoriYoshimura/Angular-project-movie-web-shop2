import { Component, OnInit, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { IPlacedOrders, IPlacedOrderRow } from '../interfaces/iplaced-orders';
import { DataService } from '../services/data.service';

import { MatTableDataSource, MatPaginator, MatInput } from '@angular/material';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  faEdit = faEdit;

  // For Material Design table
  displayedColumns: string[] = [
    'id', 'OrderedOn', 'orderedBy', 'paymentMethod', 'totalPrice', 'status', 'editOrderItems'
  ];
  orders: MatTableDataSource<IPlacedOrders>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  // For Material Design input
  @ViewChildren(MatInput) matInputs: QueryList<MatInput>;
  public myDates : any = {};

  orderRows: IPlacedOrderRow[];
  updatedOrders: IPlacedOrders[];

  constructor(
    private service: DataService,
    ) { }

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

}
