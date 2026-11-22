'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Mail, Phone, MapPin, Calendar, ShoppingBag } from 'lucide-react'
import { formatPrice } from '@/lib/utils'
import { AdminAuthCheck } from '@/components/AdminAuthCheck'
import { useRouter } from 'next/navigation'

interface Customer {
  id: string
  name: string
  email: string
  phone: string
  totalOrders: number
  totalSpent: number
  cashbackEarned: number
  cashbackUsed: number
  cashbackBalance: number
  joinedDate: string
  lastOrder: string
  address: string
}

export default function AdminCustomersPage() {
  const router = useRouter()
  
  const handleLogout = () => {
    localStorage.removeItem('adminLoggedIn')
    router.push('/admin/login')
  }

  const [customers] = useState<Customer[]>([
    {
      id: '1',
      name: 'Rahul Sharma',
      email: 'rahul@example.com',
      phone: '+91 98765 43210',
      totalOrders: 12,
      totalSpent: 18500,
      cashbackEarned: 925,
      cashbackUsed: 500,
      cashbackBalance: 425,
      joinedDate: '2024-01-15',
      lastOrder: '2024-11-21',
      address: '123 MG Road, Bangalore, Karnataka - 560001'
    },
    {
      id: '2',
      name: 'Priya Patel',
      email: 'priya@example.com',
      phone: '+91 98765 43211',
      totalOrders: 8,
      totalSpent: 12400,
      cashbackEarned: 620,
      cashbackUsed: 200,
      cashbackBalance: 420,
      joinedDate: '2024-02-20',
      lastOrder: '2024-11-21',
      address: '456 Park Street, Mumbai, Maharashtra - 400001'
    },
    {
      id: '3',
      name: 'Amit Kumar',
      email: 'amit@example.com',
      phone: '+91 98765 43212',
      totalOrders: 15,
      totalSpent: 22000,
      cashbackEarned: 1100,
      cashbackUsed: 800,
      cashbackBalance: 300,
      joinedDate: '2023-12-10',
      lastOrder: '2024-11-20',
      address: '789 Brigade Road, Bangalore, Karnataka - 560025'
    },
    {
      id: '4',
      name: 'Sneha Singh',
      email: 'sneha@example.com',
      phone: '+91 98765 43213',
      totalOrders: 5,
      totalSpent: 8900,
      cashbackEarned: 445,
      cashbackUsed: 0,
      cashbackBalance: 445,
      joinedDate: '2024-03-05',
      lastOrder: '2024-11-19',
      address: '321 Nehru Place, Delhi - 110019'
    },
  ])

  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null)

  const totalCustomers = customers.length
  const totalRevenue = customers.reduce((sum, c) => sum + c.totalSpent, 0)
  const totalCashbackPaid = customers.reduce((sum, c) => sum + c.cashbackEarned, 0)

  return (
    <AdminAuthCheck>
      <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <header className="bg-black text-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/admin" className="hover:text-gray-300">
                <ArrowLeft size={24} />
              </Link>
              <h1 className="text-2xl font-bold">Customer Management</h1>
            </div>
            <button 
              onClick={handleLogout}
              className="bg-white text-black px-4 py-2 rounded-md hover:bg-gray-100 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-gray-600 text-sm font-semibold mb-2">Total Customers</h3>
            <p className="text-3xl font-bold">{totalCustomers}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-gray-600 text-sm font-semibold mb-2">Total Revenue</h3>
            <p className="text-3xl font-bold">{formatPrice(totalRevenue)}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-gray-600 text-sm font-semibold mb-2">Cashback Paid</h3>
            <p className="text-3xl font-bold text-green-600">{formatPrice(totalCashbackPaid)}</p>
          </div>
        </div>

        {/* Customers List */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Customer</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Orders</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Total Spent</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Cashback Balance</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Last Order</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((customer) => (
                  <tr key={customer.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <p className="font-semibold">{customer.name}</p>
                      <p className="text-sm text-gray-600">{customer.email}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-semibold">{customer.totalOrders}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-bold">{formatPrice(customer.totalSpent)}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-semibold text-green-600">
                        {formatPrice(customer.cashbackBalance)}
                      </p>
                      <p className="text-xs text-gray-600">
                        Earned: {formatPrice(customer.cashbackEarned)}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm">{customer.lastOrder}</p>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => setSelectedCustomer(customer)}
                        className="text-blue-600 hover:text-blue-800 font-semibold text-sm"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Customer Details Modal */}
        {selectedCustomer && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                <h2 className="text-2xl font-bold">Customer Details</h2>
                <button
                  onClick={() => setSelectedCustomer(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>

              <div className="p-6 space-y-6">
                {/* Basic Info */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-bold mb-3">Contact Information</h3>
                    <div className="space-y-3">
                      <div className="flex items-start gap-2">
                        <Mail size={18} className="text-gray-400 mt-0.5" />
                        <div>
                          <p className="text-sm text-gray-600">Email</p>
                          <p className="font-semibold">{selectedCustomer.email}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <Phone size={18} className="text-gray-400 mt-0.5" />
                        <div>
                          <p className="text-sm text-gray-600">Phone</p>
                          <p className="font-semibold">{selectedCustomer.phone}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <MapPin size={18} className="text-gray-400 mt-0.5" />
                        <div>
                          <p className="text-sm text-gray-600">Address</p>
                          <p className="font-semibold">{selectedCustomer.address}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-bold mb-3">Account Details</h3>
                    <div className="space-y-3">
                      <div className="flex items-start gap-2">
                        <Calendar size={18} className="text-gray-400 mt-0.5" />
                        <div>
                          <p className="text-sm text-gray-600">Joined</p>
                          <p className="font-semibold">{selectedCustomer.joinedDate}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <ShoppingBag size={18} className="text-gray-400 mt-0.5" />
                        <div>
                          <p className="text-sm text-gray-600">Last Order</p>
                          <p className="font-semibold">{selectedCustomer.lastOrder}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Purchase Stats */}
                <div>
                  <h3 className="font-bold mb-3">Purchase Statistics</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-sm text-gray-600 mb-1">Total Orders</p>
                      <p className="text-2xl font-bold">{selectedCustomer.totalOrders}</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-sm text-gray-600 mb-1">Total Spent</p>
                      <p className="text-2xl font-bold">{formatPrice(selectedCustomer.totalSpent)}</p>
                    </div>
                  </div>
                </div>

                {/* Cashback Details */}
                <div>
                  <h3 className="font-bold mb-3">Cashback Details</h3>
                  <div className="border border-gray-200 rounded-lg p-4 space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Earned</span>
                      <span className="font-bold text-green-600">
                        {formatPrice(selectedCustomer.cashbackEarned)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Used</span>
                      <span className="font-bold">
                        {formatPrice(selectedCustomer.cashbackUsed)}
                      </span>
                    </div>
                    <div className="flex justify-between pt-3 border-t border-gray-200">
                      <span className="font-bold">Available Balance</span>
                      <span className="font-bold text-green-600 text-lg">
                        {formatPrice(selectedCustomer.cashbackBalance)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      </div>
    </AdminAuthCheck>
  )
}
