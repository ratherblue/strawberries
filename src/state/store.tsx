import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { PRODUCTS, PRODUCTS_BY_ID, type Product } from '../data/products'
import { money, totals, type Frequency, type Line } from '../lib/money'
import { load, save } from '../lib/storage'

export interface CheckoutDetails {
  email: string
  name: string
  address: string
  apt: string
  city: string
  state: string
  zip: string
  date: string
  note: string
  gift: boolean
  textMe: boolean
}

export interface Order extends Pick<
  CheckoutDetails,
  'name' | 'address' | 'apt' | 'city' | 'state' | 'zip' | 'date'
> {
  id: string
  total: string
  frequency: Frequency
}

interface Store {
  basket: Record<string, number>
  lines: Line[]
  count: number
  add: (p: Product) => void
  setQty: (id: string, qty: number) => void
  frequency: Frequency
  setFrequency: (f: Frequency) => void
  favorites: string[]
  toggleFavorite: (id: string) => void
  toast: Product | null
  dismissToast: () => void
  lastOrder: Order | null
  placeOrder: (d: CheckoutDetails) => Order
}

const Ctx = createContext<Store | null>(null)
const TOAST_MS = 3200

export function StoreProvider({ children }: { children: ReactNode }) {
  const [basket, setBasket] = useState<Record<string, number>>(() => {
    const saved = load<Record<string, number>>('local', 'sb.basket', {})
    // Drop anything that's no longer in the catalogue.
    return Object.fromEntries(
      Object.entries(saved).filter(([id, q]) => PRODUCTS_BY_ID[id] && q > 0),
    )
  })
  const [frequency, setFrequency] = useState<Frequency>(() => load('local', 'sb.frequency', 'once'))
  const [favorites, setFavorites] = useState<string[]>(() => load('local', 'sb.favorites', []))
  const [lastOrder, setLastOrder] = useState<Order | null>(() =>
    load('session', 'sb.lastOrder', null),
  )
  const [toast, setToast] = useState<Product | null>(null)
  const timer = useRef<number>()

  useEffect(() => save('local', 'sb.basket', basket), [basket])
  useEffect(() => save('local', 'sb.frequency', frequency), [frequency])
  useEffect(() => save('local', 'sb.favorites', favorites), [favorites])
  useEffect(() => save('session', 'sb.lastOrder', lastOrder), [lastOrder])
  useEffect(() => () => window.clearTimeout(timer.current), [])

  const dismissToast = useCallback(() => {
    window.clearTimeout(timer.current)
    setToast(null)
  }, [])

  const add = useCallback((p: Product) => {
    setBasket((b) => ({ ...b, [p.id]: (b[p.id] ?? 0) + 1 }))
    setToast(p)
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setToast(null), TOAST_MS)
  }, [])

  const setQty = useCallback((id: string, qty: number) => {
    setBasket((b) => {
      const n = { ...b }
      if (qty <= 0) delete n[id]
      else n[id] = qty
      return n
    })
  }, [])

  const toggleFavorite = useCallback((id: string) => {
    setFavorites((f) => (f.includes(id) ? f.filter((x) => x !== id) : [...f, id]))
  }, [])

  const lines = useMemo<Line[]>(
    () => PRODUCTS.filter((p) => basket[p.id]).map((p) => ({ ...p, qty: basket[p.id] })),
    [basket],
  )
  const count = lines.reduce((s, l) => s + l.qty, 0)

  const placeOrder = useCallback(
    (d: CheckoutDetails) => {
      const order: Order = {
        id: 'SB-' + Math.floor(10000 + Math.random() * 89999),
        total: money(totals(lines, frequency).total),
        frequency,
        name: d.name.trim(),
        address: d.address.trim(),
        apt: d.apt.trim(),
        city: d.city.trim(),
        state: d.state,
        zip: d.zip.trim(),
        date: d.date,
      }
      setLastOrder(order)
      setBasket({})
      dismissToast()
      return order
    },
    [lines, frequency, dismissToast],
  )

  const value: Store = {
    basket,
    lines,
    count,
    add,
    setQty,
    frequency,
    setFrequency,
    favorites,
    toggleFavorite,
    toast,
    dismissToast,
    lastOrder,
    placeOrder,
  }
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useStore() {
  const s = useContext(Ctx)
  if (!s) throw new Error('useStore must be used inside <StoreProvider>')
  return s
}
