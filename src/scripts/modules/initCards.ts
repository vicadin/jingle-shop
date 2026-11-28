import { PRODUCTS } from '@/data/products.ts';
import { addToCart, loadCartFromStorage, saveCartToStorage } from '@/scripts/utils/cart';
import { sectionBestRender } from '@/scripts/components/SectionBest';

export function initCards(container: HTMLElement): void {
  const cartButton = document.getElementById('cart-button');
  const cartOverlay = document.getElementById('cart-overlay');

  function syncCardButtons(): void {
    const inCartIds = new Set(loadCartFromStorage().map((item) => item.product.id));

    container.querySelectorAll<HTMLButtonElement>('button[data-add-to-cart]').forEach((button) => {
      const product = PRODUCTS.find((item) => item.id === button.dataset.addToCart);
      if (!product) return;

      const inCart = inCartIds.has(product.id);
      button.classList.toggle('is-in-cart', inCart);
      button.title = inCart ? 'In cart' : 'Add to cart';
      button.setAttribute(
        'aria-label',
        inCart ? `${product.name} is in cart` : `Add ${product.name} to cart`,
      );
    });
  }

  container.addEventListener('click', (event) => {
    if (!(event.target instanceof Element)) return;

    const button = event.target.closest<HTMLButtonElement>('button[data-add-to-cart]');
    if (!button) return;

    const product = PRODUCTS.find((item) => item.id === button.dataset.addToCart);
    if (!product) return;

    const cartItems = loadCartFromStorage();
    if (!cartItems.some((item) => item.product.id === product.id)) {
      saveCartToStorage(addToCart(cartItems, product));
    }

    refreshCards();
    cartButton?.click();
  });

  cartOverlay?.addEventListener('click', refreshCards);

  window.addEventListener('storage', (event) => {
    if (event.storageArea === window.localStorage) {
      refreshCards();
    }
  });

  syncCardButtons();
  let previousCart = JSON.stringify(loadCartFromStorage());

  function refreshCards(): void {
    const currentCart = JSON.stringify(loadCartFromStorage());
    if (currentCart === previousCart) return;

    previousCart = currentCart;
    sectionBestRender(container);
    syncCardButtons();
  }
}
