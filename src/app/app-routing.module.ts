import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './Home/home.component';
import { ProductComponent } from './product/product.component';
import { CartComponent } from './cart/cart.component';
// import { CheckoutComponent } from './checkout/checkout.component';
// import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
// import { ConfirmComponent } from './confirm/confirm.component';

const appRoutes: Routes= [
  { path: '', component:HomeComponent },
  { path: 'product/:id', component:ProductComponent },
  { path: 'cart', component:CartComponent },
  // { path: 'checkout', component:CheckoutComponent },
  // { path: 'confirm', component:ConfirmComponent },
  // { path: '**', component:PageNotFoundComponent },
];

@NgModule({
  imports: [
  // This will make the routes appear in your application(not browser yet)
  RouterModule.forRoot(
    appRoutes,
    { enableTracing: true } // <-- debugging purposes only
    ),
    CommonModule
  ],
  // Exporting RouterModule makes AppModule component available which needs router directives.
  exports: [ RouterModule ],
  declarations: []
})
export class AppRoutingModule { }
