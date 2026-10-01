import type { ReactNode } from 'react';
import { cx } from '../../lib/cx';

export interface TooltipProps {
  label: ReactNode;
  placement?: 'top' | 'bottom';
  /** Force visible */
  open?: boolean;
  children: ReactNode;
}

export function Tooltip({ label, placement = 'top', open = false, children }: TooltipProps) {
  return (
    <span className={cx('sb-tip', placement, open && 'open')}>
      {children}
      <span role="tooltip" className="sb-tip-bubble">{label}</span>
    </span>
  );
}
