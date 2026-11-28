import type { Product } from '@/scripts/types/product.ts';
import { escapeHtml, formatPrice } from '@/scripts/utils/format';
import cart from '@/templates/components/icons/cart.svg?raw';

export function renderProductCard(product: Product, inCart = false): string {
  const imageMarkup = product.image
    ? `
      <div class="product-image-wrap">
        <img
          class="product-image"
          src="${escapeHtml(product.image)}"
          alt="${escapeHtml(product.name)}"
          loading="lazy"
        />
      </div>
    `
    : '';

  const buttonClass = inCart ? 'add-to-cart-btn is-in-cart' : 'add-to-cart-btn';
  const buttonLabel = inCart
    ? `${escapeHtml(product.name)} is in cart`
    : `Add ${escapeHtml(product.name)} to cart`;

  return `
    <article class="product-card" data-product-id="${escapeHtml(product.id)}">
      ${imageMarkup}
      <div class="product-content">
      <p class="product-category">${escapeHtml(product.category)}</p>
      <h3 class="product-name">${escapeHtml(product.name)}</h3>
      <p class="product-description">${escapeHtml(product.description)}</p>
      <div class="product-footer">
        <span class="product-price">${formatPrice(product.price)}</span>
        <button
          type="button"
          class="${buttonClass}"
          data-add-to-cart="${escapeHtml(product.id)}"
          aria-label="${buttonLabel}"
          title="${inCart ? 'In cart' : 'Add to cart'}"
        >
          ${cart}
        </button>
      </div>
    </div>
    </article>
  `;
}
