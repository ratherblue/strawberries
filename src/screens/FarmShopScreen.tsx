import { Link } from 'react-router-dom'
import { Badge, Button, Card, Subheader } from '../components'
import type { Tone } from '../data/products'
import { Photo } from '../site/Photo'
import { usePageTitle } from '../lib/usePageTitle'
import { cx } from '../lib/cx'
import s from './FarmShopScreen.module.scss'

const HOURS = [
  ['Monday', 'Closed'],
  ['Tue – Fri', '10am – 5pm'],
  ['Saturday', '8am – 5pm'],
  ['Sunday', '10am – 3pm'],
] as const
/** Placeholder: highlight a fixed row until real opening-hours logic exists. */
const TODAY = 'Tue – Fri'
const SHELF: Array<[string, string, string, Tone]> = [
  ['Field jam', '$6 a jar', 'Just berries, sugar and lemon.', 'plum'],
  ['Scones', '$3.50 each', 'Baked every morning. Gone by noon.', 'berry'],
  ['Pink lemonade', '$4 a cup', 'Squeezed to order, strawberry-sweet.', 'leaf'],
  ['Clotted cream', '$7 a tub', 'From the dairy down the road.', 'berry'],
]

export function FarmShopScreen() {
  usePageTitle('Farm shop')
  return (
    <div className="page">
      <Link to="/field" className="back-link">
        ← Our field
      </Link>
      <Subheader variant="eyebrow">The farm shop</Subheader>
      <div className={s.intro}>
        <div>
          <h1 className={'page-title ' + s.title}>A little shed with very good lemonade.</h1>
          <p className={s.lead}>
            Pop in for jam, scones and whatever came off the field this morning. There's a bench out
            front and usually a cat on it.
          </p>
        </div>
        <div className={s.call}>
          <Button size="lg" variant="secondary" icon="phone" href="tel:+15415550137">
            (541) 555-0137
          </Button>
        </div>
      </div>
      <Photo label="the farm shop porch" tone="leaf" radius={26} className={s.photo} />

      <div className={s.cards}>
        <Card padding={28}>
          <Subheader size="md" as="h2">
            Opening hours
          </Subheader>
          <dl className={s.hours}>
            {HOURS.map(([d, h]) => (
              <div key={d} className={cx(s.hourRow, d === TODAY && s.today)}>
                <dt className={s.day}>
                  {d}
                  {d === TODAY ? (
                    <Badge tone="leaf" dot>
                      Open now
                    </Badge>
                  ) : null}
                </dt>
                <dd className={cx(s.time, h === 'Closed' && s.closed)}>{h}</dd>
              </div>
            ))}
          </dl>
          <p className={s.small}>Hours stretch a little in June. Check our postcard for news.</p>
        </Card>
        <Card padding={28} id="finding-us" className={s.anchor}>
          <Subheader size="md" as="h2">
            Finding us
          </Subheader>
          <div className={s.map}>
            <Photo label="map" tone="plum" height={150} radius={0} />
          </div>
          <address className={s.address}>
            Strawberries Farm Shop
            <br />
            2140 Orchard Road
            <br />
            Hood River, OR 97031
          </address>
          <p className={s.parking}>
            Free parking by the red barn. Follow the hand-painted berry signs from Route 35.
          </p>
        </Card>
      </div>

      <section className={s.shelves} aria-labelledby="shelves-heading">
        <div className={s.shelvesHead}>
          <Subheader size="lg" as="h2" id="shelves-heading">
            On the shelves
          </Subheader>
          <Link to="/shop" className="link-strong">
            Or order online
          </Link>
        </div>
        <ul className={s.shelf}>
          {SHELF.map(([n, p, d, t]) => (
            <li key={n}>
              <Photo label={n.toLowerCase()} tone={t} height={160} radius={14} />
              <div className={s.itemHead}>
                <span className={s.itemName}>{n}</span>
                <span className={s.itemPrice}>{p}</span>
              </div>
              <div className={s.itemDesc}>{d}</div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
