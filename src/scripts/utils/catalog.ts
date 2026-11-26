import type { Product, ProductCategory } from '@/scripts/types/product.ts';

export type SortOrder = 'default' | 'price-asc' | 'price-desc';
export type CategoryFilter = ProductCategory | 'all';

export interface CatalogFilterState {
  search: string;
  category: CategoryFilter;
  minPrice: number | null;
  maxPrice: number | null;
  sort: SortOrder;
}

export function createDefaultFilters(): CatalogFilterState {
  return {
    search: '',
    category: 'all',
    minPrice: null,
    maxPrice: null,
    sort: 'default',
  };
}

export function parsePriceInput(rawValue: string): number | null {
  const trimmed = rawValue.trim();
  if (!trimmed) {
    return null;
  }

  const parsed = Number(trimmed);
  if (!Number.isFinite(parsed) || parsed < 0) {
    return null;
  }

  return parsed;
}

export function filterAndSortProducts(
  products: readonly Product[],
  filters: CatalogFilterState,
): Product[] {
  const normalizedQuery = filters.search.trim().toLowerCase();

  const filtered = products.filter((product) => {
    const matchesSearch =
      normalizedQuery === '' || product.name.toLowerCase().includes(normalizedQuery);
    if (!matchesSearch) {
      return false;
    }

    const matchesCategory = filters.category === 'all' || product.category === filters.category;
    if (!matchesCategory) {
      return false;
    }

    if (filters.minPrice !== null && product.price < filters.minPrice) {
      return false;
    }

    if (filters.maxPrice !== null && product.price > filters.maxPrice) {
      return false;
    }

    return true;
  });

  if (filters.sort === 'price-asc') {
    return [...filtered].sort((a, b) => a.price - b.price);
  }

  if (filters.sort === 'price-desc') {
    return [...filtered].sort((a, b) => b.price - a.price);
  }

  return filtered;
}
