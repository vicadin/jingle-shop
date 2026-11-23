import type { Product } from '@/types/product.ts';

export interface CartItem {
  product: Product;
  quantity: number;
}
