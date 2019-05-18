import { Component, OnInit } from '@angular/core';
import { IPlacedOrders } from '../interfaces/iplaced-orders';
import { DataService } from '../services/data.service';
import { faTshirt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  orders: IPlacedOrders[];

  constructor(private service:DataService) { }

  ngOnInit() {
    this.getOrders();
    console.log(this.orders);
  }

  getOrders(){
    this.service.getOrders().subscribe(
      response => {
        this.orders = response;
        console.log(response);
        console.log(this.orders);
      },
      error => console.log(error),
      () => console.log('HPPT request for category completed')
    );
  }

}
