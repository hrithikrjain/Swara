'use client';
/**
 * Thin client-component wrapper so the server layout.tsx can render
 * the CartProvider (which is 'use client') as a child.
 */
import { CartProvider } from '@/context/CartContext';
import { type ReactNode } from 'react';

export default function CartProviderWrapper({ children }: { children: ReactNode }) {
  return <CartProvider>{children}</CartProvider>;
}
