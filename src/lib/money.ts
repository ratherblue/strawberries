import type { Product } from '../data/products';

export type Frequency = 'once' | 'weekly';
export interface Line extends Product { qty: number }

export const FREE_DELIVERY_AT = 30;
export const DELIVERY_FEE = 4.5;
export const WEEKLY_DISCOUNT = 0.1;

export const money = (n: number) => '$' + n.toFixed(2);

export function totals(lines: Line[], freq: Frequency) {
  const subtotal = lines.reduce((s, l) => s + l.qty * l.price, 0);
  const discount = freq === 'weekly' ? subtotal * WEEKLY_DISCOUNT : 0;
  const delivery = subtotal - discount >= FREE_DELIVERY_AT || subtotal === 0 ? 0 : DELIVERY_FEE;
  return { subtotal, discount, delivery, total: subtotal - discount + delivery };
}
