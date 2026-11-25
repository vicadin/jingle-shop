export type ProductCategory = 'Ornaments' | 'Candles & Scents' | 'Gift Sets' | 'Tableware & Decor';

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  price: number;
  description: string;
  image?: string;
}
