'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useStore } from '@/lib/store'
import { formatPrice } from '@/lib/utils'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'

export default function CheckoutPage() {
  const router = useRouter()
  const cart = useStore(state => state.cart)
  const clearCart = useStore(state => state.clearCart)

  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    paymentMethod: 'upi'
  })

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = subtotal > 1999 ? 0 : 99
  const cashback = Math.round(subtotal * 0.05)
  const total = subtotal + shipping

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const items = cart.map(item => ({
      name: item.name,
      quantity: item.quantity,
      price: item.price,
      size: item.selectedSize,
      color: item.selectedColor,
    }))

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, items, subtotal, shipping, total }),
      })

      if (res.ok) {
        toast.success('Order placed successfully!')
        clearCart()
        setTimeout(() => router.push('/'), 2000)
      } else {
        toast.error('Something went wrong. Please try again.')
      }
    } catch {
      toast.error('Network error. Please try again.')
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
        <a href="/shop" className="text-blue-600 hover:underline">Continue Shopping</a>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8">Checkout</h1>

      <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-12">

        {/* Order Summary — first on mobile, right column on desktop */}
        <div className="order-first lg:order-last">
          <div className="bg-gray-50 rounded-lg p-4 sm:p-6 lg:sticky lg:top-24">
            <h2 className="text-xl font-bold mb-4 sm:mb-6">Order Summary</h2>

            <div className="space-y-4 mb-6">
              {cart.map((item) => (
                <div key={`${item.id}-${item.selectedSize}-${item.selectedColor}`} className="flex gap-3 sm:gap-4">
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-md overflow-hidden flex-shrink-0">
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm mb-1 truncate">{item.name}</h3>
                    <p className="text-xs text-gray-600 mb-1">{item.selectedColor} / {item.selectedSize}</p>
                    <p className="text-sm">Qty: {item.quantity} × {formatPrice(item.price)}</p>
                  </div>
                  <p className="font-semibold text-sm flex-shrink-0">{formatPrice(item.price * item.quantity)}</p>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-300 pt-4 space-y-2">
              <div className="flex justify-between text-sm sm:text-base">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm sm:text-base">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'FREE' : formatPrice(shipping)}</span>
              </div>
              {shipping > 0 && (
                <p className="text-xs text-gray-600">Add {formatPrice(2000 - subtotal)} more for free shipping</p>
              )}
              <div className="flex justify-between text-green-600 font-semibold text-sm sm:text-base">
                <span className="flex items-center gap-1 sm:gap-2 flex-wrap">
                  Cashback (5%)
                  <span className="text-xs bg-green-100 px-2 py-0.5 rounded">You&apos;ll earn</span>
                </span>
                <span>+{formatPrice(cashback)}</span>
              </div>
              <div className="flex justify-between text-lg font-bold pt-2 border-t border-gray-300">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
              <p className="text-xs sm:text-sm text-green-600 bg-green-50 p-3 rounded-md mt-2">
                🎉 You&apos;ll earn {formatPrice(cashback)} cashback on this order!
              </p>
            </div>
          </div>
        </div>

        {/* Checkout Form — second on mobile, left column on desktop */}
        <div className="order-last lg:order-first">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Contact Information */}
            <div>
              <h2 className="text-xl font-bold mb-4">Contact Information</h2>
              <div className="space-y-4">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                />
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                  />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    required
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
            </div>

            {/* Shipping Address */}
            <div>
              <h2 className="text-xl font-bold mb-4">Shipping Address</h2>
              <div className="space-y-4">
                <textarea
                  name="address"
                  placeholder="Address"
                  required
                  rows={3}
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                />
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    required
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                  />
                  <input
                    type="text"
                    name="state"
                    placeholder="State"
                    required
                    value={formData.state}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>
                <input
                  type="text"
                  name="pincode"
                  placeholder="PIN Code"
                  required
                  value={formData.pincode}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
            </div>

            {/* Payment Method */}
            <div>
              <h2 className="text-xl font-bold mb-4">Payment Method</h2>
              <div className="space-y-3">
                {[
                  { value: 'upi', label: 'UPI (GPay, PhonePe, Paytm)' },
                  { value: 'card', label: 'Credit/Debit Card' },
                  { value: 'netbanking', label: 'Net Banking' },
                  { value: 'cod', label: 'Cash on Delivery' },
                ].map((method) => (
                  <label key={method.value} className="flex items-center gap-3 p-3 sm:p-4 border-2 border-gray-300 rounded-md cursor-pointer hover:border-black transition">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={method.value}
                      checked={formData.paymentMethod === method.value}
                      onChange={handleChange}
                      className="w-4 h-4 flex-shrink-0"
                    />
                    <span className="text-sm sm:text-base">{method.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-black text-white font-semibold rounded-md hover:bg-gray-800 transition text-base sm:text-lg"
            >
              Place Order — {formatPrice(total)}
            </button>
          </form>
        </div>

      </div>
    </div>
  )
}
