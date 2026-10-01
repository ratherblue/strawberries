import { useEffect, useMemo, useRef, useState, type ChangeEvent, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { Badge, Button, Card, Checkbox, Input, Select, Subheader, Tag } from '../components';
import { Photo } from '../site/Photo';
import { formatLongDate, isSaturday, nextSaturday, toISODate } from '../lib/dates';
import { usePageTitle } from '../lib/usePageTitle';
import s from './PickScreen.module.css';

const SLOTS = ['9:00', '10:30', '12:00', '1:30', '3:00'];
const FULL = ['12:00'];
const FACTS = [
  ['Saturdays', '9am – 4pm, June to mid-October'],
  ['$4.50 / lb', 'Pay for what you pick. Baskets are free.'],
  ['Bring', 'A hat, closed shoes, and someone to carry things.'],
] as const;

type Fields = { people: string; name: string; email: string };
type Errors = Partial<Record<'date' | keyof Fields, string>>;
interface Booking extends Fields { date: string; slot: string; dog: boolean }

export function PickScreen() {
  usePageTitle('Pick-your-own');
  const firstSat = useMemo(() => toISODate(nextSaturday()), []);
  const [date, setDate] = useState(firstSat);
  const [slot, setSlot] = useState('10:30');
  const [dog, setDog] = useState(false);
  const [f, setF] = useState<Fields>({ people: '2', name: '', email: '' });
  const [errors, setErrors] = useState<Errors>({});
  const [booked, setBooked] = useState<Booking | null>(null);
  const doneRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => { if (booked) doneRef.current?.focus(); }, [booked]);

  const set = (k: keyof Fields) => (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setF((v) => ({ ...v, [k]: e.target.value }));
    if (errors[k]) setErrors((x) => ({ ...x, [k]: undefined }));
  };

  const book = (e: FormEvent) => {
    e.preventDefault();
    const err: Errors = {};
    if (!date || !isSaturday(date)) err.date = "We're only open for picking on Saturdays.";
    else if (date < firstSat) err.date = 'That Saturday has been and gone.';
    if (!f.name.trim()) err.name = 'Who should we expect?';
    if (!/.+@.+\..+/.test(f.email)) err.email = "We'll send your ticket here.";
    setErrors(err);
    const first = Object.keys(err)[0];
    if (first) {
      document.getElementById('pick-' + first)?.focus();
      return;
    }
    setBooked({ date, slot, dog, ...f });
  };

  const reset = () => {
    setBooked(null);
    setF({ people: '2', name: '', email: '' });
    setDog(false);
    setErrors({});
  };

  return (
    <div className="page">
      <Link to="/field" className="back-link">← Our field</Link>
      <Subheader variant="eyebrow">Pick-your-own</Subheader>
      <h1 className="page-title">Come pick your own.</h1>
      <p className={'lead ' + s.lead}>Grab a basket, find a row, and eat a few while nobody's looking. We keep numbers small so there's always plenty to go round.</p>

      <dl className={s.facts}>
        {FACTS.map(([t, d]) => (
          <div key={t} className={s.fact}>
            <dt className={s.factTitle}>{t}</dt>
            <dd className={s.factBody}>{d}</dd>
          </div>
        ))}
      </dl>

      <div className={s.split}>
        <Photo label="kids picking in row 12" tone="berry" height={460} radius={26} className={s.photo} />
        {booked ? (
          <Card stripes="leaf-gingham" padding={28} className={s.done}>
            <Badge tone="leaf" dot>Booked</Badge>
            <h2 ref={doneRef} tabIndex={-1} className={s.doneTitle}>See you in the field, {booked.name.trim().split(/\s+/)[0]}.</h2>
            <p className={s.doneCopy}>
              <strong>{formatLongDate(booked.date)}</strong> at <strong>{booked.slot}</strong> for {booked.people} {booked.people === '1' ? 'person' : 'people'}
              {booked.dog ? ' (and a very good dog)' : ''}. Your ticket's on its way to {booked.email}.
            </p>
            <div className={s.doneActions}>
              <Button to="/farm-shop">Plan your visit</Button>
              <Button variant="ghost" onClick={reset}>Book another</Button>
            </div>
          </Card>
        ) : (
          <Card stripes="berry-gingham" padding={28}>
            <Subheader size="md" as="h2">Book a slot</Subheader>
            <form className={s.form} onSubmit={book} noValidate>
              <div className={s.row}>
                <Input
                  id="pick-date"
                  size="lg"
                  type="date"
                  label="Saturday"
                  min={firstSat}
                  step={7}
                  value={date}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => { setDate(e.target.value); setErrors((x) => ({ ...x, date: undefined })); }}
                  error={errors.date}
                />
                <Select id="pick-people" size="lg" label="How many of you?" options={['1', '2', '3', '4', '5', '6']} value={f.people} onChange={set('people')} />
              </div>
              <fieldset className={s.slots}>
                <legend className="sb-label">Arrival time</legend>
                <div className={s.slotList}>
                  {SLOTS.map((t) => FULL.includes(t)
                    ? <Tag key={t} disabled>{t} · full</Tag>
                    : <Tag key={t} selected={slot === t} onClick={() => setSlot(t)}>{t}</Tag>)}
                </div>
              </fieldset>
              <Input id="pick-name" size="lg" label="Your name" placeholder="Pip Hartley" autoComplete="name" value={f.name} onChange={set('name')} error={errors.name} />
              <Input id="pick-email" size="lg" label="Email" type="email" placeholder="you@example.com" autoComplete="email" value={f.email} onChange={set('email')} error={errors.email} />
              <Checkbox label="We're bringing a dog (on a lead, promise)" checked={dog} onChange={(e) => setDog(e.target.checked)} />
              <Button type="submit" variant="berry" size="lg" icon="calendar" block>Book {slot} — free</Button>
              <p className={s.note}>Booking's free. You only pay for what you pick.</p>
            </form>
          </Card>
        )}
      </div>
    </div>
  );
}
