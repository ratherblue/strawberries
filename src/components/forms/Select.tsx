import { useId, type SelectHTMLAttributes } from 'react'
import { Icon } from '../core/Icon'
import { cx } from '../../lib/cx'

export interface SelectOption {
  value: string
  label: string
}

export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  size?: 'sm' | 'md' | 'lg'
  label?: string
  hint?: string
  error?: string | null
  options: Array<string | SelectOption>
  placeholder?: string
}

export function Select({
  label,
  hint,
  error,
  options,
  placeholder,
  id,
  size = 'md',
  className,
  ...rest
}: SelectProps) {
  const auto = useId()
  const fid = id ?? auto
  const hintId = fid + '-hint'
  const msg = error || hint
  const extra =
    placeholder && rest.value === undefined && rest.defaultValue === undefined
      ? { defaultValue: '' }
      : {}
  return (
    <div className={cx('sb-field', className)}>
      {label ? (
        <label className="sb-label" htmlFor={fid}>
          {label}
        </label>
      ) : null}
      <div className="sb-select-wrap">
        <select
          id={fid}
          className={cx('sb-input', 'sb-select', size, error && 'error')}
          aria-invalid={error ? true : undefined}
          aria-describedby={msg ? hintId : undefined}
          {...extra}
          {...rest}
        >
          {placeholder ? (
            <option value="" disabled>
              {placeholder}
            </option>
          ) : null}
          {options.map((o) => {
            const v = typeof o === 'string' ? o : o.value
            const l = typeof o === 'string' ? o : o.label
            return (
              <option key={v} value={v}>
                {l}
              </option>
            )
          })}
        </select>
        <Icon name="chevron-down" size={16} className="sb-select-chev" />
      </div>
      {msg ? (
        <span id={hintId} className={cx('sb-hint', error && 'error')}>
          {msg}
        </span>
      ) : null}
    </div>
  )
}
