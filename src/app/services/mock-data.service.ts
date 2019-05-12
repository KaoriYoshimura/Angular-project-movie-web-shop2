import { Injectable } from '@angular/core';
import { IdataService } from '../interfaces/idata-service';
import { IProduct } from '../interfaces/iproduct';
import { IUser } from '../interfaces/iuser';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MockDataService implements IdataService{

  // Temporary cartItems to store instead of sessionStorage
  cartItems: IProduct[] = [];
  userData: IUser[] = [];

  // To show a number of items in sessionStorage
  NumberOfCartItems = 0;

    // Product data to run a test instead of API data
  products: IProduct[] = [
    { id: 76, name: "The Dark Knight", description: "When the menace known as the Joker emerges from his mysterious past, he wreaks havoc and chaos on the people of Gotham, the Dark Knight must accept one of the greatest psychological and physical tests of his ability to fight injustice", price: 199, imageUrl: "https://images-na.ssl-images-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SY1000_CR0,0,675,1000_AL_.jpg", year: 2008, added:"2016-01-05T00:00:00",productCategory: [{categoryId:5, category:null},{categoryId:6, category:null}]},
    { id: 77, name:"Interstellar", description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.", price :129, imageUrl:"https://images-na.ssl-images-amazon.com/images/M/MV5BMjIxNTU4MzY4MF5BMl5BanBnXkFtZTgwMzM4ODI3MjE@._V1_SY1000_CR0,0,640,1000_AL_.jpg", year :2014,added:"2017-07-16T00:00:00",productCategory:[{categoryId:8,category:null}]}
  ];

  totalCost = 0;

  // userDataMock: IUser[] = {
  //   firstName:"Kaori", lastName:"Yoshimura", email:"kaori.yoshimura@medieinstitutet.se", confirmEmail:"kaori.yoshimura@medieinstitutet.se", paymentMethod:"Paypal", street:"Tulegatan 41", city:"Stockholm", postcode:1, phoneNumber:555222
  // };


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

  addToCart(details: IProduct): void {
    //const cartItems = JSON.parse(sessionStorage.getItem('cartItem'))|| [];
    // let cartItems: [] = this.getSessionCartItems();

    this.cartItems.push(details);
    console.log(this.cartItems);
    //sessionStorage.setItem('cartItem', JSON.stringify(cartItems));

    // this.countNumberOfCartItems();
  }

  RemoveFromSessionStorage(item) {
    // const cartItems = JSON.parse(sessionStorage.getItem('cartItem'))|| [];
    // const cartItems = this.getSessionCartItems();

    for (let i = 0; i < this.cartItems.length; i++) {
      if(this.cartItems[i].id === item){
        this.cartItems.splice(i, 1);
      }
    }

    return this.cartItems;
    // this.countNumberOfCartItems();
  }

  caluculateTotalCost(){
    for (let i = 0; i <this.cartItems.length; i++){
      this.totalCost += this.cartItems[i].price;
    }

    return this.totalCost;
  }

  // get error!!
  // getSessionUserData() {
  //   return this.userData = this.userDataMock;
  // }

  constructor() { }
}
