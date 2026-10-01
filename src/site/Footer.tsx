import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { Button, Strawberry, Stripes } from '../components';
import s from './Footer.module.css';

const COLUMNS = [
  { heading: 'Shop', links: [['Boxes', '/shop?kind=box'], ['Jam', '/shop?kind=jam'], ['Gifts', '/shop?kind=gift'], ['Subscriptions', '/basket']] },
  { heading: 'Hello', links: [['Our field', '/field'], ['Pick-your-own', '/pick'], ['Farm shop', '/farm-shop'], ['Contact', '/farm-shop#finding-us']] },
] as const;

export function Footer() {
  const [email, setEmail] = useState('');
  const [state, setState] = useState<'idle' | 'error' | 'done'>('idle');

  const submit = (e: FormEvent) => {
    e.preventDefault();
    setState(/.+@.+\..+/.test(email) ? 'done' : 'error');
  };

  return (
    <footer className={s.footer}>
      <Stripes variant="gingham" tone="berry" height={20} style={{ borderRadius: 0 }} />
      <div className={s.grid}>
        <div>
          <div className={s.brand}><Strawberry size={28} tilt={-12} />Strawberries</div>
          {state === 'done' ? (
            <p className={s.blurb} role="status">Lovely. The first postcard's on its way next month.</p>
          ) : (
            <>
              <p className={s.blurb}>A postcard from the field, once a month. No spam, only berries.</p>
              <form className={s.form} onSubmit={submit} noValidate>
                <label htmlFor="newsletter-email" className="visually-hidden">Email address</label>
                <input
                  id="newsletter-email"
                  className="sb-input"
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  value={email}
                  aria-invalid={state === 'error' || undefined}
                  aria-describedby={state === 'error' ? 'newsletter-error' : undefined}
                  onChange={(e) => { setEmail(e.target.value); if (state === 'error') setState('idle'); }}
                />
                <Button type="submit" variant="berry">Sign me up</Button>
              </form>
              {state === 'error' ? <p id="newsletter-error" className={s.error}>That email doesn't look quite right.</p> : null}
            </>
          )}
        </div>
        {COLUMNS.map((c) => (
          <div key={c.heading}>
            <h2 className={s.heading}>{c.heading}</h2>
            <ul className={s.list}>
              {c.links.map(([label, to]) => <li key={label}><Link to={to} className={s.link}>{label}</Link></li>)}
            </ul>
          </div>
        ))}
      </div>
      <div className={s.legal}>
        <span>© {new Date().getFullYear()} Strawberries Farm · Hood River, OR</span>
        <span>A portfolio project. The berries are imaginary; the design is real.</span>
      </div>
    </footer>
  );
}
