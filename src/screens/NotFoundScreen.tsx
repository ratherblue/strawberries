import { Button, Strawberry } from '../components'
import { usePageTitle } from '../lib/usePageTitle'
import s from './ConfirmScreen.module.scss'

export function NotFoundScreen() {
  usePageTitle('Not found')
  return (
    <div className={s.wrap}>
      <Strawberry size={72} tilt={12} className={s.berry} />
      <h1 className={s.title}>This row's not planted yet.</h1>
      <p className={s.copy}>
        We looked up and down the field and couldn't find that page. Let's get you back to the
        berries.
      </p>
      <Button variant="berry" icon="shopping-basket" to="/shop">
        Go to the shop
      </Button>
    </div>
  )
}
