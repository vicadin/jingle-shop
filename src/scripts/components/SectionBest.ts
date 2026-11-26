import { PRODUCTS } from '@/data/products.ts';
import { getBestproducts } from '../modules/getBestProducts';
import { renderProductCard } from '@/scripts/components/productCard';

const data = [
  { id: 'brass-star-topper', qty: '4' },
  { id: 'wooden-nutcracker', qty: '3' },
]; // from localstorage

export const sectionBestRender = (container: HTMLElement): void => {
  const result = getBestproducts(PRODUCTS, data).map(renderProductCard);
  container.innerHTML = `${result.join('')}`;
};
