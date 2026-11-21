import Image from 'next/image'
import Link from 'next/link'
import { products, collections, reviews } from '@/lib/data'
import { ProductCard } from '@/components/ProductCard'
import { ArrowRight, Star, Users, TrendingUp } from 'lucide-react'

export default function Home() {
  const newArrivals = products.filter(p => p.isNew).slice(0, 4)
  const bestSellers = products.filter(p => p.isBestSeller).slice(0, 4)

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[600px] bg-gray-900">
        <Image
          src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1920&h=600&fit=crop"
          alt="Hero"
          fill
          className="object-cover opacity-70"
          priority
        />
        <div className="absolute inset-0 flex items-center justify-center text-center text-white">
          <div className="container mx-auto px-4">
            <div className="inline-block bg-green-500 text-white px-6 py-2 rounded-full font-bold text-lg mb-4 animate-pulse">
              🎉 Get 5% Cashback on Every Order!
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-4">
              Your Vibe, Your Style
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200">
              Fresh drops that match your energy
            </p>
            <div className="flex gap-4 justify-center">
              <Link
                href="/shop"
                className="px-8 py-3 bg-white text-black font-semibold rounded-md hover:bg-gray-100 transition"
              >
                Shop Now
              </Link>
              <Link
                href="/collections/new-arrivals"
                className="px-8 py-3 border-2 border-white text-white font-semibold rounded-md hover:bg-white hover:text-black transition"
              >
                New Arrivals
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Collections Grid */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Shop by Vibe</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {collections.map((collection) => (
            <Link
              key={collection.id}
              href={`/collections/${collection.id}`}
              className="group relative aspect-square rounded-lg overflow-hidden"
            >
              <Image
                src={collection.image}
                alt={collection.name}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-50 transition-opacity flex items-end p-4">
                <div className="text-white">
                  <h3 className="font-bold text-lg">{collection.name}</h3>
                  <p className="text-sm text-gray-200">{collection.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* New Arrivals */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">New Arrivals</h2>
            <Link
              href="/collections/new-arrivals"
              className="flex items-center gap-2 font-semibold hover:gap-3 transition-all"
            >
              View All <ArrowRight size={20} />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {newArrivals.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Brand Story */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div className="relative aspect-square rounded-lg overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1558769132-cb1aea1f5505?w=600&h=600&fit=crop"
                alt="About"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-4">Built by Gen Z, for Gen Z</h2>
              <p className="text-gray-600 mb-4">
                We started VIBE because we were tired of fast fashion that didn't feel authentic. 
                Every piece in our collection is designed with your lifestyle in mind — comfortable, 
                stylish, and made to last.
              </p>
              <p className="text-gray-600 mb-6">
                From our signature oversized fits to our bold graphics, we're here to help you 
                express yourself without compromising on quality or values.
              </p>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 font-semibold hover:gap-3 transition-all"
              >
                Our Story <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="bg-black text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-3 gap-8 text-center max-w-4xl mx-auto">
            <div>
              <div className="flex items-center justify-center mb-2">
                <Users size={32} />
              </div>
              <p className="text-4xl font-bold mb-2">10K+</p>
              <p className="text-gray-400">Happy Customers</p>
            </div>
            <div>
              <div className="flex items-center justify-center mb-2">
                <Star size={32} />
              </div>
              <p className="text-4xl font-bold mb-2">4.8</p>
              <p className="text-gray-400">Average Rating</p>
            </div>
            <div>
              <div className="flex items-center justify-center mb-2">
                <TrendingUp size={32} />
              </div>
              <p className="text-4xl font-bold mb-2">500+</p>
              <p className="text-gray-400">Products Sold Daily</p>
            </div>
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">Best Sellers</h2>
            <Link
              href="/collections/best-sellers"
              className="flex items-center gap-2 font-semibold hover:gap-3 transition-all"
            >
              View All <ArrowRight size={20} />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {bestSellers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">What They're Saying</h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {reviews.map((review) => (
              <div key={review.id} className="bg-white rounded-lg p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden">
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
                <p className="text-gray-600 mb-4">{review.comment}</p>
                {review.productImage && (
                  <div className="relative w-full h-32 rounded-md overflow-hidden">
                    <Image
                      src={review.productImage}
                      alt="Product"
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                {review.verified && (
                  <p className="text-sm text-green-600 mt-2">✓ Verified Purchase</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="bg-black text-white rounded-2xl p-12 text-center max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Join The Club 💫</h2>
            <p className="text-gray-300 mb-6 text-lg">
              Get 10% off your first order + early access to new drops
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-3 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button className="px-8 py-3 bg-white text-black font-semibold rounded-md hover:bg-gray-100 transition">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
