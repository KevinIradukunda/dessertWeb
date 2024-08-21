import { createReducer, on } from '@ngrx/store';
import { addItemToCart, removeItemFromCart, increaseItemQuantity, decreaseItemQuantity, clearSelectedItem } from './cart.actions';

export interface CartItem {
  id: number;
  quantity: number;
}

export interface CartState {
  items: CartItem[];  
  selectedItemId: number | null;  
}

export const initialState: CartState = {
  items: [],
  selectedItemId: null,
};

export const cartReducer = createReducer(
  initialState,
  on(addItemToCart, (state, { itemId }) => {
    const existingItem = state.items.find(item => item.id === itemId);
    if (existingItem) {
      return {
        ...state,
        items: state.items.map(item =>
          item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
        ),
        selectedItemId: itemId,
      };
    } else {
      return {
        ...state,
        items: [...state.items, { id: itemId, quantity: 1 }],
        selectedItemId: itemId,
      };
    }
  }),
  on(increaseItemQuantity, (state, { itemId }) => ({
    ...state,
    items: state.items.map(item =>
      item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
    ),
  })),
  on(decreaseItemQuantity, (state, { itemId }) => ({
    ...state,
    items: state.items.map(item =>
      item.id === itemId && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    ),
  })),
  on(removeItemFromCart, (state, { itemId }) => ({
    ...state,
    items: state.items.filter(item => item.id !== itemId),
    selectedItemId: null,
  })),
  on(clearSelectedItem, state => ({
    ...state,
    selectedItemId: null,
  }))
);