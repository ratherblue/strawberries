import type { BadgeTone } from '../components';

export type Tone = 'berry' | 'leaf' | 'plum';
export type ProductKind = 'box' | 'jam' | 'gift';

export interface Product {
  id: string;
  name: string;
  weight: string;
  price: number;
  blurb: string;
  tone: Tone;
  badge?: { tone: BadgeTone; text: string };
  kind: ProductKind;
}

export const PRODUCTS: Product[] = [
  { id: 'punnet', name: 'The Punnet', weight: '400g', price: 8.5, blurb: 'A little something for the fruit bowl.', tone: 'berry', badge: { tone: 'leaf', text: 'In season' }, kind: 'box' },
  { id: 'picnic', name: 'Picnic Box', weight: '1kg', price: 18.5, blurb: "Enough to share. Or not. We won't tell.", tone: 'plum', badge: { tone: 'berry', text: 'Most loved' }, kind: 'box' },
  { id: 'jam', name: 'Jam-maker', weight: '3kg', price: 36, blurb: 'Slightly softer berries, made for bubbling.', tone: 'leaf', badge: { tone: 'sun', text: 'Only 4 left' }, kind: 'box' },
  { id: 'cream', name: 'Berries & Cream', weight: '600g + 250ml', price: 14, blurb: 'Clotted cream from the dairy next door.', tone: 'berry', kind: 'gift' },
  { id: 'jar', name: 'Field Jam', weight: '340g jar', price: 6, blurb: 'Just berries, sugar and a squeeze of lemon.', tone: 'plum', kind: 'jam' },
  { id: 'gift', name: 'Gift Crate', weight: '1.5kg', price: 28, blurb: 'Wrapped in paper with a handwritten note.', tone: 'leaf', badge: { tone: 'plum', text: 'New' }, kind: 'gift' },
];

export const PRODUCTS_BY_ID: Record<string, Product> = Object.fromEntries(PRODUCTS.map((p) => [p.id, p]));
