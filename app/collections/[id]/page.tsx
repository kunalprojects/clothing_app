'use client'

import { use, Suspense } from 'react'
import { collections } from '@/lib/data'
import { useStore } from '@/lib/store'
import { ProductCard } from '@/components/ProductCard'
import Image from 'next/image'

function CollectionContent({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)
  const allProducts = useStore(state => state.products)
  const collection = collections.find(c => c.id === resolvedParams.id)

  if (!collection) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">Collection not found</h1>
        <a href="/shop" className="text-blue-600 hover:underline">Continue Shopping</a>
      </div>
    )
  }

  let filteredProducts = allProducts
  if (resolvedParams.id === 'new-arrivals') {
    filteredProducts = allProducts.filter(p => p.isNew)
  } else if (resolvedParams.id === 'best-sellers') {
    filteredProducts = allProducts.filter(p => p.isBestSeller)
  }

  return (
    <div>
      <div className="relative h-[200px] sm:h-[300px] bg-gray-900 mb-8 sm:mb-12">
        <Image src={collection.image} alt={collection.name} fill className="object-cover opacity-60" />
        <div className="absolute inset-0 flex items-center justify-center text-white">
          <div className="text-center px-4">
            <h1 className="text-3xl sm:text-5xl font-bold mb-2">{collection.name}</h1>
            <p className="text-base sm:text-xl">{collection.description}</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-16">
        <p className="text-gray-600 mb-6">{filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}</p>
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No products in this collection yet</p>
            <a href="/shop" className="mt-4 inline-block px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition">
              Shop All Products
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
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
      <div className="container mx-auto px-4 py-20 text-center"><p>Loading collection...</p></div>
    }>
      <CollectionContent params={params} />
    </Suspense>
  )
}
