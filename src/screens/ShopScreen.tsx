import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Subheader, Tabs, Tag } from '../components'
import { PRODUCTS, type ProductKind } from '../data/products'
import { BoxCard } from '../site/BoxCard'
import { usePageTitle } from '../lib/usePageTitle'
import s from './ShopScreen.module.scss'

type KindFilter = 'all' | ProductKind
const KINDS: Array<{ id: KindFilter; label: string }> = [
  { id: 'all', label: 'All' },
  { id: 'box', label: 'Boxes' },
  { id: 'jam', label: 'Jam' },
  { id: 'gift', label: 'Gifts' },
]
/** Only "Under $15" filters for now — the others are waiting on product data. */
const FILTERS = ['Under $15', 'Organic', 'Plastic-free', 'Next-day'] as const

const countOf = (k: KindFilter) => PRODUCTS.filter((b) => k === 'all' || b.kind === k).length

export function ShopScreen() {
  usePageTitle('Shop')
  const [params, setParams] = useSearchParams()
  const raw = params.get('kind')
  const kind: KindFilter = KINDS.some((k) => k.id === raw) ? (raw as KindFilter) : 'all'
  const [filters, setFilters] = useState<string[]>([])

  const setKind = (k: KindFilter) =>
    setParams(k === 'all' ? {} : { kind: k }, { replace: true, preventScrollReset: true })
  const toggle = (f: string) =>
    setFilters((v) => (v.includes(f) ? v.filter((x) => x !== f) : [...v, f]))

  let list = PRODUCTS.filter((b) => kind === 'all' || b.kind === kind)
  if (filters.includes('Under $15')) list = list.filter((b) => b.price < 15)

  return (
    <div className="page">
      <Subheader variant="eyebrow">The shop</Subheader>
      <h1 className={'page-title ' + s.title}>Everything from the field</h1>
      <div className={s.tabsWrap}>
        <Tabs
          aria-label="Product type"
          value={kind}
          onChange={setKind}
          items={KINDS.map((k) => ({ ...k, count: countOf(k.id) }))}
        />
      </div>
      <div className={s.filters} role="group" aria-label="Filters">
        {FILTERS.map((f) => (
          <Tag key={f} selected={filters.includes(f)} onClick={() => toggle(f)}>
            {f}
          </Tag>
        ))}
      </div>
      <p className="visually-hidden" aria-live="polite">
        {list.length} {list.length === 1 ? 'product' : 'products'} shown
      </p>
      {list.length ? (
        <div className={s.grid}>
          {list.map((b) => (
            <BoxCard key={b.id} box={b} />
          ))}
        </div>
      ) : (
        <p className="muted">Nothing here yet — the field's still growing.</p>
      )}
    </div>
  )
}
