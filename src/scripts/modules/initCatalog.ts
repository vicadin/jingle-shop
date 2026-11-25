import { PRODUCTS, PRODUCT_CATEGORIES } from '@/data/products.ts';
import { renderCartDrawerContent } from '@/scripts/components/cartDrawer';
import { renderCatalogResults, renderCatalogSection } from '@/scripts/components/catalogSection';
import type { CartItem } from '@/scripts/types/cart.ts';
import {
  addToCart,
  getCartItemCount,
  loadCartFromStorage,
  removeFromCart,
  saveCartToStorage,
  updateCartItemQuantity,
} from '@/scripts/utils/cart';
import {
  createDefaultFilters,
  filterAndSortProducts,
  parsePriceInput,
  type CategoryFilter,
  type SortOrder,
} from '@/scripts/utils/catalog';

export function initCatalog(catalog: HTMLElement): void {
  let filters = createDefaultFilters();
  let cartItems: CartItem[] = loadCartFromStorage();
  let isCartOpen = false;

  catalog.innerHTML = `
  ${renderCatalogSection(PRODUCTS, PRODUCT_CATEGORIES)}
  <div class="cart-overlay" id="cart-overlay" hidden></div>
`;

  const filtersForm = document.getElementById('catalog-filters') as HTMLFormElement | null;
  const searchInput = document.getElementById('search-input') as HTMLInputElement | null;
  const categorySelect = document.getElementById('category-select') as HTMLSelectElement | null;
  const minPriceInput = document.getElementById('min-price-input') as HTMLInputElement | null;
  const maxPriceInput = document.getElementById('max-price-input') as HTMLInputElement | null;
  const sortSelect = document.getElementById('sort-select') as HTMLSelectElement | null;
  const resetButton = document.getElementById('reset-filters-btn');
  const catalogCount = document.getElementById('catalog-count');
  const catalogResults = document.getElementById('catalog-results');
  const cartButton = document.getElementById('cart-button');
  const cartCount = document.getElementById('cart-count');
  const cartOverlay = document.getElementById('cart-overlay');

  function updateCatalogView(): void {
    const filteredProducts = filterAndSortProducts(PRODUCTS, filters);
    if (catalogResults) {
      catalogResults.innerHTML = renderCatalogResults(filteredProducts);
    }
    if (catalogCount) {
      const label = filteredProducts.length === 1 ? 'item' : 'items';
      catalogCount.textContent = `Showing ${filteredProducts.length} ${label}`;
    }
  }

  function resetAllFilters(): void {
    filters = createDefaultFilters();
    if (searchInput) searchInput.value = '';
    if (categorySelect) categorySelect.value = 'all';
    if (minPriceInput) minPriceInput.value = '';
    if (maxPriceInput) maxPriceInput.value = '';
    if (sortSelect) sortSelect.value = 'default';
    updateCatalogView();
  }

  function updateCartView(): void {
    saveCartToStorage(cartItems);
    const count = getCartItemCount(cartItems);

    if (cartCount) {
      cartCount.textContent = String(count);
      cartCount.hidden = count === 0;
    }

    cartButton?.setAttribute('aria-label', `Cart (${count} ${count === 1 ? 'item' : 'items'})`);

    if (cartOverlay) {
      cartOverlay.hidden = !isCartOpen;
      if (isCartOpen) {
        cartOverlay.innerHTML = renderCartDrawerContent(cartItems);
      }
    }
  }

  updateCartView();

  filtersForm?.addEventListener('submit', (event) => {
    event.preventDefault();
  });

  searchInput?.addEventListener('input', () => {
    filters = { ...filters, search: searchInput.value };
    updateCatalogView();
  });

  categorySelect?.addEventListener('change', () => {
    filters = { ...filters, category: categorySelect.value as CategoryFilter };
    updateCatalogView();
  });

  minPriceInput?.addEventListener('input', () => {
    filters = { ...filters, minPrice: parsePriceInput(minPriceInput.value) };
    updateCatalogView();
  });

  maxPriceInput?.addEventListener('input', () => {
    filters = { ...filters, maxPrice: parsePriceInput(maxPriceInput.value) };
    updateCatalogView();
  });

  sortSelect?.addEventListener('change', () => {
    filters = { ...filters, sort: sortSelect.value as SortOrder };
    updateCatalogView();
  });

  resetButton?.addEventListener('click', resetAllFilters);

  catalogResults?.addEventListener('click', (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) {
      return;
    }

    if (target.closest('#empty-reset-btn')) {
      resetAllFilters();
      return;
    }

    const addButton = target.closest<HTMLElement>('[data-add-to-cart]');
    if (!addButton) {
      return;
    }

    const productId = addButton.dataset.addToCart;
    const product = PRODUCTS.find((item) => item.id === productId);
    if (!product) {
      return;
    }

    cartItems = addToCart(cartItems, product);
    updateCartView();
  });

  cartButton?.addEventListener('click', () => {
    isCartOpen = true;
    updateCartView();
  });

  cartOverlay?.addEventListener('click', (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) {
      return;
    }

    if (target === cartOverlay || target.closest('#cart-close-btn')) {
      isCartOpen = false;
      updateCartView();
      return;
    }

    const decButton = target.closest<HTMLElement>('[data-cart-dec]');
    if (decButton?.dataset.cartDec) {
      const existing = cartItems.find((item) => item.product.id === decButton.dataset.cartDec);
      if (existing) {
        cartItems = updateCartItemQuantity(cartItems, existing.product.id, existing.quantity - 1);
        updateCartView();
      }
      return;
    }

    const incButton = target.closest<HTMLElement>('[data-cart-inc]');
    if (incButton?.dataset.cartInc) {
      const existing = cartItems.find((item) => item.product.id === incButton.dataset.cartInc);
      if (existing) {
        cartItems = updateCartItemQuantity(cartItems, existing.product.id, existing.quantity + 1);
        updateCartView();
      }
      return;
    }

    const removeButton = target.closest<HTMLElement>('[data-cart-remove]');
    if (removeButton?.dataset.cartRemove) {
      cartItems = removeFromCart(cartItems, removeButton.dataset.cartRemove);
      updateCartView();
    }
  });

  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && isCartOpen) {
      isCartOpen = false;
      updateCartView();
    }
  });
}
