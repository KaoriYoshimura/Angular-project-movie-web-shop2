import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductComponent } from './product.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { DataService } from '../services/data.service';
import { MockDataService } from '../services/mock-data.service';


describe('ProductComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductComponent ],
      imports: [ HttpClientModule, RouterTestingModule ]
    })
        //Override component's own provider to test with MockData.service
        .overrideComponent(ProductComponent, {
          set: {
            providers: [
              { provide: DataService, useClass: MockDataService }
            ]
          }
        })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show details', () => {
    expect(component.details).toBeUndefined();
    component.getMovie(76);
    expect(component.details).toBeDefined();
    expect(component.details.name).toBe('The Dark Knight');
  });

  // // To be updated after adding qty
  // it('should add items into the array for sessionStorage', () => {
  //     //   component.getMovie(76);
  //   expect(component.cartItems.length).toBe(0);
  //   // component.getMovie(76);
  //   // //component.details = { id: 76, name: "The Dark Knight", description: "When the menace known as the Joker emerges from his mysterious past, he wreaks havoc and chaos on the people of Gotham, the Dark Knight must accept one of the greatest psychological and physical tests of his ability to fight injustice", price: 199, imageUrl: "https://images-na.ssl-images-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SY1000_CR0,0,675,1000_AL_.jpg", year: 2008, added:"2016-01-05T00:00:00",productCategory: [{categoryId:5, category:null},{categoryId:6, category:null}]};
    
  //   // component.addToCart();
  //   // expect(component.NumberOfCartItems).toBe(1);
  // });

  it('should print out category',() => {
    expect(component.categories.length).toBe(2);
  });

});
