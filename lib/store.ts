import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  category: string
  sizes: string[]
  colors: string[]
  inventory: number
  sold: number
  inStock: boolean
  lowStock?: boolean
  isNew?: boolean
  isBestSeller?: boolean
  rating?: number
  reviews?: number
}

export interface CartItem extends Product {
  quantity: number
  selectedSize: string
  selectedColor: string
}

export function deriveStockFlags(inventory: number) {
  return {
    inStock:  inventory > 0,
    lowStock: inventory > 0 && inventory <= 5,
  }
}

interface StoreState {
  cart:     CartItem[]
  wishlist: Product[]
  products: Product[]
  productsLoaded: boolean

  // Cart
  addToCart:      (product: Product, size: string, color: string) => void
  removeFromCart: (id: string, size: string, color: string) => void
  updateQuantity: (id: string, size: string, color: string, quantity: number) => void
  clearCart:      () => void

  // Wishlist
  addToWishlist:      (product: Product) => void
  removeFromWishlist: (id: string) => void
  isInWishlist:       (id: string) => boolean

  // Products — synced from DB via API
  setProducts:    (products: Product[]) => void
  addProduct:     (product: Product) => void
  updateProduct:  (product: Product) => void
  deleteProduct:  (id: string) => void
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      cart:     [],
      wishlist: [],
      products: [],
      productsLoaded: false,

      // ── Cart ─────────────────────────────────────────────────────────
      addToCart: (product, size, color) => {
        const cart     = get().cart
        const existing = cart.find(i => i.id === product.id && i.selectedSize === size && i.selectedColor === color)
        if (existing) {
          set({ cart: cart.map(i => i.id === product.id && i.selectedSize === size && i.selectedColor === color ? { ...i, quantity: i.quantity + 1 } : i) })
        } else {
          set({ cart: [...cart, { ...product, quantity: 1, selectedSize: size, selectedColor: color }] })
        }
      },

      removeFromCart: (id, size, color) => {
        set({ cart: get().cart.filter(i => !(i.id === id && i.selectedSize === size && i.selectedColor === color)) })
      },

      updateQuantity: (id, size, color, quantity) => {
        if (quantity <= 0) { get().removeFromCart(id, size, color); return }
        set({ cart: get().cart.map(i => i.id === id && i.selectedSize === size && i.selectedColor === color ? { ...i, quantity } : i) })
      },

      clearCart: () => set({ cart: [] }),

      // ── Wishlist ──────────────────────────────────────────────────────
      addToWishlist: (product) => {
        if (!get().isInWishlist(product.id)) set({ wishlist: [...get().wishlist, product] })
      },
      removeFromWishlist: (id) => set({ wishlist: get().wishlist.filter(i => i.id !== id) }),
      isInWishlist: (id) => get().wishlist.some(i => i.id === id),

      // ── Products ──────────────────────────────────────────────────────
      setProducts: (products) => set({ products, productsLoaded: true }),

      addProduct: (product) => {
        const flags = deriveStockFlags(product.inventory)
        set({ products: [...get().products, { ...product, ...flags }] })
      },

      updateProduct: (product) => {
        const flags   = deriveStockFlags(product.inventory)
        const updated = { ...product, ...flags }
        set({ products: get().products.map(p => p.id === updated.id ? updated : p) })
      },

      deleteProduct: (id) => set({ products: get().products.filter(p => p.id !== id) }),
    }),
    {
      name: 'clothing-store',
      // Only persist cart and wishlist — products always come from DB
      partialize: (state) => ({ cart: state.cart, wishlist: state.wishlist }),
    }
  )
)
