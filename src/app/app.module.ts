import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { MatButtonModule, MatCheckboxModule, MatFormFieldModule } from '@angular/material';
// import { MatInputModule } from '@angular/material/input';

import { AppComponent } from './app-component/app.component';
// import { ProductsComponent } from './products/products.component';
// import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AppRoutingModule } from './app-routing.module';
import { CartComponent } from './cart/cart.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
// import { CheckoutComponent } from './checkout/checkout.component';
// import { ConfirmComponent } from './confirm/confirm.component';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './product/product.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductComponent,
    CartComponent,
    // CheckoutComponent,
    // ConfirmComponent
    // PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    // AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    // MatButtonModule,
    // MatCheckboxModule,
    // MatInputModule,
    // MatFormFieldModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
