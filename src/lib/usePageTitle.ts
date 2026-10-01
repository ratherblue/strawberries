import { useEffect } from 'react'

export function usePageTitle(title?: string) {
  useEffect(() => {
    document.title = title ? `${title} · Strawberries` : 'Strawberries — straight from the field'
  }, [title])
}
