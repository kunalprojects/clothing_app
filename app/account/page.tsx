'use client'

import { useState } from 'react'
import { User, Package, MapPin, Heart, LogOut } from 'lucide-react'
import Link from 'next/link'

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState('orders')

  // Demo user data
  const user = {
    name: 'Demo User',
    email: 'demo@vibe.in',
    phone: '+91 98765 43210'
  }

  const orders = [
    {
      id: '#ORD-2024-001',
      date: 'Nov 15, 2024',
      status: 'Delivered',
      total: 2599,
      items: 2
    },
    {
      id: '#ORD-2024-002',
      date: 'Nov 10, 2024',
      status: 'In Transit',
      total: 1999,
      items: 1
    },
    {
      id: '#ORD-2024-003',
      date: 'Nov 5, 2024',
      status: 'Delivered',
      total: 3499,
      items: 3
    }
  ]

  const addresses = [
    {
      id: 1,
      type: 'Home',
      name: 'Demo User',
      address: '123 Fashion Street, Apartment 4B',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400001',
      phone: '+91 98765 43210',
      isDefault: true
    },
    {
      id: 2,
      type: 'Work',
      name: 'Demo User',
      address: '456 Business Park, Office 12',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400050',
      phone: '+91 98765 43210',
      isDefault: false
    }
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">My Account</h1>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <aside className="lg:col-span-1">
          <div className="bg-gray-50 rounded-lg p-6 space-y-4">
            {/* User Info */}
            <div className="text-center pb-4 border-b border-gray-200">
              <div className="w-20 h-20 bg-black text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-3">
                {user.name.charAt(0)}
              </div>
              <h2 className="font-semibold">{user.name}</h2>
              <p className="text-sm text-gray-600">{user.email}</p>
            </div>

            {/* Navigation */}
            <nav className="space-y-2">
              <button
                onClick={() => setActiveTab('orders')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-md transition ${
                  activeTab === 'orders'
                    ? 'bg-black text-white'
                    : 'hover:bg-gray-200'
                }`}
              >
                <Package size={20} />
                <span>My Orders</span>
              </button>
              <button
                onClick={() => setActiveTab('addresses')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-md transition ${
                  activeTab === 'addresses'
                    ? 'bg-black text-white'
                    : 'hover:bg-gray-200'
                }`}
              >
                <MapPin size={20} />
                <span>Addresses</span>
              </button>
              <Link
                href="/wishlist"
                className="w-full flex items-center gap-3 px-4 py-3 rounded-md hover:bg-gray-200 transition"
              >
                <Heart size={20} />
                <span>Wishlist</span>
              </Link>
              <button
                onClick={() => setActiveTab('profile')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-md transition ${
                  activeTab === 'profile'
                    ? 'bg-black text-white'
                    : 'hover:bg-gray-200'
                }`}
              >
                <User size={20} />
                <span>Profile</span>
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-md hover:bg-red-50 hover:text-red-600 transition">
                <LogOut size={20} />
                <span>Logout</span>
              </button>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <div className="lg:col-span-3">
          {/* Orders Tab */}
          {activeTab === 'orders' && (
            <div>
              <h2 className="text-2xl font-bold mb-6">My Orders</h2>
              <div className="space-y-4">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition"
                  >
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                      <div>
                        <p className="font-semibold text-lg mb-1">{order.id}</p>
                        <p className="text-sm text-gray-600">
                          Placed on {order.date} • {order.items} item{order.items > 1 ? 's' : ''}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-lg">₹{order.total}</p>
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                            order.status === 'Delivered'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-blue-100 text-blue-700'
                          }`}
                        >
                          {order.status}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-4 mt-4 pt-4 border-t border-gray-200">
                      <button className="flex-1 py-2 border border-black rounded-md hover:bg-gray-50 transition">
                        View Details
                      </button>
                      {order.status === 'Delivered' && (
                        <button className="flex-1 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition">
                          Reorder
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {orders.length === 0 && (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                  <Package size={64} className="mx-auto text-gray-300 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No orders yet</h3>
                  <p className="text-gray-600 mb-6">Start shopping to see your orders here</p>
                  <Link
                    href="/shop"
                    className="inline-block px-8 py-3 bg-black text-white rounded-md hover:bg-gray-800 transition"
                  >
                    Start Shopping
                  </Link>
                </div>
              )}
            </div>
          )}

          {/* Addresses Tab */}
          {activeTab === 'addresses' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Saved Addresses</h2>
                <button className="px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition">
                  Add New Address
                </button>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {addresses.map((address) => (
                  <div
                    key={address.id}
                    className="bg-white border-2 border-gray-200 rounded-lg p-6 relative hover:border-black transition"
                  >
                    {address.isDefault && (
                      <span className="absolute top-4 right-4 px-2 py-1 bg-black text-white text-xs font-semibold rounded">
                        DEFAULT
                      </span>
                    )}
                    <h3 className="font-bold mb-1">{address.type}</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      {address.name}<br />
                      {address.address}<br />
                      {address.city}, {address.state} - {address.pincode}<br />
                      Phone: {address.phone}
                    </p>
                    <div className="flex gap-2">
                      <button className="flex-1 py-2 text-sm border border-black rounded-md hover:bg-gray-50 transition">
                        Edit
                      </button>
                      {!address.isDefault && (
                        <button className="flex-1 py-2 text-sm bg-black text-white rounded-md hover:bg-gray-800 transition">
                          Set as Default
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Profile Information</h2>
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-semibold mb-2">First Name</label>
                      <input
                        type="text"
                        defaultValue="Demo"
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold mb-2">Last Name</label>
                      <input
                        type="text"
                        defaultValue="User"
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block font-semibold mb-2">Email</label>
                    <input
                      type="email"
                      defaultValue={user.email}
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold mb-2">Phone</label>
                    <input
                      type="tel"
                      defaultValue={user.phone}
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                    />
                  </div>
                  <div className="pt-4 border-t border-gray-200">
                    <h3 className="font-bold mb-4">Change Password</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block font-semibold mb-2">Current Password</label>
                        <input
                          type="password"
                          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                        />
                      </div>
                      <div>
                        <label className="block font-semibold mb-2">New Password</label>
                        <input
                          type="password"
                          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                        />
                      </div>
                      <div>
                        <label className="block font-semibold mb-2">Confirm New Password</label>
                        <input
                          type="password"
                          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                        />
                      </div>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3 bg-black text-white rounded-md hover:bg-gray-800 transition"
                  >
                    Save Changes
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
