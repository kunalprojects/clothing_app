'use client'

import { useState, use, Suspense } from 'react'
import Image from 'next/image'
import { reviews as allReviews } from '@/lib/data'
import { useStore } from '@/lib/store'
import { formatPrice } from '@/lib/utils'
import { Heart, Share2, TruckIcon, RefreshCw, Shield, ChevronDown, ChevronUp } from 'lucide-react'
import { ProductCard } from '@/components/ProductCard'
import { toast } from 'react-hot-toast'

function ProductContent({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)
  const allProducts = useStore(state => state.products)
  const product = allProducts.find(p => p.id === resolvedParams.id)

  const [selectedSize, setSelectedSize] = useState<string>('')
  const [selectedColor, setSelectedColor] = useState<string>('')
  const [showSizeChart, setShowSizeChart] = useState(false)
  const [quantity, setQuantity] = useState(1)

  const addToCart = useStore(state => state.addToCart)
  const addToWishlist = useStore(state => state.addToWishlist)
  const removeFromWishlist = useStore(state => state.removeFromWishlist)
  const isInWishlist = useStore(state => product ? state.isInWishlist(product.id) : false)

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">Product not found</h1>
        <a href="/shop" className="text-blue-600 hover:underline">
          Continue Shopping
        </a>
      </div>
    )
  }

  const relatedProducts = allProducts
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4)

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error('Please select a size')
      return
    }
    if (!selectedColor) {
      toast.error('Please select a color')
      return
    }
    
    for (let i = 0; i < quantity; i++) {
      addToCart(product, selectedSize, selectedColor)
    }
    toast.success('Added to cart!')
  }

  const handleWishlistToggle = () => {
    if (isInWishlist) {
      removeFromWishlist(product.id)
      toast.success('Removed from wishlist')
    } else {
      addToWishlist(product)
      toast.success('Added to wishlist')
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-12 mb-16">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="relative aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="relative aspect-square bg-gray-100 rounded-md overflow-hidden cursor-pointer hover:opacity-75 transition">
                <Image
                  src={product.image}
                  alt={`${product.name} ${i}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div>
          {product.isNew && (
            <span className="inline-block px-3 py-1 bg-black text-white text-sm font-semibold rounded mb-4">
              NEW ARRIVAL
            </span>
          )}
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          
          {product.rating && (
            <div className="flex items-center gap-2 mb-4">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={i < Math.floor(product.rating!) ? '' : 'text-gray-300'}>
                    ★
                  </span>
                ))}
              </div>
              <span className="text-gray-600">
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>
          )}

          <div className="flex items-center gap-4 mb-6">
            <span className="text-3xl font-bold">{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <>
                <span className="text-xl text-gray-400 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
                <span className="px-2 py-1 bg-red-100 text-red-600 text-sm font-semibold rounded">
                  {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                </span>
              </>
            )}
          </div>

          {!product.inStock && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-600 font-bold">⛔ Out of Stock</p>
              <p className="text-sm text-red-500 mt-1">This product is currently unavailable.</p>
            </div>
          )}

          {product.lowStock && product.inStock && (
            <div className="mb-6 p-4 bg-orange-50 border border-orange-200 rounded-md">
              <p className="text-orange-600 font-bold">⚡ Only {product.inventory} left in stock!</p>
              <p className="text-sm text-orange-500 mt-1">Order soon before it sells out.</p>
            </div>
          )}

          {/* Color Selection */}
          <div className="mb-6">
            <label className="block font-semibold mb-3">
              Color: {selectedColor && <span className="font-normal text-gray-600">{selectedColor}</span>}
            </label>
            <div className="flex gap-2">
              {product.colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`px-4 py-2 border-2 rounded-md transition ${
                    selectedColor === color
                      ? 'border-black bg-black text-white'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          {/* Size Selection */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <label className="font-semibold">
                Size: {selectedSize && <span className="font-normal text-gray-600">{selectedSize}</span>}
              </label>
              <button
                onClick={() => setShowSizeChart(!showSizeChart)}
                className="text-sm underline flex items-center gap-1"
              >
                Size Chart {showSizeChart ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 border-2 rounded-md transition ${
                    selectedSize === size
                      ? 'border-black bg-black text-white'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
            {showSizeChart && (
              <div className="mt-4 p-4 bg-gray-50 rounded-md">
                <p className="text-sm text-gray-600">
                  Model is 5'8" and wearing size M. Check our detailed size guide for measurements.
                </p>
              </div>
            )}
          </div>

          {/* Quantity */}
          <div className="mb-6">
            <label className="block font-semibold mb-3">Quantity</label>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-100"
              >
                -
              </button>
              <span className="w-12 text-center">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-100"
              >
                +
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 mb-8">
            <button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className="w-full py-3 bg-black text-white font-semibold rounded-md hover:bg-gray-800 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              {product.inStock ? 'Add to Cart' : 'Out of Stock'}
            </button>
            <div className="flex gap-3">
              <button
                onClick={handleWishlistToggle}
                className="flex-1 py-3 border-2 border-black rounded-md font-semibold hover:bg-gray-50 transition flex items-center justify-center gap-2"
              >
                <Heart size={20} fill={isInWishlist ? 'currentColor' : 'none'} />
                {isInWishlist ? 'In Wishlist' : 'Add to Wishlist'}
              </button>
              <button className="py-3 px-4 border-2 border-black rounded-md hover:bg-gray-50 transition">
                <Share2 size={20} />
              </button>
            </div>
          </div>

          {/* Features */}
          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-3">
              <TruckIcon size={20} />
              <span>Free shipping on orders over ₹1,999</span>
            </div>
            <div className="flex items-center gap-3">
              <RefreshCw size={20} />
              <span>Easy returns within 7 days</span>
            </div>
            <div className="flex items-center gap-3">
              <Shield size={20} />
              <span>100% authentic products</span>
            </div>
          </div>

          {/* Product Details Accordion */}
          <div className="mt-8 border-t border-gray-200 pt-6 space-y-4">
            <details className="group">
              <summary className="cursor-pointer font-semibold flex items-center justify-between">
                Fabric & Care
                <ChevronDown className="group-open:rotate-180 transition" size={20} />
              </summary>
              <div className="mt-3 text-gray-600 text-sm">
                <p>• 100% Premium Cotton</p>
                <p>• Machine wash cold, tumble dry low</p>
                <p>• Do not bleach or iron directly on print</p>
              </div>
            </details>
            <details className="group">
              <summary className="cursor-pointer font-semibold flex items-center justify-between">
                Fit Guide
                <ChevronDown className="group-open:rotate-180 transition" size={20} />
              </summary>
              <div className="mt-3 text-gray-600 text-sm">
                <p>• Oversized fit for a relaxed look</p>
                <p>• Model is 5'8" and wearing size M</p>
                <p>• Size up for an even baggier fit</p>
              </div>
            </details>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="border-t border-gray-200 pt-12 mb-12">
        <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {allReviews.slice(0, 3).map((review) => (
            <div key={review.id} className="border border-gray-200 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="relative w-10 h-10 rounded-full overflow-hidden">
                  <Image
                    src={review.image}
                    alt={review.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-semibold">{review.name}</p>
                  <div className="flex text-yellow-400">
                    {[...Array(review.rating)].map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-600">{review.comment}</p>
              {review.verified && (
                <p className="text-sm text-green-600 mt-2">✓ Verified Purchase</p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="border-t border-gray-200 pt-12">
          <h2 className="text-2xl font-bold mb-6">Complete the Look</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  return (
    <Suspense fallback={
      <div className="container mx-auto px-4 py-20 text-center">
        <p>Loading product...</p>
      </div>
    }>
      <ProductContent params={params} />
    </Suspense>
  )
}
