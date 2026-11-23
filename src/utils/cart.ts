import type { CartItem } from '@/types/cart.ts';
import type { Product } from '@/types/product.ts';

export function addToCart(items: readonly CartItem[], product: Product): CartItem[] {
  const existingItem = items.find((item) => item.product.id === product.id);

  if (existingItem) {
    return items.map((item) =>
      item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
    );
  }

  return [...items, { product, quantity: 1 }];
}

export function updateCartItemQuantity(
  items: readonly CartItem[],
  productId: string,
  quantity: number,
): CartItem[] {
  if (quantity <= 0) {
    return removeFromCart(items, productId);
  }

  return items.map((item) => (item.product.id === productId ? { ...item, quantity } : item));
}

export function removeFromCart(items: readonly CartItem[], productId: string): CartItem[] {
  return items.filter((item) => item.product.id !== productId);
}

export function getCartItemCount(items: readonly CartItem[]): number {
  return items.reduce((total, item) => total + item.quantity, 0);
}

export function getCartTotalPrice(items: readonly CartItem[]): number {
  return items.reduce((total, item) => total + item.product.price * item.quantity, 0);
}
