'use client'

import { useState, useCallback, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, Download, Calendar, CheckCircle, Circle, Truck, Package, Clock, RefreshCw } from 'lucide-react'
import { formatPrice } from '@/lib/utils'
import { AdminAuthCheck } from '@/components/AdminAuthCheck'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'

type OrderStatus = 'Pending' | 'Processing' | 'Packed' | 'Shipped' | 'In Transit' | 'Delivered' | 'Cancelled'

interface Order {
  id: string
  orderNumber: string
  customer: { name: string; email: string; phone: string }
  items: { name: string; quantity: number; price: number }[]
  subtotal: number
  cashback: number
  total: number
  status: OrderStatus
  paymentMethod: string
  shippingAddress: string
  date: string
  expectedDelivery: string
  statusHistory: { status: OrderStatus; date: string; time: string }[]
}

const STATUS_STEPS: OrderStatus[] = ['Pending', 'Processing', 'Packed', 'Shipped', 'In Transit', 'Delivered']

const STATUS_COLORS: Record<OrderStatus, string> = {
  'Pending':    'bg-orange-100 text-orange-700',
  'Processing': 'bg-yellow-100 text-yellow-700',
  'Packed':     'bg-blue-100 text-blue-700',
  'Shipped':    'bg-purple-100 text-purple-700',
  'In Transit': 'bg-indigo-100 text-indigo-700',
  'Delivered':  'bg-green-100 text-green-700',
  'Cancelled':  'bg-red-100 text-red-700',
}

function todayPlus(days: number) {
  const d = new Date()
  d.setDate(d.getDate() + days)
  return d.toISOString().split('T')[0]
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
}

const INITIAL_ORDERS: Order[] = [
  {
    id: '1',
    orderNumber: '#ORD-2024-248',
    customer: { name: 'Rahul Sharma', email: 'rahul@example.com', phone: '+91 98765 43210' },
    items: [
      { name: 'Oversized Graphic Tee', quantity: 1, price: 1299 },
      { name: 'Vintage Band Tee',      quantity: 1, price: 1499 },
    ],
    subtotal: 2798, cashback: 140, total: 2798,
    status: 'Pending',
    paymentMethod: 'UPI',
    shippingAddress: '123 MG Road, Bangalore, Karnataka - 560001',
    date: '2024-11-21',
    expectedDelivery: todayPlus(5),
    statusHistory: [{ status: 'Pending', date: '2024-11-21', time: '10:32 AM' }],
  },
  {
    id: '2',
    orderNumber: '#ORD-2024-247',
    customer: { name: 'Priya Patel', email: 'priya@example.com', phone: '+91 98765 43211' },
    items: [{ name: 'Classic Crew Neck Tee', quantity: 2, price: 899 }],
    subtotal: 1798, cashback: 90, total: 1798,
    status: 'Processing',
    paymentMethod: 'Card',
    shippingAddress: '456 Park Street, Mumbai, Maharashtra - 400001',
    date: '2024-11-21',
    expectedDelivery: todayPlus(4),
    statusHistory: [
      { status: 'Pending',    date: '2024-11-21', time: '09:15 AM' },
      { status: 'Processing', date: '2024-11-21', time: '11:00 AM' },
    ],
  },
  {
    id: '3',
    orderNumber: '#ORD-2024-246',
    customer: { name: 'Amit Kumar', email: 'amit@example.com', phone: '+91 98765 43212' },
    items: [{ name: 'Tie Dye Oversized Tee', quantity: 1, price: 1599 }],
    subtotal: 1599, cashback: 80, total: 1599,
    status: 'Shipped',
    paymentMethod: 'COD',
    shippingAddress: '789 Brigade Road, Bangalore, Karnataka - 560025',
    date: '2024-11-20',
    expectedDelivery: todayPlus(2),
    statusHistory: [
      { status: 'Pending',    date: '2024-11-20', time: '08:00 AM' },
      { status: 'Processing', date: '2024-11-20', time: '10:00 AM' },
      { status: 'Packed',     date: '2024-11-20', time: '02:00 PM' },
      { status: 'Shipped',    date: '2024-11-21', time: '09:00 AM' },
    ],
  },
  {
    id: '4',
    orderNumber: '#ORD-2024-245',
    customer: { name: 'Sneha Singh', email: 'sneha@example.com', phone: '+91 98765 43213' },
    items: [{ name: 'Heavyweight Box Tee', quantity: 2, price: 1699 }],
    subtotal: 3398, cashback: 170, total: 3398,
    status: 'Delivered',
    paymentMethod: 'UPI',
    shippingAddress: '321 Nehru Place, Delhi - 110019',
    date: '2024-11-19',
    expectedDelivery: '2024-11-24',
    statusHistory: [
      { status: 'Pending',    date: '2024-11-19', time: '07:00 AM' },
      { status: 'Processing', date: '2024-11-19', time: '09:00 AM' },
      { status: 'Packed',     date: '2024-11-19', time: '01:00 PM' },
      { status: 'Shipped',    date: '2024-11-20', time: '08:00 AM' },
      { status: 'In Transit', date: '2024-11-21', time: '11:00 AM' },
      { status: 'Delivered',  date: '2024-11-24', time: '03:30 PM' },
    ],
  },
]

export default function AdminOrdersPage() {
  const router = useRouter()
  const handleLogout = () => { localStorage.removeItem('adminLoggedIn'); router.push('/admin/login') }

  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [editingDelivery, setEditingDelivery] = useState(false)
  const [deliveryDate, setDeliveryDate] = useState('')

  const loadOrders = useCallback(async () => {
    setLoading(true)
    try {
      const res  = await fetch('/api/orders')
      const data = await res.json()
      if (Array.isArray(data)) setOrders(data)
    } catch { toast.error('Failed to load orders') }
    finally  { setLoading(false) }
  }, [])

  useEffect(() => { loadOrders() }, [loadOrders])

  const filteredOrders = filterStatus === 'all'
    ? orders
    : orders.filter(o => o.status.toLowerCase() === filterStatus.toLowerCase())

  const updateStatus = async (orderId: string, newStatus: OrderStatus) => {
    const now     = new Date()
    const dateStr = now.toISOString().split('T')[0]
    const timeStr = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })

    const order = orders.find(o => o.id === orderId)!
    const alreadyHas = order.statusHistory.some((h: {status: string}) => h.status === newStatus)
    const newHistory = alreadyHas
      ? order.statusHistory
      : [...order.statusHistory, { status: newStatus, date: dateStr, time: timeStr }]

    const res = await fetch('/api/orders', {
      method:  'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ id: orderId, status: newStatus, statusHistory: newHistory }),
    })

    if (res.ok) {
      const updated = await res.json()
      setOrders(prev => prev.map(o => o.id === orderId ? updated : o))
      setSelectedOrder(updated)
      toast.success(`Status updated to ${newStatus}`)
    } else {
      toast.error('Failed to update status')
    }
  }

  const saveDeliveryDate = async (orderId: string) => {
    const res = await fetch('/api/orders', {
      method:  'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ id: orderId, expectedDelivery: deliveryDate }),
    })
    if (res.ok) {
      const updated = await res.json()
      setOrders(prev => prev.map(o => o.id === orderId ? updated : o))
      setSelectedOrder(updated)
      setEditingDelivery(false)
      toast.success('Delivery date updated')
    } else {
      toast.error('Failed to update delivery date')
    }
  }

  // Open modal — sync local selectedOrder with current state
  const openOrder = (order: Order) => {
    const fresh = orders.find(o => o.id === order.id) || order
    setSelectedOrder(fresh)
    setDeliveryDate(fresh.expectedDelivery)
    setEditingDelivery(false)
  }

  return (
    <AdminAuthCheck>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-black text-white">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Link href="/admin" className="hover:text-gray-300"><ArrowLeft size={24} /></Link>
                <h1 className="text-xl sm:text-2xl font-bold">Orders Management</h1>
              </div>
              <div className="flex items-center gap-2 sm:gap-4">
                <button onClick={loadOrders} className="p-2 bg-white text-black rounded-md hover:bg-gray-100 transition" title="Refresh">
                  <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
                </button>
                <button className="hidden sm:flex items-center gap-2 bg-white text-black px-4 py-2 rounded-md hover:bg-gray-100 transition text-sm">
                  <Download size={16} /> Export
                </button>
                <button onClick={handleLogout} className="bg-white text-black px-3 sm:px-4 py-2 rounded-md hover:bg-gray-100 transition text-sm">
                  Logout
                </button>
              </div>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-6 sm:py-8">
          {/* Stats Filter Tabs */}
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-4 mb-6">
            {[
              { label: 'All',        status: 'all',        count: orders.length },
              { label: 'Pending',    status: 'pending',    count: orders.filter(o => o.status === 'Pending').length },
              { label: 'Processing', status: 'processing', count: orders.filter(o => o.status === 'Processing').length },
              { label: 'Packed',     status: 'packed',     count: orders.filter(o => o.status === 'Packed').length },
              { label: 'Shipped',    status: 'shipped',    count: orders.filter(o => o.status === 'Shipped').length },
              { label: 'Delivered',  status: 'delivered',  count: orders.filter(o => o.status === 'Delivered').length },
            ].map(stat => (
              <button
                key={stat.status}
                onClick={() => setFilterStatus(stat.status)}
                className={`bg-white rounded-lg shadow p-3 text-center hover:shadow-md transition ${filterStatus === stat.status ? 'ring-2 ring-black' : ''}`}
              >
                <p className="text-xl font-bold">{stat.count}</p>
                <p className="text-xs text-gray-600">{stat.label}</p>
              </button>
            ))}
          </div>

          {/* Orders Table */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-4 sm:px-6 py-4 text-left text-sm font-semibold">Order</th>
                    <th className="px-4 sm:px-6 py-4 text-left text-sm font-semibold">Customer</th>
                    <th className="px-4 sm:px-6 py-4 text-left text-sm font-semibold hidden sm:table-cell">Total</th>
                    <th className="px-4 sm:px-6 py-4 text-left text-sm font-semibold hidden md:table-cell">Expected Delivery</th>
                    <th className="px-4 sm:px-6 py-4 text-left text-sm font-semibold">Status</th>
                    <th className="px-4 sm:px-6 py-4 text-left text-sm font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map(order => (
                    <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="px-4 sm:px-6 py-4">
                        <p className="font-semibold text-sm">{order.orderNumber}</p>
                        <p className="text-xs text-gray-500">{formatDate(order.date)}</p>
                      </td>
                      <td className="px-4 sm:px-6 py-4">
                        <p className="font-semibold text-sm">{order.customer.name}</p>
                        <p className="text-xs text-gray-500 hidden sm:block">{order.customer.phone}</p>
                      </td>
                      <td className="px-4 sm:px-6 py-4 hidden sm:table-cell">
                        <p className="font-bold">{formatPrice(order.total)}</p>
                        <p className="text-xs text-green-600">+{formatPrice(order.cashback)} CB</p>
                      </td>
                      <td className="px-4 sm:px-6 py-4 hidden md:table-cell">
                        <div className="flex items-center gap-1 text-sm">
                          <Calendar size={14} className="text-gray-400" />
                          <span>{formatDate(order.expectedDelivery)}</span>
                        </div>
                      </td>
                      <td className="px-4 sm:px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${STATUS_COLORS[order.status]}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-4 sm:px-6 py-4">
                        <button onClick={() => openOrder(order)} className="text-blue-600 hover:text-blue-800 font-semibold text-sm">
                          Manage
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Order Detail Modal */}
        {selectedOrder && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-3 sm:p-4">
            <div className="bg-white rounded-lg w-full max-w-3xl max-h-[92vh] overflow-y-auto">
              {/* Modal Header */}
              <div className="p-4 sm:p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white z-10">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold">{selectedOrder.orderNumber}</h2>
                  <p className="text-sm text-gray-500">{formatDate(selectedOrder.date)} · {selectedOrder.paymentMethod}</p>
                </div>
                <button onClick={() => setSelectedOrder(null)} className="text-gray-400 hover:text-gray-600 text-2xl leading-none">✕</button>
              </div>

              <div className="p-4 sm:p-6 space-y-6">

                {/* ── Delivery Timeline ── */}
                <div>
                  <h3 className="font-bold text-lg mb-4">Order Timeline</h3>
                  <div className="relative">
                    {STATUS_STEPS.map((step, idx) => {
                      const historyEntry = selectedOrder.statusHistory.find(h => h.status === step)
                      const stepIndex = STATUS_STEPS.indexOf(selectedOrder.status)
                      const isDone    = idx <= stepIndex && selectedOrder.status !== 'Cancelled'
                      const isCurrent = step === selectedOrder.status

                      return (
                        <div key={step} className="flex gap-3 sm:gap-4 mb-4 last:mb-0">
                          {/* Icon + line */}
                          <div className="flex flex-col items-center">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                              isDone
                                ? isCurrent ? 'bg-black text-white' : 'bg-green-500 text-white'
                                : 'bg-gray-200 text-gray-400'
                            }`}>
                              {isDone && !isCurrent
                                ? <CheckCircle size={16} />
                                : isCurrent
                                  ? step === 'Shipped' || step === 'In Transit'
                                    ? <Truck size={16} />
                                    : step === 'Packed'
                                      ? <Package size={16} />
                                      : <Clock size={16} />
                                  : <Circle size={16} />
                              }
                            </div>
                            {idx < STATUS_STEPS.length - 1 && (
                              <div className={`w-0.5 h-8 mt-1 ${isDone && idx < stepIndex ? 'bg-green-400' : 'bg-gray-200'}`} />
                            )}
                          </div>

                          {/* Text */}
                          <div className="pb-2">
                            <p className={`font-semibold text-sm ${isCurrent ? 'text-black' : isDone ? 'text-green-700' : 'text-gray-400'}`}>
                              {step}
                              {isCurrent && <span className="ml-2 text-xs bg-black text-white px-2 py-0.5 rounded-full">Current</span>}
                            </p>
                            {historyEntry && (
                              <p className="text-xs text-gray-500">{formatDate(historyEntry.date)} at {historyEntry.time}</p>
                            )}
                            {!historyEntry && (
                              <p className="text-xs text-gray-400">Not reached yet</p>
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* ── Expected Delivery ── */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center gap-2">
                      <Calendar size={18} className="text-blue-600" />
                      <span className="font-semibold text-blue-800">Expected Delivery</span>
                    </div>
                    {!editingDelivery ? (
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-blue-900">{formatDate(selectedOrder.expectedDelivery)}</span>
                        <button
                          onClick={() => setEditingDelivery(true)}
                          className="text-xs text-blue-600 underline"
                        >
                          Edit
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <input
                          type="date"
                          value={deliveryDate}
                          onChange={e => setDeliveryDate(e.target.value)}
                          className="border border-blue-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        <button
                          onClick={() => saveDeliveryDate(selectedOrder.id)}
                          className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
                        >
                          Save
                        </button>
                        <button onClick={() => setEditingDelivery(false)} className="text-sm text-gray-500">Cancel</button>
                      </div>
                    )}
                  </div>
                </div>

                {/* ── Update Status ── */}
                <div>
                  <h3 className="font-bold text-lg mb-3">Update Status</h3>
                  <div className="flex flex-wrap gap-2">
                    {(STATUS_STEPS as OrderStatus[]).concat(['Cancelled']).map(status => (
                      <button
                        key={status}
                        onClick={() => updateStatus(selectedOrder.id, status as OrderStatus)}
                        className={`px-3 sm:px-4 py-2 rounded-md font-semibold text-sm transition ${
                          selectedOrder.status === status
                            ? 'bg-black text-white'
                            : status === 'Cancelled'
                              ? 'bg-red-50 text-red-700 hover:bg-red-100 border border-red-200'
                              : 'bg-gray-100 hover:bg-gray-200'
                        }`}
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                </div>

                {/* ── Customer Info ── */}
                <div>
                  <h3 className="font-bold text-lg mb-3">Customer</h3>
                  <div className="bg-gray-50 rounded-lg p-4 space-y-1 text-sm">
                    <p><span className="font-semibold">Name:</span> {selectedOrder.customer.name}</p>
                    <p><span className="font-semibold">Email:</span> {selectedOrder.customer.email}</p>
                    <p><span className="font-semibold">Phone:</span> {selectedOrder.customer.phone}</p>
                    <p><span className="font-semibold">Address:</span> {selectedOrder.shippingAddress}</p>
                  </div>
                </div>

                {/* ── Order Items ── */}
                <div>
                  <h3 className="font-bold text-lg mb-3">Items</h3>
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    {selectedOrder.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between p-4 border-b border-gray-100 last:border-0 text-sm">
                        <div>
                          <p className="font-semibold">{item.name}</p>
                          <p className="text-gray-500">Qty: {item.quantity}</p>
                        </div>
                        <p className="font-bold">{formatPrice(item.price * item.quantity)}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ── Summary ── */}
                <div className="bg-gray-50 rounded-lg p-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Subtotal</span><span>{formatPrice(selectedOrder.subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-green-600 font-semibold">
                    <span>Cashback (5%)</span><span>+{formatPrice(selectedOrder.cashback)}</span>
                  </div>
                  <div className="flex justify-between text-base font-bold pt-2 border-t border-gray-200">
                    <span>Total Paid</span><span>{formatPrice(selectedOrder.total)}</span>
                  </div>
                </div>

              </div>
            </div>
          </div>
        )}
      </div>
    </AdminAuthCheck>
  )
}
