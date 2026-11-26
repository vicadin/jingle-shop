import type { Product } from '@/scripts/types/product';

const getRandomIndex = (n: number): number => Math.floor(Math.random() * n);

//args: products, storage {id, quantity} - ?
export const getBestproducts = (
  products: readonly Product[],
  data: { id: string; qty: string }[],
  cardsLength = 4,
): Product[] => {
  const sortedIds = [...data].sort((a, b) => Number(b.qty) - Number(a.qty)).map((el) => el.id);

  const filtered = sortedIds
    .map((id) => products.find((product) => product.id === id))
    .filter((product): product is Product => product !== undefined);

  if (filtered.length > cardsLength) {
    return filtered.slice(0, cardsLength);
  }

  const temp = products.filter((el) => !sortedIds.includes(el.id));
  const set = new Set<number>();

  const remaining = Math.min(cardsLength - filtered.length, temp.length);

  while (set.size < remaining) {
    set.add(getRandomIndex(temp.length));
  }

  const res = [...set].map((idx) => temp[idx]);

  return [...filtered, ...res];
};
