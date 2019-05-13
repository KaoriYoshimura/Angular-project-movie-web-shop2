import { Injectable } from '@angular/core';
import { IdataService } from '../interfaces/idata-service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IProduct } from '../interfaces/iproduct';
import { map } from 'rxjs/operators';
import { IUser } from '../interfaces/iuser';
import { IOrder } from '../interfaces/iorder';

@Injectable({
  providedIn: 'root'
})
export class DataService implements IdataService{

  // Inject the HttpClient into an application class in order to activate HttpClient
  constructor(private http: HttpClient) { }

  NumberOfCartItems = 0;
  cartItems : IProduct[] = JSON.parse(sessionStorage.getItem('cartItem'))|| [];
  totalCost = 0;
  userData : IUser = JSON.parse(sessionStorage.getItem('userData'))|| [];
  searchWord: string = "";

  getData():Observable<IProduct[]>{
    return this.http.get<IProduct[]>('https://medieinstitutet-wie-products.azurewebsites.net/api/products');
  }

  getDetailById(id: number): Observable<IProduct> {
    return this.getData().pipe(map(details =>
      details.find(detail=>
        detail.id == id)
    ));
  }

  // ||[]creates array if cartItem is empty
  // If I want to reuse this function in addToCart for id, name, price is highlited. Not good idea?
  getSessionCartItems() {
    return this.cartItems;
  }

  countNumberOfCartItems() {
    this.NumberOfCartItems = this.getSessionCartItems().length;

    return this.NumberOfCartItems;
  }

  addToCart(details: IProduct): void {
    if(this.cartItems.length === 0) {
      this.cartItems.push(details);
    } else {
      let isDuplicate = false;
      for (var i=0; i<this.cartItems.length;i++){
        if(details.id === this.cartItems[i].id) {
          isDuplicate = true;
        }
      }
      if(!isDuplicate){
          this.cartItems.push(details);
      }
    }
    sessionStorage.setItem('cartItem', JSON.stringify(this.cartItems));
  }

  RemoveFromSessionStorage(item: number) {
    for (let i = 0; i < this.cartItems.length; i++) {
      if(this.cartItems[i].id === item){
        this.cartItems.splice(i, 1);
      }
    }
    sessionStorage.setItem('cartItem', JSON.stringify(this.cartItems));

    // this.countNumberOfCartItems();
  }

  caluculateTotalCost(){
    for (let i = 0; i <this.cartItems.length; i++){
      this.totalCost += this.cartItems[i].price;
    }

    return this.totalCost;
  }

  // ||[]creates array if cartItem is empty
  // If I want to reuse this function in addToCart for id, name, price is highlited. Not good idea?
  getSessionUserData() {
    return this.userData;
  }

  // res means response
  // Call http.post and pass in the URL and order. In order to execute the HPPT post and get the response, use subscribe and take it in our response by using an arrow function.
  submitOrder(order: IOrder) {
    this.http.post(
      'https://medieinstitutet-wie-products.azurewebsites.net/api/orders', order).subscribe(res => {
      console.log(res);
    })
  }

  searchProductApi(Query: string):Observable<IProduct[]>{
    console.log('datas: ', Query);
    return this.http.get<IProduct[]>('https://medieinstitutet-wie-products.azurewebsites.net/api/search' + '?searchText=' + Query);

    // https://medieinstitutet-wie-products.azurewebsites.net/api/search?searchText=modern
      // return this.searchWord = Query;
  }

}
