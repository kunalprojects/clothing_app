import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-20 text-center">
      <h1 className="text-9xl font-bold mb-4">404</h1>
      <h2 className="text-3xl font-bold mb-4">Oops! Page Not Found</h2>
      <p className="text-gray-600 mb-8 text-lg">
        This page got lost in the wardrobe. Let's get you back on track.
      </p>
      <div className="flex gap-4 justify-center">
        <Link
          href="/"
          className="px-8 py-3 bg-black text-white font-semibold rounded-md hover:bg-gray-800 transition"
        >
          Go Home
        </Link>
        <Link
          href="/shop"
          className="px-8 py-3 border-2 border-black font-semibold rounded-md hover:bg-gray-50 transition"
        >
          Shop Now
        </Link>
      </div>
    </div>
  )
}
