import type { CSSProperties } from 'react';
import {
  ArrowLeft, ArrowRight, Calendar, Check, ChevronDown, Heart, Lock, Menu, Minus,
  Phone, Plus, Search, ShoppingBasket, TriangleAlert, X, type LucideIcon,
} from 'lucide-react';

const ICONS = {
  'arrow-left': ArrowLeft,
  'arrow-right': ArrowRight,
  calendar: Calendar,
  check: Check,
  'chevron-down': ChevronDown,
  heart: Heart,
  lock: Lock,
  menu: Menu,
  minus: Minus,
  phone: Phone,
  plus: Plus,
  search: Search,
  'shopping-basket': ShoppingBasket,
  'triangle-alert': TriangleAlert,
  x: X,
} satisfies Record<string, LucideIcon>;

export type IconName = keyof typeof ICONS;

export interface IconProps {
  /** Lucide icon name, kebab-case */
  name: IconName;
  /** Pixel size. Default 20 */
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function Icon({ name, size = 20, color, className = '', style }: IconProps) {
  const Glyph = ICONS[name];
  return (
    <Glyph
      aria-hidden="true"
      focusable="false"
      className={'sb-icon ' + className}
      size={size}
      strokeWidth={2}
      color={color}
      style={style}
    />
  );
}
