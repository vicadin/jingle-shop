import type { Product, ProductCategory } from '@/types/product.ts';
import { renderCatalogControls } from '@/components/catalogControls.ts';
import { renderProductCard } from '@/components/productCard.ts';

export function renderCatalogResults(products: readonly Product[]): string {
  if (products.length === 0) {
    return `
      <div class="empty-state" id="catalog-empty-state">
        <h3 class="empty-state-title">No gifts found</h3>
        <p class="empty-state-text">
          No products match your current search or filter criteria.
        </p>
        <button type="button" class="reset-button" id="empty-reset-btn">
          Reset Filters
        </button>
      </div>
    `;
  }

  return `<div class="product-grid" id="product-grid">${products.map(renderProductCard).join('')}</div>`;
}

export function renderCatalogSection(
  products: readonly Product[],
  categories: readonly ProductCategory[],
): string {
  return `
    <section aria-labelledby="catalog-heading">
      <div class="catalog-heading">
        <p class="catalog-kicker">— Best Gifts —</p>
        <h2 class="catalog-title" id="catalog-heading">Especially For You</h2>
      </div>

      ${renderCatalogControls(categories)}

      <div class="catalog-meta">
        <span id="catalog-count">Showing ${products.length} items</span>
      </div>

      <div id="catalog-results">
        ${renderCatalogResults(products)}
      </div>
    </section>
  `;
}
