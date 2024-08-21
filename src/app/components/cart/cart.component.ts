import { Component, Input } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CartItem } from '../../store/cart.reducer';
import { removeItemFromCart } from '../../store/cart.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {

  @Input() cartItems$: Observable<CartItem[]> = of([]); 
  @Input() cartTotals$: Observable<number> = of(0);    

  constructor(private store: Store) {}

  removeItem(itemId: number) {
    this.store.dispatch(removeItemFromCart({ itemId }));
  }

  calculateItemTotal(item: CartItem): number {
    return item.quantity * parseFloat(this.getItemPrice(item.id));
  }

  getItemPrice(itemId: number): string {
    const dessert = this.desserts.find(d => d.id === itemId);
    return dessert ? dessert.price : '0';
  }

  getItemName(itemId: number): string {
    const dessert = this.desserts.find(d => d.id === itemId);
    return dessert ? dessert.name : '';
  }

  // Define your desserts here or receive them from the parent component
  desserts = [
    { id: 1, name: 'Waffle with Berries', price: '$6.50' },
    { id: 2, name: 'Vanilla Bean Crème Brûlée', price: '$7.00' },
    { id: 3, name: 'Macaron Mix of Five', price: '$8.00' },
    { id: 4, name: 'Classic Tiramisu', price: '$5.50' },
    { id: 5, name: 'Pistachio Baklava', price: '$4.00' },
    { id: 6, name: 'Lemon Meringue Pie', price: '$5.00' },
    { id: 7, name: 'Red Velvet Cake', price: '$4.50' },
    { id: 8, name: 'Salted Caramel Brownie', price: '$5.50' },
    { id: 9, name: 'Vanilla Panna Cotta', price: '$6.50' }
  ];


}
