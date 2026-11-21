'use client'

import { useState, useEffect } from 'react'
import { X, Search } from 'lucide-react'
import { products } from '@/lib/data'
import Image from 'next/image'
import Link from 'next/link'
import { formatPrice } from '@/lib/utils'

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState(products)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  useEffect(() => {
    if (query.trim() === '') {
      setResults(products.slice(0, 6))
    } else {
      const filtered = products.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase()) ||
        product.colors.some(color => color.toLowerCase().includes(query.toLowerCase()))
      )
      setResults(filtered)
    }
  }, [query])

  if (!isOpen) return null

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl bg-white z-50 shadow-xl rounded-b-2xl max-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center gap-4 p-6 border-b border-gray-200">
          <Search size={24} className="text-gray-400" />
          <input
            type="text"
            placeholder="Search for tees, colors, styles..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 text-lg focus:outline-none"
            autoFocus
          />
          <button onClick={onClose} className="hover:text-gray-600 transition">
            <X size={24} />
          </button>
        </div>

        {/* Results */}
        <div className="flex-1 overflow-y-auto p-6">
          {results.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg mb-2">No products found</p>
              <p className="text-gray-500">Try searching for something else</p>
            </div>
          ) : (
            <>
              <p className="text-sm text-gray-600 mb-4">
                {results.length} result{results.length !== 1 ? 's' : ''} found
              </p>
              <div className="space-y-4">
                {results.map((product) => (
                  <Link
                    key={product.id}
                    href={`/product/${product.id}`}
                    onClick={onClose}
                    className="flex gap-4 p-4 hover:bg-gray-50 rounded-lg transition group"
                  >
                    <div className="relative w-20 h-20 flex-shrink-0 bg-gray-100 rounded-md overflow-hidden">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold mb-1 group-hover:underline">
                        {product.name}
                      </h3>
                      <p className="text-sm text-gray-600 mb-1">{product.category}</p>
                      <div className="flex items-center gap-2">
                        <span className="font-bold">{formatPrice(product.price)}</span>
                        {product.originalPrice && (
                          <span className="text-sm text-gray-400 line-through">
                            {formatPrice(product.originalPrice)}
                          </span>
                        )}
                      </div>
                    </div>
                    {!product.inStock && (
                      <span className="self-start px-2 py-1 bg-red-100 text-red-600 text-xs font-semibold rounded">
                        OUT OF STOCK
                      </span>
                    )}
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Popular Searches */}
        {query === '' && (
          <div className="border-t border-gray-200 p-6">
            <p className="text-sm font-semibold mb-3">Popular Searches</p>
            <div className="flex flex-wrap gap-2">
              {['oversized', 'graphic', 'black tee', 'white tee', 'vintage'].map((term) => (
                <button
                  key={term}
                  onClick={() => setQuery(term)}
                  className="px-4 py-2 bg-gray-100 rounded-full text-sm hover:bg-gray-200 transition"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  )
}
