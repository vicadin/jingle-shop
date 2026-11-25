import '@/style.css';
import { renderCartDrawerContent } from './scripts/components/cartDrawer';
import { initCartPage, syncHeaderCartCount } from './scripts/modules/initCartPage';
import { initCatalog } from './scripts/modules/initCatalog';
import mobileMenu from './scripts/modules/mobileMenu';
import {
  loadCartFromStorage,
  removeFromCart,
  saveCartToStorage,
  updateCartItemQuantity,
} from './scripts/utils/cart';

mobileMenu();

const catalog = document.getElementById('catalog');
const cartPage = document.getElementById('cart');

if (catalog) {
  initCatalog(catalog);
} else if (cartPage) {
  initCartPage(cartPage);
  const cartButton = document.getElementById('cart-button');
  cartButton?.addEventListener('click', () => {
    cartPage.scrollIntoView({ behavior: 'smooth' });
  });
} else {
  let cartItems = loadCartFromStorage();
  let isCartOpen = false;
  syncHeaderCartCount(cartItems);

  const cartButton = document.getElementById('cart-button');
  const overlay = document.createElement('div');
  overlay.className = 'cart-overlay';
  overlay.id = 'cart-overlay';
  overlay.hidden = true;
  document.body.appendChild(overlay);

  const updateDrawer = (): void => {
    saveCartToStorage(cartItems);
    syncHeaderCartCount(cartItems);
    overlay.hidden = !isCartOpen;
    if (isCartOpen) {
      overlay.innerHTML = renderCartDrawerContent(cartItems);
    }
  };

  cartButton?.addEventListener('click', () => {
    cartItems = loadCartFromStorage();
    isCartOpen = true;
    updateDrawer();
  });

  overlay.addEventListener('click', (event) => {
    const target = event.target;
    if (!(target instanceof Element)) {
      return;
    }

    if (target === overlay || target.closest('#cart-close-btn')) {
      isCartOpen = false;
      updateDrawer();
      return;
    }

    const decButton = target.closest<HTMLElement>('[data-cart-dec]');
    if (decButton?.dataset.cartDec) {
      const existing = cartItems.find((item) => item.product.id === decButton.dataset.cartDec);
      if (existing) {
        cartItems = updateCartItemQuantity(cartItems, existing.product.id, existing.quantity - 1);
        updateDrawer();
      }
      return;
    }

    const incButton = target.closest<HTMLElement>('[data-cart-inc]');
    if (incButton?.dataset.cartInc) {
      const existing = cartItems.find((item) => item.product.id === incButton.dataset.cartInc);
      if (existing) {
        cartItems = updateCartItemQuantity(cartItems, existing.product.id, existing.quantity + 1);
        updateDrawer();
      }
      return;
    }

    const removeButton = target.closest<HTMLElement>('[data-cart-remove]');
    if (removeButton?.dataset.cartRemove) {
      cartItems = removeFromCart(cartItems, removeButton.dataset.cartRemove);
      updateDrawer();
    }
  });

  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && isCartOpen) {
      isCartOpen = false;
      updateDrawer();
    }
  });
}
