import { useEffect, useRef } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { Toast } from '../components'
import { useStore } from '../state/store'
import { Header } from './Header'
import { Footer } from './Footer'
import s from './Layout.module.scss'

/** Scroll to top on navigation (or to #hash targets), and move focus for screen-reader users. */
function useRouteScroll() {
  const { pathname, hash } = useLocation()
  const first = useRef(true)
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(decodeURIComponent(hash.slice(1)))
      if (el) {
        el.scrollIntoView({ block: 'start', behavior: 'instant' })
        return
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    if (first.current) {
      first.current = false
      return
    }
    document.getElementById('main')?.focus({ preventScroll: true })
  }, [pathname, hash])
}

export function Layout() {
  const { toast, dismissToast, basket } = useStore()
  const navigate = useNavigate()
  useRouteScroll()
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Header />
      <main id="main" tabIndex={-1} className={s.main}>
        <Outlet />
      </main>
      <Footer />
      <div className={s.toastHost} aria-live="polite">
        {toast ? (
          <Toast
            key={toast.id + (basket[toast.id] ?? 0)}
            title="Added to basket"
            action="View basket"
            onAction={() => {
              dismissToast()
              navigate('/basket')
            }}
            onClose={dismissToast}
          >
            {basket[toast.id] ?? 1} × {toast.name}
          </Toast>
        ) : null}
      </div>
    </>
  )
}
