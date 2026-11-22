'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Heart, ShoppingBag } from 'lucide-react'
import { useStore } from '@/lib/store'
import type { Product } from '@/lib/store'
import { formatPrice } from '@/lib/utils'
import { toast } from 'react-hot-toast'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product: initialProduct }: ProductCardProps) {
  // Always read the LIVE product from the store so stock status stays in sync
  const liveProduct = useStore(s => s.products.find(p => p.id === initialProduct.id)) ?? initialProduct

  const addToWishlist      = useStore(s => s.addToWishlist)
  const removeFromWishlist = useStore(s => s.removeFromWishlist)
  const isInWishlist       = useStore(s => s.isInWishlist(liveProduct.id))
  const addToCart          = useStore(s => s.addToCart)

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault()
    if (isInWishlist) {
      removeFromWishlist(liveProduct.id)
      toast.success('Removed from wishlist')
    } else {
      addToWishlist(liveProduct)
      toast.success('Added to wishlist')
    }
  }

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault()
    if (!liveProduct.inStock) {
      toast.error('Product is out of stock')
      return
    }
    addToCart(liveProduct, liveProduct.sizes[0], liveProduct.colors[0])
    toast.success('Added to cart')
  }

  return (
    <Link href={`/product/${liveProduct.id}`} className="group">
      <div className="relative aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden mb-3">
        <Image
          src={liveProduct.image}
          alt={liveProduct.name}
          fill
          className={`object-cover group-hover:scale-105 transition-transform duration-300 ${!liveProduct.inStock ? 'opacity-60' : ''}`}
          unoptimized={liveProduct.image.startsWith('data:')}
        />

        {/* Badges — top left */}
        <div className="absolute top-2 left-2 flex flex-col gap-1.5">
          {!liveProduct.inStock ? (
            <span className="px-2 py-1 bg-red-600 text-white text-xs font-bold rounded shadow">
              OUT OF STOCK
            </span>
          ) : liveProduct.lowStock ? (
            <span className="px-2 py-1 bg-orange-500 text-white text-xs font-bold rounded shadow">
              LOW STOCK
            </span>
          ) : null}

          {liveProduct.isNew && liveProduct.inStock && (
            <span className="px-2 py-1 bg-black text-white text-xs font-semibold rounded">
              NEW
            </span>
          )}
          {liveProduct.isBestSeller && liveProduct.inStock && !liveProduct.lowStock && (
            <span className="px-2 py-1 bg-white text-black text-xs font-semibold rounded shadow-sm">
              BEST SELLER
            </span>
          )}
        </div>

        {/* Wishlist button — top right */}
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={handleWishlistToggle}
            className={`p-2 rounded-full shadow ${isInWishlist ? 'bg-red-500 text-white' : 'bg-white text-black'} hover:scale-110 transition-transform`}
          >
            <Heart size={16} fill={isInWishlist ? 'currentColor' : 'none'} />
          </button>
        </div>

        {/* Quick Add — bottom, only when in stock */}
        {liveProduct.inStock && (
          <button
            onClick={handleQuickAdd}
            className="absolute bottom-2 left-2 right-2 py-2 bg-white text-black text-sm font-semibold rounded-md opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 hover:bg-gray-100 shadow"
          >
            <ShoppingBag size={16} />
            Quick Add
          </button>
        )}
      </div>

      {/* Product info */}
      <div>
        <h3 className="font-semibold text-sm sm:text-base mb-1 group-hover:underline line-clamp-2 leading-snug">
          {liveProduct.name}
        </h3>
        <p className="text-xs text-gray-500 mb-1">{liveProduct.category}</p>
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-bold text-sm sm:text-base">{formatPrice(liveProduct.price)}</span>
          {liveProduct.originalPrice && (
            <span className="text-xs text-gray-400 line-through">{formatPrice(liveProduct.originalPrice)}</span>
          )}
        </div>
        {liveProduct.rating && (
          <div className="flex items-center gap-1 mt-1">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <span key={i} className={`text-xs ${i < Math.floor(liveProduct.rating!) ? 'text-yellow-400' : 'text-gray-300'}`}>★</span>
              ))}
            </div>
            <span className="text-xs text-gray-500">({liveProduct.reviews})</span>
          </div>
        )}
        {/* Inline stock text under price on mobile (no hover needed) */}
        {!liveProduct.inStock && (
          <p className="text-xs text-red-600 font-semibold mt-1">Out of stock</p>
        )}
        {liveProduct.lowStock && liveProduct.inStock && (
          <p className="text-xs text-orange-600 font-semibold mt-1">Only {liveProduct.inventory} left!</p>
        )}
      </div>
    </Link>
  )
}
