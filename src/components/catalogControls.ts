import type { ProductCategory } from '@/types/product.ts';
import { escapeHtml } from '@/utils/format.ts';

export function renderCatalogControls(categories: readonly ProductCategory[]): string {
  const categoryOptions = categories
    .map((category) => `<option value="${escapeHtml(category)}">${escapeHtml(category)}</option>`)
    .join('');

  return `
    <form class="filters-bar" id="catalog-filters" aria-label="Catalog filters">
      <div class="filter-field">
        <label class="filter-label" for="search-input">Search</label>
        <input
          id="search-input"
          name="search"
          type="search"
          class="filter-input"
          placeholder="Search gifts by name..."
        />
      </div>

      <div class="filter-field">
        <label class="filter-label" for="category-select">Category</label>
        <select id="category-select" name="category" class="filter-select">
          <option value="all">All Categories</option>
          ${categoryOptions}
        </select>
      </div>

      <div class="filter-field">
        <label class="filter-label" for="min-price-input">From ($)</label>
        <input
          id="min-price-input"
          name="minPrice"
          type="number"
          min="0"
          step="1"
          class="filter-input"
          placeholder="0"
        />
      </div>

      <div class="filter-field">
        <label class="filter-label" for="max-price-input">To ($)</label>
        <input
          id="max-price-input"
          name="maxPrice"
          type="number"
          min="0"
          step="1"
          class="filter-input"
          placeholder="100"
        />
      </div>

      <div class="filter-field">
        <label class="filter-label" for="sort-select">Sort by</label>
        <select id="sort-select" name="sort" class="filter-select">
          <option value="default">Default Order</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
        </select>
      </div>

      <button type="button" id="reset-filters-btn" class="reset-button">
        Reset
      </button>
    </form>
  `;
}
