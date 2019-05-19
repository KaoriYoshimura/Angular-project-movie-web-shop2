import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { IPlacedOrders } from '../interfaces/iplaced-orders';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-order',
  templateUrl: './update-order.component.html',
  styleUrls: ['./update-order.component.scss']
})
export class UpdateOrderComponent implements OnInit {
  orderDetails: IPlacedOrders;

  constructor(
    private route: ActivatedRoute,
    // private location: Location,
    private service: DataService
  ) { }

  ngOnInit() {
    // this.getOrderId();
  }

  // getOrderId(){
  //   this.route.params.subscribe(myParams => {
  //     const id = myParams['id'];
  //     this.getOrderDetails(id);
  //     console.log(id);
  //   });
  // }

  // getOrderDetails(id: number){
  //   this.service.getOrderDetailsById(id).subscribe(
  //     response => {
  //       this.orderDetails = response;
  //       console.log(this.orderDetails);
  //     },
  //     error => console.log(error),
  //     () => console.log('HPPT request for getOrderDetails completed')
  //   );
  // }

  // // Back to previous page
  // goBack(): void {
  //   this.location.back();
  // }

}
