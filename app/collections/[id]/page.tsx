'use client'

import { use, Suspense } from 'react'
import { products, collections } from '@/lib/data'
import { ProductCard } from '@/components/ProductCard'
import Image from 'next/image'

function CollectionContent({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)
  const collection = collections.find(c => c.id === resolvedParams.id)

  if (!collection) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">Collection not found</h1>
        <a href="/shop" className="text-blue-600 hover:underline">
          Continue Shopping
        </a>
      </div>
    )
  }

  let filteredProducts = products

  if (resolvedParams.id === 'new-arrivals') {
    filteredProducts = products.filter(p => p.isNew)
  } else if (resolvedParams.id === 'best-sellers') {
    filteredProducts = products.filter(p => p.isBestSeller)
  }

  return (
    <div>
      {/* Hero Banner */}
      <div className="relative h-[300px] bg-gray-900 mb-12">
        <Image
          src={collection.image}
          alt={collection.name}
          fill
          className="object-cover opacity-60"
        />
        <div className="absolute inset-0 flex items-center justify-center text-white">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-2">{collection.name}</h1>
            <p className="text-xl">{collection.description}</p>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="container mx-auto px-4 pb-16">
        <div className="mb-6">
          <p className="text-gray-600">
            {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
          </p>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No products in this collection yet</p>
            <a
              href="/shop"
              className="mt-4 inline-block px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition"
            >
              Shop All Products
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default function CollectionPage({ params }: { params: Promise<{ id: string }> }) {
  return (
    <Suspense fallback={
      <div className="container mx-auto px-4 py-20 text-center">
        <p>Loading collection...</p>
      </div>
    }>
      <CollectionContent params={params} />
    </Suspense>
  )
}
