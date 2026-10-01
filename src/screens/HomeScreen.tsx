import { Link } from 'react-router-dom'
import { Badge, Button, Strawberry, Stripes, Subheader } from '../components'
import { PRODUCTS } from '../data/products'
import { BoxCard } from '../site/BoxCard'
import { Photo } from '../site/Photo'
import { usePageTitle } from '../lib/usePageTitle'
import { cx } from '../lib/cx'
import s from './HomeScreen.module.scss'

const STEPS = [
  ['01', 'We pick', 'Every box is picked the morning it ships. Never cold-stored.'],
  ['02', 'We pack', 'Paper punnets, straw padding, zero plastic. Very tidy.'],
  ['03', 'You eat', 'Straight from the box is fine. Over ice cream is better.'],
] as const

function Hero() {
  return (
    <section className={cx('container', s.hero)}>
      <div>
        <Subheader variant="eyebrow">Picked at dawn · on your doorstep by tea</Subheader>
        <h1 className={s.heroTitle}>Sun-warm strawberries, straight from the field.</h1>
        <p className={s.heroLead}>
          We pick them the morning they ship, pack them in paper, and send them your way. That's the
          whole plan.
        </p>
        <div className={s.heroActions}>
          <Button variant="berry" icon="shopping-basket" to="/shop">
            Get a box
          </Button>
          <Button variant="ghost" iconRight="arrow-right" to="/field">
            Meet the field
          </Button>
        </div>
      </div>
      <div className={s.heroMedia}>
        <Photo label="berries in a paper punnet" radius={26} className={s.heroPhoto} />
        <div className={s.sticker}>
          <Strawberry size={34} tilt={-12} />
          <div>
            <div className={s.stickerTitle}>Picked 6:40am</div>
            <div className={s.stickerSub}>Field no. 7, row 12</div>
          </div>
        </div>
        <Badge tone="leaf" dot className={s.season}>
          In season until Oct
        </Badge>
      </div>
    </section>
  )
}

export function HomeScreen() {
  usePageTitle()
  return (
    <>
      <Hero />
      <div className="container">
        <Stripes variant="candy" className={s.candy} />
      </div>

      <section className={cx('container', s.fresh)} aria-labelledby="fresh-heading">
        <div className={s.freshHead}>
          <div>
            <Subheader size="lg" as="h2" id="fresh-heading">
              Fresh this week
            </Subheader>
            <p className={s.freshSub}>Three boxes, one field, zero fuss.</p>
          </div>
          <Link to="/shop" className="link-strong">
            See everything
          </Link>
        </div>
        <div className={s.grid}>
          {PRODUCTS.slice(0, 3).map((b) => (
            <BoxCard key={b.id} box={b} />
          ))}
        </div>
      </section>

      <section className={s.how} aria-labelledby="how-heading">
        <div className={cx('container', s.howInner)}>
          <div>
            <Subheader size="lg" as="h2" id="how-heading">
              How it works
            </Subheader>
            <p className={s.howCopy}>
              Weekly, fortnightly, or just once. Pause any time — we'll save your row.
            </p>
            <Button variant="primary" to="/shop">
              Start a box
            </Button>
          </div>
          <ol className={s.steps}>
            {STEPS.map(([n, t, d]) => (
              <li key={n} className={s.step}>
                <div className={s.stepNum} aria-hidden="true">
                  {n}
                </div>
                <h3 className={s.stepTitle}>{t}</h3>
                <p className={s.stepCopy}>{d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  )
}
