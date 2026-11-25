import type { Product, ProductCategory } from '../types/product';
import { renderCatalogControls } from '@/scripts/components/catalogControls';
import { renderProductCard } from '@/scripts/components/productCard';

export function renderCatalogResults(
  products: readonly Product[],
  cartProductIds: ReadonlySet<string> = new Set(),
): string {
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

  return `<div class="product-grid" id="product-grid">${products
    .map((product) => renderProductCard(product, cartProductIds.has(product.id)))
    .join('')}</div>`;
}

export function renderCatalogSection(
  products: readonly Product[],
  categories: readonly ProductCategory[],
  cartProductIds: ReadonlySet<string> = new Set(),
): string {
  return `
      ${renderCatalogControls(categories)}

      <div class="catalog-meta">
        <span id="catalog-count">Showing ${products.length} items</span>
      </div>

      <div id="catalog-results">
        ${renderCatalogResults(products, cartProductIds)}
      </div>
    </section>
  `;
}
