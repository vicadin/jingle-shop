import { PRODUCTS } from '@/data/products.ts';
import { getBestproducts } from '../modules/getBestProducts';
import { renderProductCard } from '@/scripts/components/productCard';
import { loadCartFromStorage } from '../utils/cart';

export const sectionBestRender = (container: HTMLElement): void => {
  const result = getBestproducts(PRODUCTS, loadCartFromStorage()).map((product) =>
    renderProductCard(product),
  );
  container.innerHTML = `${result.join('')}`;
};
