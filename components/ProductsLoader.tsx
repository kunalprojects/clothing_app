'use client'
import { useLoadProducts } from '@/lib/useProducts'

/** 
 * Invisible component — just boots the product fetch on app load.
 * Drop it in layout.tsx so products load before any page renders.
 */
export function ProductsLoader() {
  useLoadProducts()
  return null
}
