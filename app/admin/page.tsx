'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Package, ShoppingBag, Users, TrendingUp, Plus } from 'lucide-react'
import { AdminAuthCheck } from '@/components/AdminAuthCheck'
import { useRouter } from 'next/navigation'

export default function AdminDashboard() {
  const router = useRouter()
  
  const handleLogout = () => {
    localStorage.removeItem('adminLoggedIn')
    router.push('/admin/login')
  }

  // Demo stats
  const stats = {
    totalOrders: 248,
    totalRevenue: 324500,
    totalProducts: 12,
    totalCustomers: 186,
    pendingOrders: 15,
    lowStockItems: 3
  }

  return (
    <AdminAuthCheck>
      <div className="min-h-screen bg-gray-50">
        {/* Admin Header */}
        <header className="bg-black text-white">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <h1 className="text-2xl font-bold">VIBE Admin</h1>
                <span className="text-sm bg-white text-black px-3 py-1 rounded-full">Dashboard</span>
              </div>
              <div className="flex items-center gap-4">
                <Link href="/" className="text-sm hover:text-gray-300 transition">
                  View Store →
                </Link>
                <button 
                  onClick={handleLogout}
                  className="text-sm bg-white text-black px-4 py-2 rounded-md hover:bg-gray-100 transition"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-600 text-sm font-semibold">Total Orders</h3>
              <ShoppingBag className="text-blue-500" size={24} />
            </div>
            <p className="text-3xl font-bold">{stats.totalOrders}</p>
            <p className="text-sm text-green-600 mt-2">↑ 12% from last month</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-600 text-sm font-semibold">Total Revenue</h3>
              <TrendingUp className="text-green-500" size={24} />
            </div>
            <p className="text-3xl font-bold">₹{stats.totalRevenue.toLocaleString()}</p>
            <p className="text-sm text-green-600 mt-2">↑ 18% from last month</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-600 text-sm font-semibold">Total Products</h3>
              <Package className="text-purple-500" size={24} />
            </div>
            <p className="text-3xl font-bold">{stats.totalProducts}</p>
            <p className="text-sm text-orange-600 mt-2">{stats.lowStockItems} low stock</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-600 text-sm font-semibold">Total Customers</h3>
              <Users className="text-pink-500" size={24} />
            </div>
            <p className="text-3xl font-bold">{stats.totalCustomers}</p>
            <p className="text-sm text-green-600 mt-2">↑ 8% from last month</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Link
            href="/admin/products"
            className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition group"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition">
                <Package size={24} className="text-blue-600" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Manage Products</h3>
                <p className="text-sm text-gray-600">Add, edit, or remove products</p>
              </div>
            </div>
          </Link>

          <Link
            href="/admin/orders"
            className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition group"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-lg group-hover:bg-green-200 transition">
                <ShoppingBag size={24} className="text-green-600" />
              </div>
              <div>
                <h3 className="font-bold text-lg">View Orders</h3>
                <p className="text-sm text-gray-600">{stats.pendingOrders} pending orders</p>
              </div>
            </div>
          </Link>

          <Link
            href="/admin/customers"
            className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition group"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-100 rounded-lg group-hover:bg-purple-200 transition">
                <Users size={24} className="text-purple-600" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Customers</h3>
                <p className="text-sm text-gray-600">View customer details</p>
              </div>
            </div>
          </Link>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4">Recent Orders</h2>
          <div className="space-y-4">
            {[
              { id: '#ORD-2024-248', customer: 'Rahul Sharma', amount: 1999, status: 'Pending', time: '10 mins ago' },
              { id: '#ORD-2024-247', customer: 'Priya Patel', amount: 2599, status: 'Processing', time: '1 hour ago' },
              { id: '#ORD-2024-246', customer: 'Amit Kumar', amount: 1299, status: 'Shipped', time: '2 hours ago' },
              { id: '#ORD-2024-245', customer: 'Sneha Singh', amount: 3499, status: 'Delivered', time: '5 hours ago' },
            ].map((order) => (
              <div key={order.id} className="flex items-center justify-between py-4 border-b border-gray-100 last:border-0">
                <div className="flex-1">
                  <p className="font-semibold">{order.id}</p>
                  <p className="text-sm text-gray-600">{order.customer}</p>
                </div>
                <div className="flex-1 text-center">
                  <p className="font-bold">₹{order.amount}</p>
                </div>
                <div className="flex-1 text-center">
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                    order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                    order.status === 'Shipped' ? 'bg-blue-100 text-blue-700' :
                    order.status === 'Processing' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-orange-100 text-orange-700'
                  }`}>
                    {order.status}
                  </span>
                </div>
                <div className="flex-1 text-right text-sm text-gray-600">
                  {order.time}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <Link
              href="/admin/orders"
              className="inline-block px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition"
            >
              View All Orders
            </Link>
          </div>
        </div>
      </div>
    </AdminAuthCheck>
  )
}
