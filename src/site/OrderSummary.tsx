import type { ReactNode } from 'react';
import { Card } from '../components';
import { FREE_DELIVERY_AT, money, totals, type Frequency, type Line } from '../lib/money';
import { cx } from '../lib/cx';
import s from './OrderSummary.module.scss';

interface Props {
  lines: Line[];
  freq: Frequency;
  /** Also list the line items (used at checkout) */
  compact?: boolean;
  children?: ReactNode;
}

export function OrderSummary({ lines, freq, compact = false, children }: Props) {
  const t = totals(lines, freq);
  const toFree = Math.max(0, FREE_DELIVERY_AT - (t.subtotal - t.discount));
  return (
    <Card stripes="berry-gingham" padding={22}>
      <h2 className={s.title}>Order summary</h2>
      {compact ? (
        <ul className={s.items}>
          {lines.map((l) => (
            <li key={l.id}><span>{l.qty} × {l.name}</span><span className="mono">{money(l.qty * l.price)}</span></li>
          ))}
        </ul>
      ) : null}
      <dl className={s.rows}>
        <div className={s.row}><dt>Subtotal</dt><dd>{money(t.subtotal)}</dd></div>
        {t.discount ? <div className={cx(s.row, s.saving)}><dt>Weekly saving (10%)</dt><dd>−{money(t.discount)}</dd></div> : null}
        <div className={s.row}><dt>Delivery</dt><dd>{t.delivery ? money(t.delivery) : 'Free'}</dd></div>
      </dl>
      {toFree > 0 && t.subtotal > 0 ? <div className={s.nudge}>Add {money(toFree)} more for free delivery.</div> : null}
      <div className={s.totalWrap}>
        <div className={cx(s.row, s.total)}><span>Total</span><span>{money(t.total)}</span></div>
        {freq === 'weekly' ? <div className={s.note}>Charged each week. Pause any time.</div> : null}
      </div>
      {children}
    </Card>
  );
}
