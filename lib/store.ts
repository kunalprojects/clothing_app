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

interface StoreState {
  cart: CartItem[]
  wishlist: Product[]
  addToCart: (product: Product, size: string, color: string) => void
  removeFromCart: (id: string, size: string, color: string) => void
  updateQuantity: (id: string, size: string, color: string, quantity: number) => void
  clearCart: () => void
  addToWishlist: (product: Product) => void
  removeFromWishlist: (id: string) => void
  isInWishlist: (id: string) => boolean
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      cart: [],
      wishlist: [],
      
      addToCart: (product, size, color) => {
        const cart = get().cart
        const existingItem = cart.find(
          item => item.id === product.id && item.selectedSize === size && item.selectedColor === color
        )
        
        if (existingItem) {
          set({
            cart: cart.map(item =>
              item.id === product.id && item.selectedSize === size && item.selectedColor === color
                ? { ...item, quantity: item.quantity + 1 }
                : item
            )
          })
        } else {
          set({
            cart: [...cart, { ...product, quantity: 1, selectedSize: size, selectedColor: color }]
          })
        }
      },
      
      removeFromCart: (id, size, color) => {
        set({
          cart: get().cart.filter(
            item => !(item.id === id && item.selectedSize === size && item.selectedColor === color)
          )
        })
      },
      
      updateQuantity: (id, size, color, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(id, size, color)
        } else {
          set({
            cart: get().cart.map(item =>
              item.id === id && item.selectedSize === size && item.selectedColor === color
                ? { ...item, quantity }
                : item
            )
          })
        }
      },
      
      clearCart: () => set({ cart: [] }),
      
      addToWishlist: (product) => {
        if (!get().isInWishlist(product.id)) {
          set({ wishlist: [...get().wishlist, product] })
        }
      },
      
      removeFromWishlist: (id) => {
        set({ wishlist: get().wishlist.filter(item => item.id !== id) })
      },
      
      isInWishlist: (id) => {
        return get().wishlist.some(item => item.id === id)
      },
    }),
    {
      name: 'clothing-store',
    }
  )
)
