import type { HTMLAttributes } from 'react'
import clsx from 'clsx'

export type BadgeTone = 'berry' | 'leaf' | 'plum' | 'sun' | 'neutral' | 'solid'

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: BadgeTone
  /** Leading status dot */
  dot?: boolean
}

export function Badge({ tone = 'berry', dot = false, className, children, ...rest }: BadgeProps) {
  return (
    <span className={clsx('sb-badge', tone, className)} {...rest}>
      {dot ? <span className="sb-badge-dot" /> : null}
      {children}
    </span>
  )
}
