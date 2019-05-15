import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { DataService } from '../services/data.service';
import { MockDataService } from '../services/mock-data.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { FilterComponent } from './filter/filter.component';
import { FormsModule } from '@angular/forms';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  // Call testBed methods within a beforeEach() to ensure a fresh start before each indivisual test
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule, FormsModule],
      declarations: [ HomeComponent, FilterComponent ]
    })

    //Override component's own provider
    .overrideComponent(HomeComponent, {
      set: {
        providers: [
          { provide: DataService, useClass: MockDataService }
        ]
      }
    })
    .compileComponents();
    }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain 2 products',() => {
    expect(component.products.length).toBe(2);
  })
});
