import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { cartReducer } from './store/cart.reducer';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DessertComponent } from './components/dessert/dessert.component';
import { ButtonComponent } from './components/button/button.component';
import { QuantityButtonComponent } from './components/quantity-button/quantity-button.component';
import { CommonModule } from '@angular/common';
import { reducers, metaReducers } from './reducers';
import { ConfirmOrderComponent } from './components/confirm-order/confirm-order.component';


@NgModule({
  declarations: [
    AppComponent,
    DessertComponent,
    ButtonComponent,
    QuantityButtonComponent,
    ConfirmOrderComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    StoreModule.forRoot({cart: cartReducer}),
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
