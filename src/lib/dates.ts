/** YYYY-MM-DD in the visitor's local time zone. */
export function toISODate(d: Date) {
  const p = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}

/** Parse YYYY-MM-DD at local noon so DST and time zones can't shift the day. */
export const fromISODate = (iso: string) => new Date(iso + 'T12:00:00');

export function addDays(d: Date, n: number) {
  const x = new Date(d);
  x.setDate(x.getDate() + n);
  return x;
}

/** The first Saturday strictly after `from`. */
export function nextSaturday(from = new Date()) {
  const ahead = (6 - from.getDay() + 7) % 7 || 7;
  return addDays(from, ahead);
}

export const isSaturday = (iso: string) => fromISODate(iso).getDay() === 6;

export function formatLongDate(iso: string) {
  const d = fromISODate(iso);
  return Number.isNaN(d.getTime()) ? iso : d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
}
