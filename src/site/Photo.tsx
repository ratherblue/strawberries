import type { CSSProperties, ReactNode } from 'react'
import type { Tone } from '../data/products'
import { cx } from '../lib/cx'
import s from './Photo.module.scss'

interface PhotoProps {
  /** What the real photo will show — printed on the placeholder */
  label: string
  tone?: Tone
  /** Fixed height in px. Leave out to size it in CSS via `--photo-h` (e.g. per breakpoint). */
  height?: number
  radius?: number
  className?: string
  children?: ReactNode
}

/** Striped placeholder until real photography arrives. */
export function Photo({
  label,
  tone = 'berry',
  height,
  radius = 14,
  className,
  children,
}: PhotoProps) {
  const style = {
    ...(height != null && { '--photo-h': height + 'px' }),
    '--photo-r': radius + 'px',
  } as CSSProperties
  return (
    <div
      className={cx(s.photo, s[tone], className)}
      style={style}
      role="img"
      aria-label={label ? 'Photo: ' + label : undefined}
      aria-hidden={label ? undefined : true}
    >
      {label ? (
        <span className={s.label} aria-hidden="true">
          photo · {label}
        </span>
      ) : null}
      {children}
    </div>
  )
}
