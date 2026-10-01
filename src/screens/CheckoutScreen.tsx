import { useMemo, useState, type ChangeEvent, type FormEvent, type ReactNode } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Badge, Button, Checkbox, Input, Select, Subheader } from '../components'
import { money, totals } from '../lib/money'
import { addDays, toISODate } from '../lib/dates'
import { useStore, type CheckoutDetails } from '../state/store'
import { OrderSummary } from '../site/OrderSummary'
import { usePageTitle } from '../lib/usePageTitle'
import { EmptyBasket } from './CartScreen'
import s from './CheckoutScreen.module.scss'

const STATES =
  'AL AK AZ AR CA CO CT DE DC FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI WY'.split(
    ' ',
  )

type TextField =
  | 'email'
  | 'name'
  | 'address'
  | 'apt'
  | 'city'
  | 'state'
  | 'zip'
  | 'date'
  | 'note'
  | 'card'
  | 'exp'
  | 'cvc'
type Form = Record<TextField, string>
type Errors = Partial<Record<TextField, string>>

const REQUIRED: Partial<Record<TextField, string>> = {
  email: 'We need this to send your receipt.',
  name: 'Who are these berries for?',
  address: 'Where should we leave them?',
  city: 'Which city?',
  state: 'Pick a state.',
  zip: 'We need a ZIP code.',
  date: 'Pick a delivery day.',
  card: 'Card number, please.',
  exp: 'MM / YY',
  cvc: '3 digits on the back.',
}
/** Field order on the page, so we can focus the first problem. */
const ORDER: TextField[] = [
  'email',
  'name',
  'address',
  'city',
  'state',
  'zip',
  'date',
  'card',
  'exp',
  'cvc',
]

const formatCard = (v: string) =>
  v
    .replace(/\D/g, '')
    .slice(0, 19)
    .replace(/(\d{4})(?=\d)/g, '$1 ')
const formatExp = (v: string) => {
  const d = v.replace(/\D/g, '').slice(0, 4)
  return d.length > 2 ? `${d.slice(0, 2)} / ${d.slice(2)}` : d
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className={s.section}>
      <Subheader size="sm" as="h2">
        {title}
      </Subheader>
      <div className={s.grid}>{children}</div>
    </section>
  )
}

export function CheckoutScreen() {
  usePageTitle('Checkout')
  const { lines, frequency, placeOrder } = useStore()
  const navigate = useNavigate()
  const tomorrow = useMemo(() => toISODate(addDays(new Date(), 1)), [])
  const [f, setF] = useState<Form>({
    email: '',
    name: '',
    address: '',
    apt: '',
    city: '',
    state: '',
    zip: '',
    date: tomorrow,
    note: '',
    card: '',
    exp: '',
    cvc: '',
  })
  const [errors, setErrors] = useState<Errors>({})
  const [gift, setGift] = useState(false)
  const [textMe, setTextMe] = useState(true)

  if (!lines.length) return <EmptyBasket />

  const set =
    (k: TextField, fmt?: (v: string) => string) =>
    (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      const v = fmt ? fmt(e.target.value) : e.target.value
      setF((x) => ({ ...x, [k]: v }))
      if (errors[k]) setErrors((x) => ({ ...x, [k]: undefined }))
    }
  const field = (k: TextField) => ({ id: 'co-' + k, value: f[k], error: errors[k] })

  const submit = (e: FormEvent) => {
    e.preventDefault()
    const err: Errors = {}
    ;(Object.keys(REQUIRED) as TextField[]).forEach((k) => {
      if (!f[k].trim()) err[k] = REQUIRED[k]
    })
    if (f.email && !/.+@.+\..+/.test(f.email)) err.email = "That doesn't look quite right."
    if (f.zip && !/^\d{5}(-\d{4})?$/.test(f.zip.trim())) err.zip = '5 digits, like 97205.'
    if (f.date && f.date < tomorrow) err.date = "We need a day's notice to pick them."
    setErrors(err)
    const first = ORDER.find((k) => err[k])
    if (first) {
      document.getElementById('co-' + first)?.focus()
      return
    }
    const details: CheckoutDetails = { ...f, gift, textMe }
    const order = placeOrder(details)
    navigate('/order/' + order.id, { replace: true })
  }

  const total = money(totals(lines, frequency).total)

  return (
    <div className="container page">
      <Link to="/basket" className="back-link">
        ← Back to basket
      </Link>
      <h1 className={'page-title ' + s.title}>Checkout</h1>
      <form className={s.layout} onSubmit={submit} noValidate>
        <div>
          <Section title="Contact">
            <Input
              {...field('email')}
              className={s.full}
              size="lg"
              label="Email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              onChange={set('email')}
            />
            <Checkbox
              className={s.full}
              label="Text me when it ships"
              checked={textMe}
              onChange={(e) => setTextMe(e.target.checked)}
            />
          </Section>

          <Section title="Delivery">
            <Input
              {...field('name')}
              className={s.full}
              size="lg"
              label="Full name"
              placeholder="Pip Hartley"
              autoComplete="name"
              onChange={set('name')}
            />
            <Input
              {...field('address')}
              className={s.full}
              size="lg"
              label="Street address"
              placeholder="1428 Orchard Lane"
              autoComplete="address-line1"
              onChange={set('address')}
            />
            <Input
              {...field('apt')}
              className={s.full}
              size="lg"
              label="Apt, suite, etc. (optional)"
              placeholder="Apt 2B"
              autoComplete="address-line2"
              onChange={set('apt')}
            />
            <div className={s.full + ' ' + s.triple}>
              <Input
                {...field('city')}
                size="lg"
                label="City"
                placeholder="Portland"
                autoComplete="address-level2"
                onChange={set('city')}
              />
              <Select
                {...field('state')}
                size="lg"
                label="State"
                placeholder="—"
                options={STATES}
                autoComplete="address-level1"
                onChange={set('state')}
              />
              <Input
                {...field('zip')}
                size="lg"
                label="ZIP code"
                placeholder="97205"
                inputMode="numeric"
                autoComplete="postal-code"
                onChange={set('zip')}
              />
            </div>
            <Input
              {...field('date')}
              size="lg"
              type="date"
              label="Delivery day"
              min={tomorrow}
              hint="Picked the morning it ships."
              onChange={set('date')}
            />
            <div className={s.spacer} />
            <Checkbox
              className={s.full}
              label="It's a gift — hide the prices"
              checked={gift}
              onChange={(e) => setGift(e.target.checked)}
            />
            <Input
              {...field('note')}
              className={s.full}
              size="lg"
              label="A note for the picker (optional)"
              multiline
              rows={3}
              placeholder="Leave by the blue gate, please."
              onChange={set('note')}
            />
          </Section>

          <Section title="Payment">
            <div className={s.full + ' ' + s.demo}>
              <Badge tone="sun">Demo store</Badge>
              <span>
                Nothing is charged. Please don't use a real card; any made-up numbers will do.
              </span>
            </div>
            <div className={s.full + ' ' + s.triple}>
              <Input
                {...field('card')}
                size="lg"
                label="Card number"
                placeholder="1234 5678 9012 3456"
                inputMode="numeric"
                autoComplete="off"
                onChange={set('card', formatCard)}
              />
              <Input
                {...field('exp')}
                size="lg"
                label="Expiry"
                placeholder="MM / YY"
                inputMode="numeric"
                autoComplete="off"
                onChange={set('exp', formatExp)}
              />
              <Input
                {...field('cvc')}
                size="lg"
                label="CVC"
                placeholder="123"
                inputMode="numeric"
                autoComplete="off"
                maxLength={4}
                onChange={set('cvc', (v) => v.replace(/\D/g, ''))}
              />
            </div>
          </Section>
        </div>

        <aside className={s.aside} aria-label="Order summary">
          <OrderSummary lines={lines} freq={frequency} compact>
            <Button type="submit" variant="berry" size="lg" block icon="lock">
              Place order · {total}
            </Button>
            <p className={s.note}>
              {frequency === 'weekly'
                ? 'Weekly box — pause or cancel any time.'
                : 'One-off order. No subscription.'}
            </p>
          </OrderSummary>
        </aside>
      </form>
    </div>
  )
}
