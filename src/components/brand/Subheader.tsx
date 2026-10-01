import type { HTMLAttributes, ReactNode } from 'react'
import { Strawberry } from './Strawberry'
import clsx from 'clsx'

export interface SubheaderProps extends HTMLAttributes<HTMLElement> {
  /** Element to render. Default h3 (heading) / p (eyebrow) */
  as?: 'h2' | 'h3' | 'h4' | 'p' | 'div'
  size?: 'sm' | 'md' | 'lg'
  /** heading = Libre Caslon plum; eyebrow = small mono caps in berry */
  variant?: 'heading' | 'eyebrow'
  /** Strawberry rotation. Default -12 */
  tilt?: number
  /** Show the strawberry. Default true */
  berry?: boolean
  children?: ReactNode
}

export function Subheader({
  as,
  size = 'md',
  variant = 'heading',
  tilt = -12,
  berry = true,
  className,
  children,
  ...rest
}: SubheaderProps) {
  const El = as ?? (variant === 'eyebrow' ? 'p' : 'h3')
  const bs = variant === 'eyebrow' ? 16 : { sm: 18, md: 24, lg: 30 }[size]
  return (
    <El className={clsx('sb-subheader', variant, size, className)} {...rest}>
      {berry ? <Strawberry size={bs} tilt={tilt} /> : null}
      <span>{children}</span>
    </El>
  )
}
