import { renderCartPage } from '@/scripts/components/cartPage';
import type { CartItem } from '@/scripts/types/cart.ts';
import {
  VALID_PROMO_CODE,
  decrementCartItemQuantity,
  getCartItemCount,
  loadCartFromStorage,
  removeFromCart,
  saveCartToStorage,
  updateCartItemQuantity,
} from '@/scripts/utils/cart';

export function syncHeaderCartCount(items: readonly CartItem[]): void {
  const cartButton = document.getElementById('cart-button');
  const cartCount = document.getElementById('cart-count');
  const count = getCartItemCount(items);

  if (cartCount) {
    cartCount.textContent = String(count);
    cartCount.hidden = count === 0;
  }

  cartButton?.setAttribute('aria-label', `Cart (${count} ${count === 1 ? 'item' : 'items'})`);
}

export function initCartPage(container: HTMLElement): void {
  let cartItems: CartItem[] = loadCartFromStorage();
  let appliedPromoCode: string | null = null;
  let promoInputValue = '';
  let promoMessage: string | null = null;
  let promoStatus: 'success' | 'error' | null = null;
  let checkoutNotice: string | null = null;

  function render(): void {
    syncHeaderCartCount(cartItems);
    container.innerHTML = renderCartPage(cartItems, {
      appliedPromoCode,
      promoInputValue,
      promoMessage,
      promoStatus,
      checkoutNotice,
    });
  }

  function persistAndRender(): void {
    saveCartToStorage(cartItems);
    if (cartItems.length === 0) {
      appliedPromoCode = null;
      promoMessage = null;
      promoStatus = null;
    }
    render();
  }

  container.addEventListener('click', (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) {
      return;
    }

    const decBtn = target.closest<HTMLElement>('[data-cart-page-dec]');
    if (decBtn?.dataset.cartPageDec) {
      checkoutNotice = null;
      cartItems = decrementCartItemQuantity(cartItems, decBtn.dataset.cartPageDec);
      persistAndRender();
      return;
    }

    const incBtn = target.closest<HTMLElement>('[data-cart-page-inc]');
    if (incBtn?.dataset.cartPageInc) {
      const existing = cartItems.find((item) => item.product.id === incBtn.dataset.cartPageInc);
      if (existing) {
        checkoutNotice = null;
        cartItems = updateCartItemQuantity(cartItems, existing.product.id, existing.quantity + 1);
        persistAndRender();
      }
      return;
    }

    const removeBtn = target.closest<HTMLElement>('[data-cart-page-remove]');
    if (removeBtn?.dataset.cartPageRemove) {
      checkoutNotice = null;
      cartItems = removeFromCart(cartItems, removeBtn.dataset.cartPageRemove);
      persistAndRender();
      return;
    }

    if (target.closest('#clear-cart-btn')) {
      checkoutNotice = null;
      cartItems = [];
      promoInputValue = '';
      persistAndRender();
      return;
    }

    if (target.closest('#checkout-btn') && cartItems.length > 0) {
      const count = getCartItemCount(cartItems);
      cartItems = [];
      appliedPromoCode = null;
      promoInputValue = '';
      promoMessage = null;
      promoStatus = null;
      checkoutNotice = `Order placed for ${count} ${count === 1 ? 'item' : 'items'}! Happy Holidays!`;
      saveCartToStorage(cartItems);
      render();
    }
  });

  container.addEventListener('submit', (event) => {
    const target = event.target;
    if (!(target instanceof HTMLFormElement) || target.id !== 'promo-form') {
      return;
    }

    event.preventDefault();
    if (cartItems.length === 0) {
      return;
    }

    const input = document.getElementById('promo-code-input') as HTMLInputElement | null;
    const rawCode = input?.value.trim() ?? '';
    promoInputValue = rawCode;

    if (!rawCode) {
      promoMessage = 'Please enter a promo code.';
      promoStatus = 'error';
      render();
      return;
    }

    const normalized = rawCode.toUpperCase();
    if (normalized === VALID_PROMO_CODE) {
      if (appliedPromoCode === VALID_PROMO_CODE) {
        promoMessage = `Promo code ${VALID_PROMO_CODE} is already applied.`;
        promoStatus = 'success';
      } else {
        appliedPromoCode = VALID_PROMO_CODE;
        promoMessage = `Promo code ${VALID_PROMO_CODE} applied: 10% off items.`;
        promoStatus = 'success';
      }
    } else {
      promoMessage = `Promo code "${rawCode}" is not valid.`;
      promoStatus = 'error';
    }

    render();
  });

  render();
}
