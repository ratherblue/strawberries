import { Link, useNavigate } from 'react-router-dom'
import { Card, Subheader } from '../components'
import { Photo } from '../site/Photo'
import { usePageTitle } from '../lib/usePageTitle'
import s from './FieldScreen.module.scss'

export function FieldScreen() {
  usePageTitle('Our field')
  const navigate = useNavigate()
  return (
    <div className="page">
      <Subheader variant="eyebrow">Our field</Subheader>
      <h1 className="page-title">Seven acres, one very old tractor.</h1>
      <p className="lead">
        We grow Elsanta, Malling Centenary and a few rows of wild alpines we mostly eat ourselves.
        No sprays after flowering, and everything's picked by hand.
      </p>
      <Photo label="the field at golden hour" tone="leaf" radius={26} className={s.photo} />
      <div className={s.cards}>
        <Card variant="tinted" interactive keyboard={false} onClick={() => navigate('/pick')}>
          <Subheader size="sm" as="h2">
            Pick-your-own
          </Subheader>
          <p className={s.copy}>
            Saturdays, 9 till 4, June to mid-October. Bring a hat.{' '}
            <Link to="/pick">Book a slot</Link>
          </p>
        </Card>
        <Card variant="leaf" interactive keyboard={false} onClick={() => navigate('/farm-shop')}>
          <Subheader size="sm" as="h2">
            Visit the farm shop
          </Subheader>
          <p className={s.copy}>
            Jam, cream, scones and very good lemonade. <Link to="/farm-shop">Plan a visit</Link>
          </p>
        </Card>
      </div>
    </div>
  )
}
