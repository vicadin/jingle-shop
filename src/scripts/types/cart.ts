import type { Product } from '@/scripts/types/product.ts';

export interface CartItem {
  product: Product;
  quantity: number;
}
