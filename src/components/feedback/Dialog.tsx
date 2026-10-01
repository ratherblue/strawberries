import { useEffect, useRef, type ReactNode } from 'react'
import { IconButton } from '../core/IconButton'
import type { CardStripes } from '../display/Card'
import clsx from 'clsx'

export interface DialogProps {
  open: boolean
  onClose?: () => void
  title: ReactNode
  children?: ReactNode
  /** Footer buttons, right-aligned */
  actions?: ReactNode
  /** Pattern band at the top; false to hide */
  stripes?: false | CardStripes
  /** Max width in px. Default 440 */
  width?: number
  inline?: boolean
}

export function Dialog({
  open,
  onClose,
  title,
  children,
  actions,
  stripes = 'berry',
  width = 440,
  inline = false,
}: DialogProps) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!open) return
    const prev = document.activeElement as HTMLElement | null
    ref.current?.focus()
    const k = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose?.()
    }
    window.addEventListener('keydown', k)
    return () => {
      window.removeEventListener('keydown', k)
      prev?.focus()
    }
  }, [open, onClose])
  if (!open) return null
  return (
    <div
      className={clsx('sb-dialog-overlay', inline && 'inline')}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose?.()
      }}
    >
      <div
        ref={ref}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label={typeof title === 'string' ? title : undefined}
        className="sb-dialog"
        style={{ maxWidth: width, outline: 'none' }}
      >
        {stripes ? <div className={'sb-dialog-stripes sb-pattern ' + stripes} /> : null}
        <div className="sb-dialog-head">
          <h2 className="sb-dialog-title">{title}</h2>
          {onClose ? (
            <IconButton icon="x" label="Close" variant="ghost" size="sm" onClick={onClose} />
          ) : null}
        </div>
        <div className="sb-dialog-body">{children}</div>
        {actions ? <div className="sb-dialog-actions">{actions}</div> : null}
      </div>
    </div>
  )
}
