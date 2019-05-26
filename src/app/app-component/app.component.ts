import { Component, OnInit } from '@angular/core';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { DataService } from '../services/data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  faBars = faBars;

  cartAmount: number = this.service.countNumberOfCartItems();
  // CommonService の変数の参照を取得するプロパティ

  // subscribe を保持するための Subscription
  subscription: Subscription;

  constructor( private service: DataService ){}

  ngOnInit(){
        // イベント登録
    // サービスで共有しているデータが更新されたら発火されるイベントをキャッチする
    this.subscription = this.service.numberOfCartItems$.subscribe(
      amount => {
        console.log('Cart Item updated', amount);
        this.cartAmount = amount;
      }
    );
  }

}
