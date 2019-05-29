import { Injectable } from '@angular/core';
import { IdataService } from '../interfaces/idata-service';
import { IProduct } from '../interfaces/iproduct';
import { IUser } from '../interfaces/iuser';
import { Observable, of, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { ICategory } from '../interfaces/icategory';
import { IPlacedOrders } from '../interfaces/iplaced-orders';
import { IOrder } from '../interfaces/iorder';

@Injectable({
  providedIn: 'root'
})
export class MockDataService implements IdataService{

  // Temporary cartItems to store instead of sessionStorage
  cartItems: IProduct[] = [];
  userData: IUser;
  orders: IPlacedOrders[] = [];
  searchResults: IProduct[];

  // Declaration of object and function to update cart amount in app.component
  // Declare subject type property to inform when data is updated
  numberOfCartItems = new Subject<number>();
  // Create observable object from numberOfCartItems object to share the data in app.component
  numberOfCartItems$ = this.numberOfCartItems.asObservable();
  // Pass "updated" data to numberOfCartItems object and .next will fire off an eent that a subscriber will listen in app component.
  onNotifyCartAmoutUpdated(updated: number) {
    this.numberOfCartItems.next(updated);
  }
    // Product data to run a test instead of API data
  products: IProduct[] = [
    { id: 76, name: "The Dark Knight", description: "When the menace known as the Joker emerges from his mysterious past, he wreaks havoc and chaos on the people of Gotham, the Dark Knight must accept one of the greatest psychological and physical tests of his ability to fight injustice", price: 199, imageUrl: "https://images-na.ssl-images-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SY1000_CR0,0,675,1000_AL_.jpg", year: 2008, added:"2016-01-05T00:00:00",productCategory: [{categoryId:5, category:null},{categoryId:6, category:null}]},
    { id: 77, name:"Interstellar", description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.", price :129, imageUrl:"https://images-na.ssl-images-amazon.com/images/M/MV5BMjIxNTU4MzY4MF5BMl5BanBnXkFtZTgwMzM4ODI3MjE@._V1_SY1000_CR0,0,640,1000_AL_.jpg", year :2014,added:"2017-07-16T00:00:00",productCategory:[{categoryId:8,category:null}]}
  ];

  totalCost = 0;

  userDataMock: IUser;

  categoryDataMock: ICategory[] = [
    {id:5, name :"Action"},
    {id:6, name :"Comedy"},
  ];

  orderDataMock: IPlacedOrders[] = [
    {id:558, companyId:25, created:"2019-04-01T00:00:00", createdBy :"Kaori", paymentMethod:"paypal", totalPrice :100, status:0, orderRows :[{id:1, productId:79, product: "null", amount:1, orderId: 11}]},
    {id:559, companyId:25, created:"2019-05-01T00:00:00", createdBy :"Kaori", paymentMethod:"cash", totalPrice :200, status:0, orderRows :[{id:1, productId:79, product: "null", amount:1, orderId: 11}]},
    {id:560, companyId:25, created:"2019-05-02T00:00:00", createdBy :"Kaori", paymentMethod:"cash", totalPrice :300, status:0, orderRows :[{id:1, productId:79, product: "null", amount:1, orderId: 11}]},
  ];

  orderHttpClientMock: IOrder[] = [
    {id:558, companyId:25, created:"2019-04-01T00:00:00", createdBy :"Kaori", paymentMethod:"paypal", totalPrice :100, status:0, orderRows :[{ProductId:79, Amount:1, Id: 100}]},
    {id:559, companyId:25, created:"2019-05-01T00:00:00", createdBy :"Kaori", paymentMethod:"cash", totalPrice :200, status:0, orderRows :[{ProductId:78, Amount:1, Id: 101}]},
    {id:560, companyId:25, created:"2019-05-02T00:00:00", createdBy :"Kaori", paymentMethod:"cash", totalPrice :300, status:0, orderRows :[{ProductId:80, Amount:1, Id: 102}]},

  ];

  // Return product array above as Observable<Iproduct[]>
  getData():Observable<IProduct[]>{
    return of(this.products);
  }

  getDetailById(id: number): Observable<IProduct>{
    return this.getData().pipe(map(details =>
      details.find(detail=>detail.id == id)));
  }

  // To check how many items in a shopping cart
  getSessionCartItems() {
    return this.cartItems = this.products;

  }

  countNumberOfCartItems() {
    //this.NumberOfCartItems = this.getSessionCartItems().length;

    return this.cartItems.length;
  }

  addToCart(cartItems: IProduct[]): void {
    //const cartItems = JSON.parse(sessionStorage.getItem('cartItem'))|| [];
    // let cartItems: [] = this.getSessionCartItems();

  
  //  this one should be updated!!!!
  //  this.cartItems.push(cartItems);
   
    //sessionStorage.setItem('cartItem', JSON.stringify(cartItems));

    // this.countNumberOfCartItems();
  }

  RemoveFromSessionStorage(item: number) {
    for (let i = 0; i < this.cartItems.length; i++) {
      if(this.cartItems[i].id === item){
        this.cartItems.splice(i, 1);
      }
    }

    return this.cartItems;
  }

  // ||[]creates array if cartItem is empty
  // If I want to reuse this function in addToCart for id, name, price is highlited. Not good idea?
  getSessionUserData() {
    return this.userData = {
      firstName:"Kaori", email:"kaori.yoshimura@medieinstitutet.se", paymentMethod:"Paypal", phoneNumber:555222, phoneNumbers:2222
    };
  }

  searchProductApi(Query: string):Observable<IProduct[]>{
    this.searchResults = this.products.filter(eachItem => eachItem.name.includes(Query));
    return of(this.searchResults)
  }

  getCategory():Observable<ICategory[]>{
    return of(this.categoryDataMock);
  }

  getOrders(): Observable<IPlacedOrders[]>{
    return of(this.orderDataMock);
  }

  // updateOrders(id:number, updateOrder:IPlacedOrders): Observable<IPlacedOrders>{
  //   return this.http.put<IPlacedOrders>('https://medieinstitutet-wie-products.azurewebsites.net/api/orders?companyId=25' + '/{' + id + '}', updateOrder, httpOptions);
  // }

  deleteOrder(id:number) : Observable<IOrder> {
    for (let i = 0; i < this.orderHttpClientMock.length; i++) {
      if(this.orderHttpClientMock[i].id === id){
        this.orderHttpClientMock.splice(i, 1);
        return of(this.orderHttpClientMock[i]);
      }
    }

    // Return as observable so that it can match with IProduct interface
  }

  constructor() { }
}
