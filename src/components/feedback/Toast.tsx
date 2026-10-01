import type { ReactNode } from 'react';
import { Icon } from '../core/Icon';
import { Strawberry } from '../brand/Strawberry';
import { cx } from '../../lib/cx';

export interface ToastProps {
  /** default = plum w/ strawberry, success = leaf, danger = berry */
  tone?: 'default' | 'success' | 'danger';
  title?: ReactNode;
  children?: ReactNode;
  action?: string;
  onAction?: () => void;
  onClose?: () => void;
  className?: string;
}

export function Toast({ tone = 'default', title, children, action, onAction, onClose, className }: ToastProps) {
  const lead = tone === 'success'
    ? <Icon name="check" size={18} />
    : tone === 'danger'
      ? <Icon name="triangle-alert" size={18} />
      : <Strawberry size={22} tilt={-10} />;
  return (
    <div role="status" className={cx('sb-toast', 'sb-toast--' + tone, className)}>
      <span className="sb-toast__lead">{lead}</span>
      <div className="sb-toast__body">
        {title ? <strong>{title}</strong> : null}
        {children ? <span>{children}</span> : null}
      </div>
      {action ? <button type="button" className="sb-toast__action" onClick={onAction}>{action}</button> : null}
      {onClose ? (
        <button type="button" className="sb-toast__close" aria-label="Dismiss" onClick={onClose}>
          <Icon name="x" size={16} />
        </button>
      ) : null}
    </div>
  );
}
