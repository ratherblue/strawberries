import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { IconButton } from '../components'
import { useStore } from '../state/store'
import { cx } from '../lib/cx'
import { NAV } from './nav'
import s from './Header.module.scss'

export function Header() {
  const { count } = useStore()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)

  // Close the mobile menu whenever the route changes or the viewport grows.
  useEffect(() => setOpen(false), [pathname])
  useEffect(() => {
    const mq = window.matchMedia(`(min-width: ${s.desktopMin})`)
    const close = () => mq.matches && setOpen(false)
    mq.addEventListener('change', close)
    return () => mq.removeEventListener('change', close)
  }, [])
  useEffect(() => {
    if (!open) return
    const k = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', k)
    return () => window.removeEventListener('keydown', k)
  }, [open])

  const basketLabel = count ? `Basket, ${count} ${count === 1 ? 'item' : 'items'}` : 'Basket'

  return (
    <header className={s.header}>
      <div className={s.bar}>
        <Link to="/" className={s.wordmark}>
          Strawberries
        </Link>
        <nav className={s.nav} aria-label="Main">
          {NAV.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              end={n.to === '/'}
              className={({ isActive }) => cx(s.link, isActive && s.active)}
            >
              {n.label}
            </NavLink>
          ))}
        </nav>
        <div className={s.actions}>
          <IconButton
            icon="search"
            label="Search the shop"
            variant="ghost"
            onClick={() => navigate('/shop')}
          />
          <div className={s.basket}>
            <IconButton
              icon="shopping-basket"
              label={basketLabel}
              variant="solid"
              onClick={() => navigate('/basket')}
            />
            {count > 0 ? (
              <span key={count} className={s.count} aria-hidden="true">
                {count}
              </span>
            ) : null}
          </div>
          <IconButton
            className={s.menuBtn}
            icon={open ? 'x' : 'menu'}
            label={open ? 'Close menu' : 'Open menu'}
            variant="ghost"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((o) => !o)}
          />
        </div>
      </div>
      <nav
        id="mobile-nav"
        className={cx(s.mobileNav, open && s.mobileOpen)}
        aria-label="Main"
        hidden={!open}
      >
        {NAV.map((n) => (
          <NavLink
            key={n.to}
            to={n.to}
            end={n.to === '/'}
            className={({ isActive }) => cx(s.mobileLink, isActive && s.mobileActive)}
          >
            {n.label}
          </NavLink>
        ))}
      </nav>
    </header>
  )
}
