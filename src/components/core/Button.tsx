import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Icon, type IconName } from './Icon'
import { cx } from '../../lib/cx'

type Variant = 'primary' | 'berry' | 'secondary' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

interface BaseProps {
  /** primary = plum, berry = strawberry red, secondary = outlined, ghost = text only */
  variant?: Variant
  size?: Size
  /** Icon before the label */
  icon?: IconName
  /** Icon after the label */
  iconRight?: IconName
  /** Stretch to the container width */
  block?: boolean
  className?: string
  children?: ReactNode
}

type AsButton = BaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { to?: undefined; href?: undefined }
type AsRouterLink = BaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & { to: string; href?: undefined }
type AsAnchor = BaseProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string; to?: undefined }

export type ButtonProps = AsButton | AsRouterLink | AsAnchor

export function Button(props: ButtonProps) {
  const {
    variant = 'primary',
    size = 'md',
    icon,
    iconRight,
    block,
    className,
    children,
    ...rest
  } = props
  const cls = cx('sb-btn', variant, size, block && 'block', className)
  const s = size === 'sm' ? 16 : size === 'lg' ? 20 : 18
  const inner = (
    <>
      {icon ? <Icon name={icon} size={s} /> : null}
      {children}
      {iconRight ? <Icon name={iconRight} size={s} /> : null}
    </>
  )
  if ('to' in rest && rest.to !== undefined) {
    const { to, ...a } = rest as AsRouterLink
    return (
      <Link to={to} className={cls} {...a}>
        {inner}
      </Link>
    )
  }
  if ('href' in rest && rest.href !== undefined) {
    return (
      <a className={cls} {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {inner}
      </a>
    )
  }
  const b = rest as ButtonHTMLAttributes<HTMLButtonElement>
  return (
    <button type="button" className={cls} {...b}>
      {inner}
    </button>
  )
}
