import type { HTMLAttributes } from 'react';
import { cx } from '../../lib/cx';

export interface StripesProps extends HTMLAttributes<HTMLDivElement> {
  tone?: 'berry' | 'leaf' | 'plum';
  /** band = hatched block; rule = hatched divider; candy = bold two-tone stripe; gingham / plaid = picnic check */
  variant?: 'band' | 'rule' | 'candy' | 'gingham' | 'plaid';
  height?: number | string;
}

export function Stripes({ tone = 'berry', variant = 'band', height, className, style, ...rest }: StripesProps) {
  const h = height ?? (variant === 'rule' ? 10 : variant === 'candy' ? 12 : 48);
  const pat = tone + (variant === 'band' || variant === 'rule' ? '' : '-' + variant);
  return <div aria-hidden="true" className={cx('sb-stripes', variant, 'sb-pattern', pat, className)} style={{ height: h, ...style }} {...rest} />;
}
