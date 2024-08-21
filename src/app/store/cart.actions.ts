import { createAction, props } from '@ngrx/store';

export const addItemToCart = createAction(
  '[Cart] Add Item to Cart',
  props<{ itemId: number }>()
);

export const removeItemFromCart = createAction(
  '[Cart] Remove Item from Cart',
  props<{ itemId: number }>()
);

export const increaseItemQuantity = createAction(
  '[Cart] Increase Item Quantity',
  props<{ itemId: number }>()
);

export const decreaseItemQuantity = createAction(
  '[Cart] Decrease Item Quantity',
  props<{ itemId: number }>()
);

export const clearSelectedItem = createAction('[Cart] Clear Selected Item');