import { useId, type InputHTMLAttributes, type TextareaHTMLAttributes } from 'react'
import clsx from 'clsx'

type Size = 'sm' | 'md' | 'lg'

interface FieldProps {
  /** Height matches Button: sm 24px · md 30px · lg 36px. Default md */
  size?: Size
  label?: string
  /** Helper text below the field */
  hint?: string
  /** Error message — replaces hint and turns the border berry */
  error?: string | null
  className?: string
}

export type InputProps =
  | (FieldProps & Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> & { multiline?: false })
  | (FieldProps & Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'> & { multiline: true })

export function Input({
  label,
  hint,
  error,
  id,
  multiline = false,
  size = 'md',
  className,
  ...rest
}: InputProps) {
  const auto = useId()
  const fid = id ?? auto
  const hintId = fid + '-hint'
  const msg = error || hint
  const cls = clsx('sb-input', size, multiline && 'multi', error && 'error')
  const shared = {
    id: fid,
    className: cls,
    'aria-invalid': error ? true : undefined,
    'aria-describedby': msg ? hintId : undefined,
  }
  return (
    <div className={clsx('sb-field', className)}>
      {label ? (
        <label className="sb-label" htmlFor={fid}>
          {label}
        </label>
      ) : null}
      {multiline ? (
        <textarea {...shared} {...(rest as TextareaHTMLAttributes<HTMLTextAreaElement>)} />
      ) : (
        <input {...shared} {...(rest as InputHTMLAttributes<HTMLInputElement>)} />
      )}
      {msg ? (
        <span id={hintId} className={clsx('sb-hint', error && 'error')}>
          {msg}
        </span>
      ) : null}
    </div>
  )
}
