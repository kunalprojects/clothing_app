'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Search, Filter, Download } from 'lucide-react'
import { formatPrice } from '@/lib/utils'
import { AdminAuthCheck } from '@/components/AdminAuthCheck'
import { useRouter } from 'next/navigation'

interface Order {
  id: string
  orderNumber: string
  customer: {
    name: string
    email: string
    phone: string
  }
  items: {
    name: string
    quantity: number
    price: number
  }[]
  subtotal: number
  cashback: number // 5% cashback
  total: number
  status: 'Pending' | 'Processing' | 'Packed' | 'Shipped' | 'Delivered' | 'Cancelled'
  paymentMethod: string
  shippingAddress: string
  date: string
}

export default function AdminOrdersPage() {
  const router = useRouter()
  
  const handleLogout = () => {
    localStorage.removeItem('adminLoggedIn')
    router.push('/admin/login')
  }

  const [orders] = useState<Order[]>([
    {
      id: '1',
      orderNumber: '#ORD-2024-248',
      customer: {
        name: 'Rahul Sharma',
        email: 'rahul@example.com',
        phone: '+91 98765 43210'
      },
      items: [
        { name: 'Oversized Graphic Tee', quantity: 1, price: 1299 },
        { name: 'Vintage Band Tee', quantity: 1, price: 1499 }
      ],
      subtotal: 2798,
      cashback: 140, // 5% of 2798
      total: 2798,
      status: 'Pending',
      paymentMethod: 'UPI',
      shippingAddress: '123 MG Road, Bangalore, Karnataka - 560001',
      date: '2024-11-21'
    },
    {
      id: '2',
      orderNumber: '#ORD-2024-247',
      customer: {
        name: 'Priya Patel',
        email: 'priya@example.com',
        phone: '+91 98765 43211'
      },
      items: [
        { name: 'Classic Crew Neck Tee', quantity: 2, price: 899 }
      ],
      subtotal: 1798,
      cashback: 90,
      total: 1798,
      status: 'Processing',
      paymentMethod: 'Card',
      shippingAddress: '456 Park Street, Mumbai, Maharashtra - 400001',
      date: '2024-11-21'
    },
    {
      id: '3',
      orderNumber: '#ORD-2024-246',
      customer: {
        name: 'Amit Kumar',
        email: 'amit@example.com',
        phone: '+91 98765 43212'
      },
      items: [
        { name: 'Tie Dye Oversized Tee', quantity: 1, price: 1599 }
      ],
      subtotal: 1599,
      cashback: 80,
      total: 1599,
      status: 'Shipped',
      paymentMethod: 'COD',
      shippingAddress: '789 Brigade Road, Bangalore, Karnataka - 560025',
      date: '2024-11-20'
    },
    {
      id: '4',
      orderNumber: '#ORD-2024-245',
      customer: {
        name: 'Sneha Singh',
        email: 'sneha@example.com',
        phone: '+91 98765 43213'
      },
      items: [
        { name: 'Heavyweight Box Tee', quantity: 2, price: 1699 }
      ],
      subtotal: 3398,
      cashback: 170,
      total: 3398,
      status: 'Delivered',
      paymentMethod: 'UPI',
      shippingAddress: '321 Nehru Place, Delhi - 110019',
      date: '2024-11-19'
    },
  ])

  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [filterStatus, setFilterStatus] = useState<string>('all')

  const filteredOrders = filterStatus === 'all' 
    ? orders 
    : orders.filter(o => o.status.toLowerCase() === filterStatus)

  const statusColors = {
    'Pending': 'bg-orange-100 text-orange-700',
    'Processing': 'bg-yellow-100 text-yellow-700',
    'Packed': 'bg-blue-100 text-blue-700',
    'Shipped': 'bg-purple-100 text-purple-700',
    'Delivered': 'bg-green-100 text-green-700',
    'Cancelled': 'bg-red-100 text-red-700'
  }

  const updateOrderStatus = (orderId: string, newStatus: Order['status']) => {
    // In real app, this would update the database
    alert(`Order ${orderId} status updated to ${newStatus}`)
  }

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
              <h1 className="text-2xl font-bold">Orders Management</h1>
            </div>
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-md hover:bg-gray-100 transition">
                <Download size={20} />
                Export
              </button>
              <button 
                onClick={handleLogout}
                className="bg-white text-black px-4 py-2 rounded-md hover:bg-gray-100 transition"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
          {[
            { label: 'All Orders', count: orders.length, status: 'all' },
            { label: 'Pending', count: orders.filter(o => o.status === 'Pending').length, status: 'pending' },
            { label: 'Processing', count: orders.filter(o => o.status === 'Processing').length, status: 'processing' },
            { label: 'Shipped', count: orders.filter(o => o.status === 'Shipped').length, status: 'shipped' },
            { label: 'Delivered', count: orders.filter(o => o.status === 'Delivered').length, status: 'delivered' },
          ].map((stat) => (
            <button
              key={stat.status}
              onClick={() => setFilterStatus(stat.status)}
              className={`bg-white rounded-lg shadow p-4 text-center hover:shadow-md transition ${
                filterStatus === stat.status ? 'ring-2 ring-black' : ''
              }`}
            >
              <p className="text-2xl font-bold">{stat.count}</p>
              <p className="text-sm text-gray-600">{stat.label}</p>
            </button>
          ))}
        </div>

        {/* Orders List */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Order</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Customer</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Items</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Total</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Cashback</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <p className="font-semibold">{order.orderNumber}</p>
                      <p className="text-sm text-gray-600">{order.date}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-semibold">{order.customer.name}</p>
                      <p className="text-sm text-gray-600">{order.customer.phone}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm">
                        {order.items.reduce((sum, item) => sum + item.quantity, 0)} items
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-bold">{formatPrice(order.total)}</p>
                      <p className="text-xs text-gray-600">{order.paymentMethod}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm font-semibold text-green-600">
                        +{formatPrice(order.cashback)}
                      </p>
                      <p className="text-xs text-gray-600">5% earned</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${statusColors[order.status]}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => setSelectedOrder(order)}
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

        {/* Order Details Modal */}
        {selectedOrder && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                <h2 className="text-2xl font-bold">{selectedOrder.orderNumber}</h2>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>

              <div className="p-6 space-y-6">
                {/* Customer Info */}
                <div>
                  <h3 className="font-bold text-lg mb-3">Customer Information</h3>
                  <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                    <p><span className="font-semibold">Name:</span> {selectedOrder.customer.name}</p>
                    <p><span className="font-semibold">Email:</span> {selectedOrder.customer.email}</p>
                    <p><span className="font-semibold">Phone:</span> {selectedOrder.customer.phone}</p>
                    <p><span className="font-semibold">Address:</span> {selectedOrder.shippingAddress}</p>
                  </div>
                </div>

                {/* Order Items */}
                <div>
                  <h3 className="font-bold text-lg mb-3">Order Items</h3>
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    {selectedOrder.items.map((item, index) => (
                      <div key={index} className="flex justify-between p-4 border-b border-gray-200 last:border-0">
                        <div>
                          <p className="font-semibold">{item.name}</p>
                          <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                        </div>
                        <p className="font-bold">{formatPrice(item.price * item.quantity)}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Order Summary */}
                <div>
                  <h3 className="font-bold text-lg mb-3">Order Summary</h3>
                  <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>{formatPrice(selectedOrder.subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-green-600 font-semibold">
                      <span>Cashback (5%)</span>
                      <span>+{formatPrice(selectedOrder.cashback)}</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold pt-2 border-t border-gray-200">
                      <span>Total Paid</span>
                      <span>{formatPrice(selectedOrder.total)}</span>
                    </div>
                    <p className="text-sm text-gray-600 pt-2">
                      Payment Method: <span className="font-semibold">{selectedOrder.paymentMethod}</span>
                    </p>
                  </div>
                </div>

                {/* Update Status */}
                <div>
                  <h3 className="font-bold text-lg mb-3">Update Order Status</h3>
                  <div className="flex flex-wrap gap-2">
                    {['Pending', 'Processing', 'Packed', 'Shipped', 'Delivered'].map((status) => (
                      <button
                        key={status}
                        onClick={() => updateOrderStatus(selectedOrder.id, status as Order['status'])}
                        className={`px-4 py-2 rounded-md font-semibold transition ${
                          selectedOrder.status === status
                            ? 'bg-black text-white'
                            : 'bg-gray-100 hover:bg-gray-200'
                        }`}
                      >
                        {status}
                      </button>
                    ))}
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
