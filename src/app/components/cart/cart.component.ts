import { Component, Input } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CartItem } from '../../store/cart.reducer';
import { decreaseItemQuantity, increaseItemQuantity, removeItemFromCart } from '../../store/cart.actions';
import { Store } from '@ngrx/store';
import { selectCartItems, selectCartTotal } from '../../store/cart.selectors';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {

  @Input() cartItems$: Observable<CartItem[]> = of([]); 
  @Input() cartTotals$: Observable<number>;  
  showModal: boolean = false;  

  constructor(private store: Store) {
    this.cartItems$ = this.store.select(selectCartItems);
    this.cartTotals$ = this.store.select(selectCartTotal);
  }

  toggleModal() {
    this.showModal = !this.showModal;
  }
  updateQuantity(itemId: number, quantity: number) {
    if (quantity > 0) {
      this.store.dispatch(increaseItemQuantity({ itemId }));
    } else {
      this.store.dispatch(decreaseItemQuantity({ itemId }));
      if (quantity === 1) {
        this.store.dispatch(removeItemFromCart({ itemId }));
      }
    }
  }
  removeItem(itemId: number) {
    this.store.dispatch(removeItemFromCart({ itemId }));
  }

  calculateItemTotal(item: any): number {
    return item.quantity * parseFloat(this.getItemPrice(item.id).substring(1));
  }

  getItemPrice(itemId: number): string {
    const dessert = this.desserts.find(d => d.id === itemId);
    return dessert ? dessert.price : '0';
  }

  getItemName(itemId: number): string {
    const dessert = this.desserts.find(d => d.id === itemId);
    return dessert ? dessert.name : '';
  }

 
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
