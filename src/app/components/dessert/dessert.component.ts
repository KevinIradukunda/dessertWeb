import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { selectCartItemQuantity, selectCartItems,selectSelectedItem } from '../../store/cart.selectors';
import { addItemToCart, clearSelectedItem, decreaseItemQuantity, increaseItemQuantity, removeItemFromCart } from '../../store/cart.actions';

@Component({
  selector: 'app-dessert',
  templateUrl: './dessert.component.html',
  styleUrls: ['./dessert.component.css']
})
export class DessertComponent {

  desserts = [
    { id: 1, name: 'Waffle with Berries', description: 'Waffle', price: '$6.50', image: '/assets/images/image-waffle-desktop.jpg' },
    { id: 2, name: 'Vanilla Bean Crème Brûlée', description: 'Crème Brûlée', price: '$7.00', image: 'assets/images/image-creme-brulee-desktop.jpg' },
    {id: 3,  name: 'Macaron Mix of Five', description: 'Macaron', price: '$8.00', image: 'assets/images/image-macaron-desktop.jpg' },
    { id: 4, name: 'Classic Tiramisu', description: 'Tiramisu', price: '$5.50', image: 'assets/images/image-tiramisu-desktop.jpg' },
    { id: 5, name: 'Pistachio Baklava', description: 'Baklava', price: '$4.00', image: 'assets/images/baklava.jpg' },
    { id: 6, name: 'Lemon Meringue Pie', description: 'Pie', price: '$5.00', image: 'assets/images/image-meringue-desktop.jpg' },
    { id: 7, name: 'Red Velvet Cake', description: 'Cake', price: '$4.50', image: 'assets/images/image-cake-desktop.jpg' },
    { id: 8, name: 'Salted Caramel Brownie', description: 'Brownie', price: '$5.50', image: 'assets/images/image-brownie-desktop.jpg' },
    { id: 9, name: 'Vanilla Panna Cotta', description: 'Panna Cotta', price: '$6.50', image: 'assets/images/image-panna-cotta-desktop.jpg' }
  ];
  
  cartItems$: Observable<any[]>;
  selectedItemId$: Observable<number | null>;
  cartItemsCount$: Observable<number>;  


  constructor(private store: Store) {
    this.cartItems$ = this.store.select(selectCartItems);
    this.selectedItemId$ = this.store.select(selectSelectedItem);
    this.cartItemsCount$ = this.cartItems$.pipe(
      map(items => items.length)
    );
  }

  isItemInCart(itemId: number): Observable<boolean> {
    return this.store.select(selectCartItemQuantity(itemId)).pipe(
      map(quantity => quantity > 0)
    );
  }

  getQuantity(itemId: number): Observable<number> {
    return this.store.select(selectCartItemQuantity(itemId));
  }

  addToCart(itemId: any) {
    this.store.dispatch(addItemToCart({ itemId }));
  }

  increaseQuantity(itemId: number) {
    this.store.dispatch(increaseItemQuantity({ itemId }));
  }

  decreaseQuantity(itemId: number) {
    this.store.dispatch(decreaseItemQuantity({ itemId }));
    this.getQuantity(itemId).subscribe(quantity => {
      if (quantity === 1) {
        this.store.dispatch(removeItemFromCart({ itemId }));
        this.store.dispatch(clearSelectedItem());
      }
    });
  }

  updateQuantity(itemId: number, quantity: number) {
    if (quantity > 0) {
      console.log(`Updated quantity for item ${itemId}: ${quantity}`);
    } else {
      console.log(`Removing item ${itemId} from the cart`);
      this.removeFromCart(itemId);
    }
  }
  removeFromCart(itemId: number) {
    this.store.dispatch(removeItemFromCart({ itemId }));
    this.store.dispatch(clearSelectedItem());
  }



}
