import { Component, OnInit } from '@angular/core';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { DataService } from '../services/data.service';
import { IProduct } from '../interfaces/iproduct';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'angular-webshop-app';
  faBars = faBars;
  NumberOfCartItems : IProduct[];

  constructor(
    private service: DataService
  ){
  }

  ngOnInit(){
  }

}
