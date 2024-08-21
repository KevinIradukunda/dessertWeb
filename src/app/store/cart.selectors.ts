import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CartState } from './cart.reducer';

export const selectCartState = createFeatureSelector<CartState>('cart');

export const selectCartItems = createSelector(
  selectCartState,
  (state: CartState) => state.items
);

export const selectSelectedItem = createSelector(
  selectCartState,
  (state: CartState) => state.selectedItemId
);

export const selectCartItemQuantity = (itemId: number) => createSelector(
  selectCartItems,
  (items) => {
    const item = items.find(item => item.id === itemId);
    return item ? item.quantity : 0;
  }
);