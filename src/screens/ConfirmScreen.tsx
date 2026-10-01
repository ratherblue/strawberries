import { useParams } from 'react-router-dom'
import { Button, Card, Strawberry } from '../components'
import { useStore } from '../state/store'
import { formatLongDate } from '../lib/dates'
import { usePageTitle } from '../lib/usePageTitle'
import s from './ConfirmScreen.module.scss'

export function ConfirmScreen() {
  const { id } = useParams()
  const { lastOrder: order } = useStore()
  usePageTitle(order && order.id === id ? 'Order confirmed' : 'Order not found')

  if (!order || order.id !== id) {
    return (
      <div className={s.wrap}>
        <Strawberry size={72} tilt={-12} className={s.berry} />
        <h1 className={s.title}>We can't find that order.</h1>
        <p className={s.copy}>
          It may have been placed in another browser. If you're worried, give the farm shop a ring
          and we'll sort it out.
        </p>
        <Button to="/">Back to the field</Button>
      </div>
    )
  }

  const to =
    [order.name, order.address, order.apt, order.city].filter(Boolean).join(', ') +
    `, ${order.state} ${order.zip}`
  return (
    <div className={s.wrap}>
      <Strawberry size={72} tilt={-12} className={s.berry} />
      <h1 className={s.title}>Lovely — it's on its way.</h1>
      <p className={s.copy}>
        We'll pick your berries at dawn on <strong>{formatLongDate(order.date)}</strong> and have
        them with you by tea-time. Keep an eye out for a text from Pip.
      </p>
      <Card variant="tinted" padding={20} className={s.card}>
        <dl className={s.details}>
          <dt>Order</dt>
          <dd className="mono">{order.id}</dd>
          <dt>To</dt>
          <dd>{to}</dd>
          <dt>Total</dt>
          <dd className="mono">
            {order.total}
            {order.frequency === 'weekly' ? ' each week' : ''}
          </dd>
        </dl>
      </Card>
      <Button to="/">Back to the field</Button>
    </div>
  )
}
