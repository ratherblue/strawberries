import { Link } from 'react-router-dom'
import { Badge, Button, IconButton, Radio, Strawberry, Subheader } from '../components'
import { money, type Frequency } from '../lib/money'
import { useStore } from '../state/store'
import { OrderSummary } from '../site/OrderSummary'
import { Photo } from '../site/Photo'
import { usePageTitle } from '../lib/usePageTitle'
import { cx } from '../lib/cx'
import s from './CartScreen.module.scss'

const FREQS: Array<[Frequency, string, string]> = [
  ['once', 'Just this once', 'Delivered this week, no strings.'],
  ['weekly', 'Every week', 'Save 10%. Skip or pause whenever.'],
]

export function EmptyBasket() {
  return (
    <div className={s.empty}>
      <Strawberry size={64} tilt={-12} className={s.emptyBerry} />
      <h1 className={s.emptyTitle}>Your basket's empty</h1>
      <p className={s.emptyCopy}>
        The strawberries are waiting. They're very patient, but not forever.
      </p>
      <Button variant="berry" icon="shopping-basket" to="/shop">
        Go to the shop
      </Button>
    </div>
  )
}

export function CartScreen() {
  usePageTitle('Basket')
  const { lines, setQty, frequency, setFrequency } = useStore()
  if (!lines.length) return <EmptyBasket />

  return (
    <div className="page">
      <Subheader variant="eyebrow">Your basket</Subheader>
      <h1 className={'page-title ' + s.title}>Nearly there.</h1>
      <div className={s.layout}>
        <div>
          <ul className={s.lines}>
            {lines.map((l) => (
              <li key={l.id} className={s.line}>
                <Photo label="" tone={l.tone} height={96} radius={0} className={s.thumb} />
                <div className={s.info}>
                  <div className={s.name}>{l.name}</div>
                  <div className={s.meta}>
                    {l.weight} · {money(l.price)} each
                  </div>
                  <button type="button" className={s.remove} onClick={() => setQty(l.id, 0)}>
                    Remove<span className="visually-hidden"> {l.name}</span>
                  </button>
                </div>
                <div className={s.stepper}>
                  <IconButton
                    icon="minus"
                    label={`One fewer ${l.name}`}
                    size="sm"
                    onClick={() => setQty(l.id, l.qty - 1)}
                  />
                  <span className={s.qty} aria-live="polite" aria-label={`${l.qty} in basket`}>
                    {l.qty}
                  </span>
                  <IconButton
                    icon="plus"
                    label={`One more ${l.name}`}
                    size="sm"
                    onClick={() => setQty(l.id, l.qty + 1)}
                  />
                </div>
                <div className={s.lineTotal}>{money(l.qty * l.price)}</div>
              </li>
            ))}
          </ul>

          <fieldset className={s.freq}>
            <legend>
              <Subheader size="sm" as="div">
                How often?
              </Subheader>
            </legend>
            <div className={s.options}>
              {FREQS.map(([v, t, d]) => (
                <label key={v} className={cx(s.option, frequency === v && s.optionOn)}>
                  <div className={s.optionHead}>
                    <Radio
                      name="freq"
                      value={v}
                      checked={frequency === v}
                      onChange={() => setFrequency(v)}
                      label={t}
                    />
                    {v === 'weekly' ? <Badge tone="leaf">Save 10%</Badge> : null}
                  </div>
                  <div className={s.optionCopy}>{d}</div>
                </label>
              ))}
            </div>
          </fieldset>
        </div>

        <aside aria-label="Order summary">
          <OrderSummary lines={lines} freq={frequency}>
            <Button variant="berry" size="lg" block iconRight="arrow-right" to="/checkout">
              Checkout
            </Button>
            <div className={s.keep}>
              <Link to="/shop">Keep browsing</Link>
            </div>
          </OrderSummary>
        </aside>
      </div>
    </div>
  )
}
