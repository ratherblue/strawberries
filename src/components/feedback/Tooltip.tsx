import type { ReactNode } from 'react'
import clsx from 'clsx'

export interface TooltipProps {
  label: ReactNode
  placement?: 'top' | 'bottom'
  /** Force visible */
  open?: boolean
  children: ReactNode
}

export function Tooltip({ label, placement = 'top', open = false, children }: TooltipProps) {
  return (
    <span className={clsx('sb-tip', placement, open && 'open')}>
      {children}
      <span role="tooltip" className="sb-tip-bubble">
        {label}
      </span>
    </span>
  )
}
