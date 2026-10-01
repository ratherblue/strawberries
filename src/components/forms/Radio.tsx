import type { InputHTMLAttributes, ReactNode } from 'react'
import clsx from 'clsx'

export interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: ReactNode
}

export function Radio({ label, className, ...rest }: RadioProps) {
  return (
    <label className={clsx('sb-check', className)}>
      <input type="radio" {...rest} />
      <span className="sb-check-box radio">
        <span className="sb-radio-dot" />
      </span>
      {label ? <span>{label}</span> : null}
    </label>
  )
}
