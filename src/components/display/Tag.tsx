import type { ReactNode } from 'react'
import { Icon, type IconName } from '../core/Icon'
import { cx } from '../../lib/cx'

export interface TagProps {
  /** Filled plum when selected */
  selected?: boolean
  icon?: IconName
  /** Makes the tag a toggle button */
  onClick?: () => void
  /** Shows a small × */
  onRemove?: () => void
  disabled?: boolean
  className?: string
  children?: ReactNode
}

export function Tag({
  selected = false,
  icon,
  onRemove,
  onClick,
  disabled,
  className,
  children,
}: TagProps) {
  const cls = cx(
    'sb-tag',
    selected && 'is-selected',
    onClick && !disabled && 'is-clickable',
    className,
  )
  const content = (
    <>
      {icon ? <Icon name={icon} size={15} /> : null}
      <span>{children}</span>
      {onRemove ? (
        <span
          role="button"
          tabIndex={0}
          aria-label="Remove"
          className="sb-tag-x"
          onClick={(e) => {
            e.stopPropagation()
            onRemove()
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              onRemove()
            }
          }}
        >
          <Icon name="x" size={13} />
        </span>
      ) : null}
    </>
  )
  if (onClick || disabled) {
    return (
      <button
        type="button"
        aria-pressed={selected}
        disabled={disabled}
        className={cls}
        onClick={onClick}
      >
        {content}
      </button>
    )
  }
  return <span className={cls}>{content}</span>
}
