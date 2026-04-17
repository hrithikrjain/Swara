'use client';

import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useCallback,
  type ReactNode,
} from 'react';
import type { Product } from '@/lib/products';

/* ── Types ──────────────────────────────────────────────────────────────── */

export interface CartItem {
  product  : Product;
  size     : string;
  quantity : number;
}

interface CartState {
  items     : CartItem[];
  isOpen    : boolean;
}

type CartAction =
  | { type: 'ADD_ITEM';    payload: { product: Product; size: string } }
  | { type: 'REMOVE_ITEM'; payload: { id: string; size: string } }
  | { type: 'UPDATE_QTY';  payload: { id: string; size: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'OPEN_CART' }
  | { type: 'CLOSE_CART' }
  | { type: 'HYDRATE';     payload: CartItem[] };

interface CartContextValue extends CartState {
  addItem      : (product: Product, size: string) => void;
  removeItem   : (id: string, size: string) => void;
  updateQty    : (id: string, size: string, quantity: number) => void;
  clearCart    : () => void;
  openCart     : () => void;
  closeCart    : () => void;
  totalItems   : number;
  totalPrice   : number;
}

/* ── Reducer ────────────────────────────────────────────────────────────── */

function reducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {

    case 'HYDRATE':
      return { ...state, items: action.payload };

    case 'ADD_ITEM': {
      const { product, size } = action.payload;
      const existing = state.items.find(
        i => i.product.id === product.id && i.size === size
      );
      const items = existing
        ? state.items.map(i =>
            i.product.id === product.id && i.size === size
              ? { ...i, quantity: i.quantity + 1 }
              : i
          )
        : [...state.items, { product, size, quantity: 1 }];
      return { ...state, items, isOpen: true };
    }

    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(
          i => !(i.product.id === action.payload.id && i.size === action.payload.size)
        ),
      };

    case 'UPDATE_QTY': {
      const { id, size, quantity } = action.payload;
      if (quantity <= 0) {
        return {
          ...state,
          items: state.items.filter(i => !(i.product.id === id && i.size === size)),
        };
      }
      return {
        ...state,
        items: state.items.map(i =>
          i.product.id === id && i.size === size ? { ...i, quantity } : i
        ),
      };
    }

    case 'CLEAR_CART':
      return { ...state, items: [] };

    case 'OPEN_CART':
      return { ...state, isOpen: true };

    case 'CLOSE_CART':
      return { ...state, isOpen: false };

    default:
      return state;
  }
}

/* ── Context ────────────────────────────────────────────────────────────── */

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = 'swara_cart';

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { items: [], isOpen: false });

  /* Hydrate from localStorage on mount */
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed: CartItem[] = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          dispatch({ type: 'HYDRATE', payload: parsed });
        }
      }
    } catch { /* ignore corrupt storage */ }
  }, []);

  /* Persist to localStorage on every change */
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
    } catch { /* ignore quota errors */ }
  }, [state.items]);

  const addItem    = useCallback((product: Product, size: string) =>
    dispatch({ type: 'ADD_ITEM', payload: { product, size } }), []);

  const removeItem = useCallback((id: string, size: string) =>
    dispatch({ type: 'REMOVE_ITEM', payload: { id, size } }), []);

  const updateQty  = useCallback((id: string, size: string, quantity: number) =>
    dispatch({ type: 'UPDATE_QTY', payload: { id, size, quantity } }), []);

  const clearCart  = useCallback(() => dispatch({ type: 'CLEAR_CART' }), []);
  const openCart   = useCallback(() => dispatch({ type: 'OPEN_CART'  }), []);
  const closeCart  = useCallback(() => dispatch({ type: 'CLOSE_CART' }), []);

  const totalItems = state.items.reduce((s, i) => s + i.quantity, 0);
  const totalPrice = state.items.reduce((s, i) => s + i.product.price * i.quantity, 0);

  return (
    <CartContext.Provider
      value={{ ...state, addItem, removeItem, updateQty, clearCart, openCart, closeCart, totalItems, totalPrice }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside <CartProvider>');
  return ctx;
}
