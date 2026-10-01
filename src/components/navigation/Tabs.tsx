import { useState, type ReactNode } from 'react'
import clsx from 'clsx'

export interface TabItem<T extends string = string> {
  id: T
  label: ReactNode
  count?: number
}

export interface TabsProps<T extends string = string> {
  items: TabItem<T>[]
  value?: T
  defaultValue?: T
  onChange?: (id: T) => void
  /** underline = solid berry indicator; pill = segmented */
  variant?: 'underline' | 'pill'
  className?: string
  'aria-label'?: string
}

export function Tabs<T extends string = string>({
  items,
  value,
  defaultValue,
  onChange,
  variant = 'underline',
  className,
  ...rest
}: TabsProps<T>) {
  const [inner, setInner] = useState<T | undefined>(defaultValue ?? items[0]?.id)
  const cur = value ?? inner
  return (
    <div
      role="tablist"
      aria-label={rest['aria-label']}
      className={clsx('sb-tabs', variant, className)}
    >
      {items.map((it) => (
        <button
          key={it.id}
          type="button"
          role="tab"
          aria-selected={cur === it.id}
          className={clsx('sb-tab', cur === it.id && 'is-active')}
          onClick={() => {
            setInner(it.id)
            onChange?.(it.id)
          }}
        >
          {it.label}
          {it.count != null ? <span className="sb-tab-count">{it.count}</span> : null}
        </button>
      ))}
    </div>
  )
}
