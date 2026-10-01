import type { ButtonHTMLAttributes } from 'react';
import { Icon, type IconName } from './Icon';
import { cx } from '../../lib/cx';

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: IconName;
  /** Accessible label (also shown as native title) */
  label: string;
  variant?: 'outline' | 'ghost' | 'solid';
  size?: 'sm' | 'md' | 'lg';
}

export function IconButton({ icon, label, variant = 'outline', size = 'md', className, ...rest }: IconButtonProps) {
  const px = { sm: 16, md: 20, lg: 22 }[size];
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      className={cx('sb-iconbtn', 'sb-iconbtn--' + variant, 'sb-iconbtn--' + size, className)}
      {...rest}
    >
      <Icon name={icon} size={px} />
    </button>
  );
}
