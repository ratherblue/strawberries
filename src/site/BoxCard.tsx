import { Badge, Button, Card, IconButton } from '../components';
import type { Product } from '../data/products';
import { money } from '../lib/money';
import { useStore } from '../state/store';
import { cx } from '../lib/cx';
import { Photo } from './Photo';
import s from './BoxCard.module.scss';

/** Clicking anywhere on the card adds it to the basket; the heart only toggles the favourite. */
export function BoxCard({ box }: { box: Product }) {
  const { add, favorites, toggleFavorite } = useStore();
  const fav = favorites.includes(box.id);
  return (
    <Card interactive keyboard={false} padding={0} onClick={() => add(box)} className={s.card}>
      <div className={s.media}>
        <Photo label={box.name.toLowerCase()} tone={box.tone} height={190} radius={12} />
        {box.badge ? <Badge tone={box.badge.tone} className={s.badge}>{box.badge.text}</Badge> : null}
        <IconButton
          icon="heart"
          label={fav ? `Remove ${box.name} from favourites` : `Save ${box.name}`}
          size="sm"
          aria-pressed={fav}
          className={cx(s.heart, fav && s.faved)}
          onClick={(e) => { e.stopPropagation(); toggleFavorite(box.id); }}
        />
      </div>
      <div className={s.body}>
        <div className={s.titleRow}>
          <h3 className={s.name}>{box.name}</h3>
          <span className={s.price}>{money(box.price)}</span>
        </div>
        <div className={s.weight}>{box.weight}</div>
        <p className={s.blurb}>{box.blurb}</p>
        {/* Mouse clicks bubble to the card; this button is the keyboard / screen-reader way in. */}
        <Button variant="secondary" icon="plus" aria-label={`Add ${box.name} to basket`}>Add to basket</Button>
      </div>
    </Card>
  );
}
