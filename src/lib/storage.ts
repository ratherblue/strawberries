/** localStorage/sessionStorage that never throws (private mode, blocked storage, SSR). */
export function load<T>(store: 'local' | 'session', key: string, fallback: T): T {
  try {
    const raw = (store === 'local' ? localStorage : sessionStorage).getItem(key)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}

export function save(store: 'local' | 'session', key: string, value: unknown) {
  try {
    ;(store === 'local' ? localStorage : sessionStorage).setItem(key, JSON.stringify(value))
  } catch {
    /* storage unavailable — state still works for this visit */
  }
}
