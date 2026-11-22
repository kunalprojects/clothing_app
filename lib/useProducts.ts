'use client'
import { useEffect } from 'react'
import { useStore } from './store'

/**
 * Call this once at the top of the app (in layout or a provider).
 * Fetches products from the database and puts them in the Zustand store.
 * All pages/components then read from the store — no prop drilling needed.
 */
export function useLoadProducts() {
  const setProducts    = useStore(s => s.setProducts)
  const productsLoaded = useStore(s => s.productsLoaded)

  useEffect(() => {
    // Always fetch fresh from DB on mount
    fetch('/api/products')
      .then(r => r.json())
      .then(data => {
        if (Array.isArray(data)) setProducts(data)
      })
      .catch(console.error)
  }, [setProducts])

  return productsLoaded
}
