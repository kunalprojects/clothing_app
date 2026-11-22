'use client'

import { useState } from 'react'
import { useStore } from '@/lib/store'
import { ProductCard } from '@/components/ProductCard'
import { SlidersHorizontal, X } from 'lucide-react'

export default function ShopPage() {
  const products = useStore(state => state.products)
  const [sortBy, setSortBy] = useState<string>('featured')
  const [priceRange, setPriceRange] = useState<string>('all')
  const [showMobileFilters, setShowMobileFilters] = useState(false)

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

  const FilterContent = () => (
    <>
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
              onClick={() => { setPriceRange(range.value); setShowMobileFilters(false) }}
              className={`block w-full text-left px-3 py-2 rounded-md transition ${
                priceRange === range.value ? 'bg-black text-white' : 'hover:bg-gray-200'
              }`}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>

      {/* Collections */}
      <div className="mb-6">
        <h3 className="font-semibold mb-3">Collections</h3>
        <div className="space-y-2">
          <a href="/collections/new-arrivals" className="block w-full text-left px-3 py-2 rounded-md hover:bg-gray-200 transition">New Arrivals</a>
          <a href="/collections/best-sellers" className="block w-full text-left px-3 py-2 rounded-md hover:bg-gray-200 transition">Best Sellers</a>
          <a href="/collections/oversized" className="block w-full text-left px-3 py-2 rounded-md hover:bg-gray-200 transition">Oversized Fit</a>
          <a href="/collections/graphic" className="block w-full text-left px-3 py-2 rounded-md hover:bg-gray-200 transition">Graphic Tees</a>
        </div>
      </div>

      <button
        onClick={() => { setPriceRange('all'); setSortBy('featured'); setShowMobileFilters(false) }}
        className="w-full py-2 border border-black rounded-md hover:bg-gray-100 transition"
      >
        Clear All
      </button>
    </>
  )

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl sm:text-4xl font-bold mb-2">Shop All Tees</h1>
      <p className="text-gray-600 mb-6">Explore our complete collection of premium t-shirts</p>

      {/* Mobile Filter Toggle */}
      <div className="flex items-center justify-between mb-4 lg:hidden">
        <p className="text-gray-600 text-sm">{filteredProducts.length} tee{filteredProducts.length !== 1 ? 's' : ''}</p>
        <button
          onClick={() => setShowMobileFilters(true)}
          className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md text-sm font-semibold"
        >
          <SlidersHorizontal size={16} />
          Filters
        </button>
      </div>

      {/* Mobile Filter Drawer */}
      {showMobileFilters && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={() => setShowMobileFilters(false)} />
          <div className="fixed bottom-0 left-0 right-0 bg-white z-50 rounded-t-2xl p-6 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold">Filters</h2>
              <button onClick={() => setShowMobileFilters(false)}><X size={24} /></button>
            </div>
            <FilterContent />
          </div>
        </>
      )}

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Desktop Filters Sidebar */}
        <aside className="hidden lg:block lg:w-64 flex-shrink-0">
          <div className="bg-gray-50 rounded-lg p-6 sticky top-24">
            <div className="flex items-center gap-2 mb-6">
              <SlidersHorizontal size={20} />
              <h2 className="font-bold text-lg">Filters</h2>
            </div>
            <FilterContent />
          </div>
        </aside>

        {/* Products Grid */}
        <div className="flex-1">
          {/* Sort Bar */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <p className="text-gray-600 hidden lg:block">
              Showing {filteredProducts.length} tee{filteredProducts.length !== 1 ? 's' : ''}
            </p>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            >
              <option value="featured">Featured</option>
              <option value="new">Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>

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
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
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
