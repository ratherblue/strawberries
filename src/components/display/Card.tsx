import type { HTMLAttributes, KeyboardEvent } from 'react'
import clsx from 'clsx'

export type CardStripes =
  | 'berry'
  | 'leaf'
  | 'plum'
  | 'berry-candy'
  | 'leaf-candy'
  | 'plum-candy'
  | 'berry-gingham'
  | 'leaf-gingham'
  | 'plum-gingham'
  | 'berry-plaid'
  | 'leaf-plaid'
  | 'plum-plaid'

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** default = white w/ soft shadow; outline = no shadow; tinted = berry wash; leaf = green wash */
  variant?: 'default' | 'outline' | 'tinted' | 'leaf'
  /** Hover lifts the card with a pink "sticker" offset shadow */
  interactive?: boolean
  /** Pattern band across the top */
  stripes?: CardStripes
  /** Inner padding (px). Default 24 */
  padding?: number | string
  /** Make a clickable interactive card focusable as a button. Turn off when the card holds its own buttons. Default true */
  keyboard?: boolean
}

export function Card({
  variant = 'default',
  interactive = false,
  stripes,
  padding = 24,
  keyboard = true,
  className,
  children,
  onClick,
  onKeyDown,
  ...rest
}: CardProps) {
  // Interactive cards are clickable as a whole, so make them reachable by keyboard too.
  const keyProps =
    interactive && onClick && keyboard
      ? {
          role: 'button' as const,
          tabIndex: 0,
          onKeyDown: (e: KeyboardEvent<HTMLDivElement>) => {
            onKeyDown?.(e)
            if (e.target !== e.currentTarget) return
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              e.currentTarget.click()
            }
          },
        }
      : { onKeyDown }
  return (
    <div
      className={clsx('sb-card', variant, interactive && 'interactive', className)}
      onClick={onClick}
      {...keyProps}
      {...rest}
    >
      {stripes ? <div className={'sb-card-stripes sb-pattern ' + stripes} /> : null}
      <div className="sb-card-body" style={{ padding }}>
        {children}
      </div>
    </div>
  )
}
