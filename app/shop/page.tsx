'use client'

import { useState } from 'react'
import { products } from '@/lib/data'
import { ProductCard } from '@/components/ProductCard'
import { SlidersHorizontal } from 'lucide-react'

export default function ShopPage() {
  const [sortBy, setSortBy] = useState<string>('featured')
  const [priceRange, setPriceRange] = useState<string>('all')

  let filteredProducts = products.filter(product => {
    if (priceRange === 'under-1000' && product.price >= 1000) return false
    if (priceRange === '1000-1500' && (product.price < 1000 || product.price >= 1500)) return false
    if (priceRange === '1500-2000' && (product.price < 1500 || product.price >= 2000)) return false
    if (priceRange === 'above-2000' && product.price < 2000) return false

    return true
  })

  if (sortBy === 'price-low') {
    filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price)
  } else if (sortBy === 'price-high') {
    filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price)
  } else if (sortBy === 'new') {
    filteredProducts = [...filteredProducts].sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0))
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-2">Shop All Tees</h1>
      <p className="text-gray-600 mb-8">Explore our complete collection of premium t-shirts</p>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <aside className="lg:w-64 flex-shrink-0">
          <div className="bg-gray-50 rounded-lg p-6 sticky top-24">
            <div className="flex items-center gap-2 mb-6">
              <SlidersHorizontal size={20} />
              <h2 className="font-bold text-lg">Filters</h2>
            </div>

            {/* Price Range Filter */}
            <div className="mb-6">
              <h3 className="font-semibold mb-3">Price Range</h3>
              <div className="space-y-2">
                {[
                  { value: 'all', label: 'All Prices' },
                  { value: 'under-1000', label: 'Under ₹1,000' },
                  { value: '1000-1500', label: '₹1,000 - ₹1,500' },
                  { value: '1500-2000', label: '₹1,500 - ₹2,000' },
                  { value: 'above-2000', label: 'Above ₹2,000' },
                ].map((range) => (
                  <button
                    key={range.value}
                    onClick={() => setPriceRange(range.value)}
                    className={`block w-full text-left px-3 py-2 rounded-md transition ${
                      priceRange === range.value
                        ? 'bg-black text-white'
                        : 'hover:bg-gray-200'
                    }`}
                  >
                    {range.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Style Filter */}
            <div className="mb-6">
              <h3 className="font-semibold mb-3">Collections</h3>
              <div className="space-y-2">
                <a href="/collections/new-arrivals" className="block w-full text-left px-3 py-2 rounded-md hover:bg-gray-200 transition">
                  New Arrivals
                </a>
                <a href="/collections/best-sellers" className="block w-full text-left px-3 py-2 rounded-md hover:bg-gray-200 transition">
                  Best Sellers
                </a>
                <a href="/collections/oversized" className="block w-full text-left px-3 py-2 rounded-md hover:bg-gray-200 transition">
                  Oversized Fit
                </a>
                <a href="/collections/graphic" className="block w-full text-left px-3 py-2 rounded-md hover:bg-gray-200 transition">
                  Graphic Tees
                </a>
              </div>
            </div>

            {/* Clear Filters */}
            <button
              onClick={() => {
                setPriceRange('all')
                setSortBy('featured')
              }}
              className="w-full py-2 border border-black rounded-md hover:bg-gray-100 transition"
            >
              Clear All
            </button>
          </div>
        </aside>

        {/* Products Grid */}
        <div className="flex-1">
          {/* Sort Bar */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <p className="text-gray-600">
              Showing {filteredProducts.length} tee{filteredProducts.length !== 1 ? 's' : ''}
            </p>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            >
              <option value="featured">Featured</option>
              <option value="new">Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>

          {/* Products Grid */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No tees found in this price range</p>
              <button
                onClick={() => setPriceRange('all')}
                className="mt-4 px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
