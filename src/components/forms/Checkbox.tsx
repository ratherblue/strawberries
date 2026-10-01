import type { InputHTMLAttributes, ReactNode } from 'react'
import { Icon } from '../core/Icon'
import clsx from 'clsx'

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: ReactNode
}

export function Checkbox({ label, className, ...rest }: CheckboxProps) {
  return (
    <label className={clsx('sb-check', className)}>
      <input type="checkbox" {...rest} />
      <span className="sb-check-box">
        <Icon name="check" size={14} />
      </span>
      {label ? <span>{label}</span> : null}
    </label>
  )
}
