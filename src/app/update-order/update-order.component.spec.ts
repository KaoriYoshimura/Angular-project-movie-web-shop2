import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateOrderComponent } from './update-order.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { DataService } from '../services/data.service';
import { MockDataService } from '../services/mock-data.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('UpdateOrderComponent', () => {
  let component: UpdateOrderComponent;
  let fixture: ComponentFixture<UpdateOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateOrderComponent ],
      imports: [
        HttpClientModule,
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule
      ]
    })
    //Override component's own provider
    .overrideComponent(UpdateOrderComponent, {
      set: {
        providers: [
          { provide: DataService, useClass: MockDataService }
        ]
      }
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.orderDetails =
    {
      id:558, companyId:25, created:"2019-04-01T00:00:00", createdBy :"Kaori", paymentMethod:"paypal", totalPrice :100, status:0, orderRows :[{id:1, productId:76, product: "null", amount:1, orderId: 11}]
    };
    component.products =
    [
      { id: 76, name: "The Dark Knight", description: "When the menace known as the Joker emerges from his mysterious past, he wreaks havoc and chaos on the people of Gotham, the Dark Knight must accept one of the greatest psychological and physical tests of his ability to fight injustice", price: 199, imageUrl: "https://images-na.ssl-images-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SY1000_CR0,0,675,1000_AL_.jpg", year: 2008, added:"2016-01-05T00:00:00", productCategory: [{categoryId:5, category:null},{categoryId:6, category:null}]},
      { id: 77, name:"Interstellar", description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.", price :129, imageUrl:"https://images-na.ssl-images-amazon.com/images/M/MV5BMjIxNTU4MzY4MF5BMl5BanBnXkFtZTgwMzM4ODI3MjE@._V1_SY1000_CR0,0,640,1000_AL_.jpg", year :2014,added:"2017-07-16T00:00:00",productCategory:[{categoryId:8,category:null}]}
    ];

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should save product data', () => {
  //   // this function is in ngOnInit
  //   // expect(component.products).toBeUndefined();
  //   component.getOrderDetails(558);
  //   expect(component.products.length).toBe(2);
  //   // expect(component.products.length).toBe(3);
  // });

  // it('should save order details data', () => {
  //   // this function is in ngOnInit
  //   expect(component.orderDetails).toBeUndefined();
  //   component.getOrderDetails(558);
  //   expect(component.orderDetails).toBeDefined();
  // });

  // it('should set formBuilder', () => {
  //   expect(component.updateOrderForm).toBeUndefined();
  //   component.getOrderDetails(558);
  //   expect(component.updateOrderForm).toBeDefined();
  // });

  // it('should set Items FormArray', () => {
  //   expect(component.updateOrderForm).toBeUndefined();
  //   component.getOrderDetails(558);
  //   expect(component.updateOrderForm).toBeDefined();
  // });

  it('should have product names', () => {
    expect(component.productNames.length).toBe(0);
    component.getProductName();
    expect(component.productNames.length).toBe(1);
  });

  // it(`Should create orderRows for update`, () => {
  //   let items = component.updateOrderForm.value.items([]);
  //   items[0].setValue([79, 1, 1011]);

  //   expect(component.updateOrderRows.length).toBe(0);
  //   component.createUpdateOrderRows();
  //   expect(component.updateOrderRows[0].ProductId).toBe(79);
  //   expect(component.orderRows.length).toBe(1);
  // });
});
