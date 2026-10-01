import type { InputHTMLAttributes, ReactNode } from 'react'
import { cx } from '../../lib/cx'

export interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: ReactNode
}

export function Radio({ label, className, ...rest }: RadioProps) {
  return (
    <label className={cx('sb-check', className)}>
      <input type="radio" {...rest} />
      <span className="sb-check-box radio">
        <span className="sb-radio-dot" />
      </span>
      {label ? <span>{label}</span> : null}
    </label>
  )
}
