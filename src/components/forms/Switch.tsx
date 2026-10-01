import type { InputHTMLAttributes, ReactNode } from 'react';
import { cx } from '../../lib/cx';

export interface SwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: ReactNode;
}

export function Switch({ label, className, ...rest }: SwitchProps) {
  return (
    <label className={cx('sb-switch', className)}>
      <input type="checkbox" role="switch" {...rest} />
      <span className="sb-switch-track"><span className="sb-switch-thumb" /></span>
      {label ? <span>{label}</span> : null}
    </label>
  );
}
