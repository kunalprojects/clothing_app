'use client'

import { useStore } from '@/lib/store'
import { ProductCard } from '@/components/ProductCard'
import { Heart } from 'lucide-react'
import Link from 'next/link'

export default function WishlistPage() {
  const wishlist = useStore(state => state.wishlist)

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">My Wishlist</h1>

      {wishlist.length === 0 ? (
        <div className="text-center py-20">
          <Heart size={64} className="mx-auto text-gray-300 mb-4" />
          <h2 className="text-2xl font-bold mb-2">Your wishlist is empty</h2>
          <p className="text-gray-600 mb-6">
            Save your favorite items here to buy them later
          </p>
          <Link
            href="/shop"
            className="inline-block px-8 py-3 bg-black text-white font-semibold rounded-md hover:bg-gray-800 transition"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <>
          <p className="text-gray-600 mb-6">{wishlist.length} item{wishlist.length !== 1 ? 's' : ''}</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {wishlist.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
