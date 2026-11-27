import type { CartItem } from '@/scripts/types/cart.ts';
import type { Product } from '@/scripts/types/product.ts';

const CART_STORAGE_KEY = 'jingle-shop-cart';
export const SHIPPING_FEE = 8;
export const VALID_PROMO_CODE = 'SALE10';
export const PROMO_DISCOUNT_RATE = 0.1;

export interface OrderSummary {
  itemCount: number;
  itemsSubtotal: number;
  shipping: number;
  discount: number;
  appliedPromoCode: string | null;
  total: number;
}

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

export function decrementCartItemQuantity(
  items: readonly CartItem[],
  productId: string,
): CartItem[] {
  return items.map((item) =>
    item.product.id === productId ? { ...item, quantity: Math.max(1, item.quantity - 1) } : item,
  );
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

export function calculateOrderSummary(
  items: readonly CartItem[],
  promoCode: string | null = null,
): OrderSummary {
  const itemCount = getCartItemCount(items);
  const itemsSubtotal = getCartTotalPrice(items);

  if (itemCount === 0) {
    return {
      itemCount: 0,
      itemsSubtotal: 0,
      shipping: 0,
      discount: 0,
      appliedPromoCode: null,
      total: 0,
    };
  }

  const normalizedCode = promoCode?.trim().toUpperCase() ?? '';
  const isPromoValid = normalizedCode === VALID_PROMO_CODE;
  const discount = isPromoValid ? Number((itemsSubtotal * PROMO_DISCOUNT_RATE).toFixed(2)) : 0;
  const shipping = SHIPPING_FEE;
  const total = Math.max(0, Number((itemsSubtotal - discount + shipping).toFixed(2)));

  return {
    itemCount,
    itemsSubtotal,
    shipping,
    discount,
    appliedPromoCode: isPromoValid ? VALID_PROMO_CODE : null,
    total,
  };
}

export function loadCartFromStorage(): CartItem[] {
  if (typeof window === 'undefined' || !('localStorage' in window)) {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) {
      return [];
    }

    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter(
      (entry): entry is CartItem =>
        typeof entry === 'object' &&
        entry !== null &&
        'product' in entry &&
        'quantity' in entry &&
        typeof entry.quantity === 'number' &&
        entry.quantity >= 1 &&
        typeof entry.product === 'object' &&
        entry.product !== null &&
        typeof entry.product.id === 'string' &&
        typeof entry.product.name === 'string' &&
        typeof entry.product.price === 'number',
    );
  } catch {
    return [];
  }
}

export function saveCartToStorage(items: readonly CartItem[]): void {
  if (typeof window === 'undefined' || !('localStorage' in window)) {
    return;
  }

  try {
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  } catch {
    // Ignore storage quota / privacy mode errors
  }
}
