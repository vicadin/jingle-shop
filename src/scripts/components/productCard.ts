import type { Product } from '@/scripts/types/product.ts';
import { escapeHtml, formatPrice } from '@/scripts/utils/format';
import cart from '@/templates/components/icons/cart.svg?raw';

export function renderProductCard(product: Product): string {
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
          class="add-to-cart-btn"
          data-add-to-cart="${escapeHtml(product.id)}"
        >
          ${cart}
        </button>
      </div>
    </div>
    </article>
  `;
}
