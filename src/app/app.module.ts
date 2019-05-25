import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { /* MatButtonModule, MatCheckboxModule, MatFormFieldModule,  */MatPaginatorModule, MatTreeModule } from '@angular/material';
import { MatTableModule } from '@angular/material/table';
// import { MatInputModule } from '@angular/material/input';
import { CdkTableModule } from '@angular/cdk/table';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule, /* NgbActiveModal */ } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app-component/app.component';
import { AppRoutingModule } from './app-routing.module';
import { CartComponent } from './cart/cart.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { ProductComponent,/*  NgbdModalContent */ } from './product/product.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ConfirmComponent } from './confirm/confirm.component';
import { SearchComponent } from './home/search/search.component';
import { OrderSentComponent } from './order-sent/order-sent.component';
import { CategoryComponent } from './home/category/category.component';
import { AdminComponent } from './admin/admin.component';
import { UpdateOrderComponent } from './update-order/update-order.component';
import { notifyModalContent } from './notify-dialog/notify-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductComponent,
    CartComponent,
    PageNotFoundComponent,
    CheckoutComponent,
    ConfirmComponent,
    SearchComponent,
    OrderSentComponent,
    CategoryComponent,
    AdminComponent,
    UpdateOrderComponent,
    notifyModalContent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    // MatButtonModule,
    // MatCheckboxModule,
    // MatInputModule,
    // MatFormFieldModule,
    MatTableModule,
    MatPaginatorModule,
    // MatDialogModule,
    CdkTableModule,
    MatTreeModule,
    FontAwesomeModule,
    NgbModule,
    // NgbActiveModal
  ],
  entryComponents: [notifyModalContent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
