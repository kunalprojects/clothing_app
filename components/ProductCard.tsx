'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Heart, ShoppingBag } from 'lucide-react'
import { Product } from '@/lib/store'
import { formatPrice } from '@/lib/utils'
import { useStore } from '@/lib/store'
import { toast } from 'react-hot-toast'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const addToWishlist = useStore(state => state.addToWishlist)
  const removeFromWishlist = useStore(state => state.removeFromWishlist)
  const isInWishlist = useStore(state => state.isInWishlist(product.id))
  const addToCart = useStore(state => state.addToCart)

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault()
    if (isInWishlist) {
      removeFromWishlist(product.id)
      toast.success('Removed from wishlist')
    } else {
      addToWishlist(product)
      toast.success('Added to wishlist')
    }
  }

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault()
    if (!product.inStock) {
      toast.error('Product out of stock')
      return
    }
    addToCart(product, product.sizes[0], product.colors[0])
    toast.success('Added to cart')
  }

  return (
    <Link href={`/product/${product.id}`} className="group">
      <div className="relative aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden mb-3">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.isNew && (
            <span className="px-2 py-1 bg-black text-white text-xs font-semibold rounded">
              NEW
            </span>
          )}
          {product.isBestSeller && (
            <span className="px-2 py-1 bg-white text-black text-xs font-semibold rounded">
              BEST SELLER
            </span>
          )}
          {!product.inStock && (
            <span className="px-2 py-1 bg-red-500 text-white text-xs font-semibold rounded">
              SOLD OUT
            </span>
          )}
          {product.lowStock && product.inStock && (
            <span className="px-2 py-1 bg-orange-500 text-white text-xs font-semibold rounded">
              LOW STOCK
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={handleWishlistToggle}
            className={`p-2 rounded-full ${
              isInWishlist ? 'bg-red-500 text-white' : 'bg-white text-black'
            } hover:scale-110 transition-transform`}
          >
            <Heart size={18} fill={isInWishlist ? 'currentColor' : 'none'} />
          </button>
        </div>

        {/* Quick Add Button */}
        {product.inStock && (
          <button
            onClick={handleQuickAdd}
            className="absolute bottom-3 left-3 right-3 py-2 bg-white text-black font-semibold rounded-md opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 hover:bg-gray-100"
          >
            <ShoppingBag size={18} />
            Quick Add
          </button>
        )}
      </div>

      <div>
        <h3 className="font-semibold mb-1 group-hover:underline">{product.name}</h3>
        <p className="text-sm text-gray-600 mb-2">{product.category}</p>
        <div className="flex items-center gap-2">
          <span className="font-bold">{formatPrice(product.price)}</span>
          {product.originalPrice && (
            <span className="text-sm text-gray-400 line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>
        {product.rating && (
          <div className="flex items-center gap-1 mt-1">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <span key={i} className={i < Math.floor(product.rating!) ? 'text-yellow-400' : 'text-gray-300'}>
                  ★
                </span>
              ))}
            </div>
            <span className="text-sm text-gray-600">({product.reviews})</span>
          </div>
        )}
      </div>
    </Link>
  )
}
