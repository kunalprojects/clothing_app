'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Plus, Edit, Trash2, AlertCircle, Package, RefreshCw } from 'lucide-react'
import { useStore, deriveStockFlags } from '@/lib/store'
import type { Product } from '@/lib/store'
import { formatPrice } from '@/lib/utils'
import { AdminAuthCheck } from '@/components/AdminAuthCheck'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'

function stockLabel(inventory: number) {
  if (inventory === 0) return { label: 'OUT OF STOCK', color: 'bg-red-100 text-red-700' }
  if (inventory <= 5)  return { label: 'LOW STOCK',   color: 'bg-orange-100 text-orange-700' }
  return                      { label: 'IN STOCK',    color: 'bg-green-100 text-green-700' }
}

export default function AdminProductsPage() {
  const router = useRouter()
  const handleLogout = () => { localStorage.removeItem('adminLoggedIn'); router.push('/admin/login') }

  const products     = useStore(s => s.products)
  const setProducts  = useStore(s => s.setProducts)
  const updateProduct = useStore(s => s.updateProduct)
  const deleteProduct = useStore(s => s.deleteProduct)
  const addProduct   = useStore(s => s.addProduct)

  const [loading, setLoading]  = useState(false)
  const [showAdd, setShowAdd]  = useState(false)
  const [editing, setEditing]  = useState<Product | null>(null)

  const refreshProducts = useCallback(async () => {
    setLoading(true)
    try {
      const res  = await fetch('/api/products')
      const data = await res.json()
      if (Array.isArray(data)) setProducts(data)
    } catch { toast.error('Failed to load products') }
    finally  { setLoading(false) }
  }, [setProducts])

  useEffect(() => { refreshProducts() }, [refreshProducts])

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this product?')) return
    const res = await fetch(`/api/products?id=${id}`, { method: 'DELETE' })
    if (res.ok) {
      deleteProduct(id)
      toast.success('Product deleted')
    } else {
      toast.error('Delete failed')
    }
  }

  const handleSave = async (updated: Product) => {
    const res = await fetch('/api/products', {
      method:  'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(updated),
    })
    if (res.ok) {
      const saved = await res.json()
      updateProduct(saved)
      setEditing(null)
      toast.success('Product updated')
    } else {
      toast.error('Update failed')
    }
  }

  const handleAdd = async (product: Product) => {
    const res = await fetch('/api/products', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(product),
    })
    if (res.ok) {
      const saved = await res.json()
      addProduct(saved)
      setShowAdd(false)
      toast.success('Product added!')
    } else {
      toast.error('Failed to add product')
    }
  }

  return (
    <AdminAuthCheck>
      <div className="min-h-screen bg-gray-50">

        {/* Header */}
        <header className="bg-black text-white">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Link href="/admin" className="hover:text-gray-300"><ArrowLeft size={24} /></Link>
                <h1 className="text-xl sm:text-2xl font-bold">Product Management</h1>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={refreshProducts} className="p-2 bg-white text-black rounded-md hover:bg-gray-100 transition" title="Refresh">
                  <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
                </button>
                <button
                  onClick={() => setShowAdd(true)}
                  className="flex items-center gap-2 bg-white text-black px-3 sm:px-4 py-2 rounded-md hover:bg-gray-100 transition text-sm font-semibold"
                >
                  <Plus size={18} />
                  <span className="hidden sm:inline">Add New Product</span>
                  <span className="sm:hidden">Add</span>
                </button>
                <button onClick={handleLogout} className="bg-white text-black px-3 sm:px-4 py-2 rounded-md hover:bg-gray-100 transition text-sm">
                  Logout
                </button>
              </div>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-6 sm:py-8">

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-lg shadow p-4 sm:p-6">
              <p className="text-gray-500 text-xs sm:text-sm font-semibold mb-1">Total Products</p>
              <p className="text-2xl sm:text-3xl font-bold">{products.length}</p>
            </div>
            <div className="bg-white rounded-lg shadow p-4 sm:p-6">
              <p className="text-gray-500 text-xs sm:text-sm font-semibold mb-1">In Stock</p>
              <p className="text-2xl sm:text-3xl font-bold text-green-600">
                {products.filter(p => p.inventory > 5).length}
              </p>
            </div>
            <div className="bg-white rounded-lg shadow p-4 sm:p-6">
              <p className="text-gray-500 text-xs sm:text-sm font-semibold mb-1">Low Stock</p>
              <p className="text-2xl sm:text-3xl font-bold text-orange-600">
                {products.filter(p => p.inventory > 0 && p.inventory <= 5).length}
              </p>
            </div>
            <div className="bg-white rounded-lg shadow p-4 sm:p-6">
              <p className="text-gray-500 text-xs sm:text-sm font-semibold mb-1">Out of Stock</p>
              <p className="text-2xl sm:text-3xl font-bold text-red-600">
                {products.filter(p => p.inventory === 0).length}
              </p>
            </div>
          </div>

          {/* Alert */}
          {products.some(p => p.inventory <= 5) && (
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6 flex items-start gap-3">
              <AlertCircle className="text-orange-600 flex-shrink-0 mt-0.5" size={20} />
              <div>
                <p className="font-semibold text-orange-800">Low Stock Alert</p>
                <p className="text-sm text-orange-700">
                  {products.filter(p => p.inventory > 0 && p.inventory <= 5).length > 0 &&
                    `${products.filter(p => p.inventory > 0 && p.inventory <= 5).length} product(s) running low. `}
                  {products.filter(p => p.inventory === 0).length > 0 &&
                    `${products.filter(p => p.inventory === 0).length} product(s) out of stock.`}
                </p>
              </div>
            </div>
          )}

          {/* Loading state */}
          {loading && products.length === 0 && (
            <div className="bg-white rounded-lg shadow p-12 text-center">
              <RefreshCw size={32} className="animate-spin mx-auto text-gray-400 mb-3" />
              <p className="text-gray-500">Loading products from database...</p>
            </div>
          )}

          {/* Table */}
          {products.length > 0 && (
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[640px]">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-4 sm:px-6 py-4 text-left text-sm font-semibold">Product</th>
                      <th className="px-4 sm:px-6 py-4 text-left text-sm font-semibold">Price</th>
                      <th className="px-4 sm:px-6 py-4 text-left text-sm font-semibold">Collections</th>
                      <th className="px-4 sm:px-6 py-4 text-left text-sm font-semibold">Units in Stock</th>
                      <th className="px-4 sm:px-6 py-4 text-left text-sm font-semibold">Units Sold</th>
                      <th className="px-4 sm:px-6 py-4 text-left text-sm font-semibold">Status</th>
                      <th className="px-4 sm:px-6 py-4 text-left text-sm font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map(p => {
                      const ss = stockLabel(p.inventory)
                      return (
                        <tr key={p.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="px-4 sm:px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="relative w-12 h-12 sm:w-14 sm:h-14 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                                <Image
                                  src={p.image}
                                  alt={p.name}
                                  fill
                                  className="object-cover"
                                  unoptimized={p.image.startsWith('data:') || p.image.includes('supabase')}
                                />
                              </div>
                              <div>
                                <p className="font-semibold text-sm">{p.name}</p>
                                <p className="text-xs text-gray-500">{p.category}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 sm:px-6 py-4">
                            <p className="font-semibold text-sm">{formatPrice(p.price)}</p>
                            {p.originalPrice && <p className="text-xs text-gray-400 line-through">{formatPrice(p.originalPrice)}</p>}
                          </td>
                          <td className="px-4 sm:px-6 py-4">
                            <div className="flex flex-col gap-1">
                              {p.isNew        && <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full w-fit whitespace-nowrap">New Arrival</span>}
                              {p.isBestSeller && <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full w-fit whitespace-nowrap">Best Seller</span>}
                              {!p.isNew && !p.isBestSeller && <span className="text-xs text-gray-400">—</span>}
                            </div>
                          </td>
                          <td className="px-4 sm:px-6 py-4">
                            <div className="flex items-center gap-1.5">
                              <Package size={14} className="text-gray-400 flex-shrink-0" />
                              <span className={`font-bold text-sm ${p.inventory === 0 ? 'text-red-600' : p.inventory <= 5 ? 'text-orange-600' : 'text-green-600'}`}>
                                {p.inventory}
                              </span>
                            </div>
                          </td>
                          <td className="px-4 sm:px-6 py-4">
                            <span className="text-sm text-gray-700 font-medium">{p.sold}</span>
                            <span className="text-xs text-gray-400 ml-1">units</span>
                          </td>
                          <td className="px-4 sm:px-6 py-4">
                            <span className={`px-2.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${ss.color}`}>
                              {ss.label}
                            </span>
                          </td>
                          <td className="px-4 sm:px-6 py-4">
                            <div className="flex items-center gap-1">
                              <button onClick={() => setEditing(p)} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded transition" title="Edit">
                                <Edit size={16} />
                              </button>
                              <button onClick={() => handleDelete(p.id)} className="p-1.5 text-red-600 hover:bg-red-50 rounded transition" title="Delete">
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {editing && <EditModal product={editing} onClose={() => setEditing(null)} onSave={handleSave} />}
        {showAdd  && <AddModal onClose={() => setShowAdd(false)} onAdd={handleAdd} />}
      </div>
    </AdminAuthCheck>
  )
}

// ─── Edit Modal ──────────────────────────────────────────────────────────────
function EditModal({ product, onClose, onSave }: { product: Product; onClose: () => void; onSave: (p: Product) => void }) {
  const [form, setForm] = useState({ ...product })

  const setInventory = (val: number) => {
    setForm(f => ({ ...f, inventory: val, ...deriveStockFlags(val) }))
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-xl font-bold">Edit Product</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl leading-none">✕</button>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-1">Product Name</label>
            <input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-1">Price (₹)</label>
              <input type="number" value={form.price} onChange={e => setForm({ ...form, price: Number(e.target.value) })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black" />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Original Price (₹)</label>
              <input type="number" value={form.originalPrice ?? ''} onChange={e => setForm({ ...form, originalPrice: Number(e.target.value) || undefined })}
                placeholder="Optional"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-1">Units in Stock</label>
              <input type="number" min={0} value={form.inventory} onChange={e => setInventory(Number(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black" />
              <p className={`text-xs mt-1 font-semibold ${form.inventory === 0 ? 'text-red-600' : form.inventory <= 5 ? 'text-orange-600' : 'text-green-600'}`}>
                → {form.inventory === 0 ? 'OUT OF STOCK' : form.inventory <= 5 ? 'LOW STOCK' : 'IN STOCK'}
              </p>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Units Sold</label>
              <input type="number" min={0} value={form.sold} onChange={e => setForm({ ...form, sold: Number(e.target.value) })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Collections</label>
            <div className="flex flex-col sm:flex-row gap-3">
              <label className={`flex items-center gap-2 p-3 border-2 rounded-lg cursor-pointer transition flex-1 ${form.isNew ? 'border-black bg-gray-50' : 'border-gray-200'}`}>
                <input type="checkbox" checked={!!form.isNew} onChange={e => setForm({ ...form, isNew: e.target.checked })} className="w-4 h-4" />
                <span className="text-sm font-medium">New Arrivals</span>
              </label>
              <label className={`flex items-center gap-2 p-3 border-2 rounded-lg cursor-pointer transition flex-1 ${form.isBestSeller ? 'border-black bg-gray-50' : 'border-gray-200'}`}>
                <input type="checkbox" checked={!!form.isBestSeller} onChange={e => setForm({ ...form, isBestSeller: e.target.checked })} className="w-4 h-4" />
                <span className="text-sm font-medium">Best Sellers</span>
              </label>
            </div>
          </div>
          <div className="flex gap-4 pt-2">
            <button onClick={() => onSave(form)} className="flex-1 py-3 bg-black text-white rounded-md hover:bg-gray-800 transition font-semibold">Save Changes</button>
            <button onClick={onClose} className="flex-1 py-3 border border-black rounded-md hover:bg-gray-50 transition">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Add Modal ───────────────────────────────────────────────────────────────
function AddModal({ onClose, onAdd }: { onClose: () => void; onAdd: (p: Product) => void }) {
  const [form, setForm] = useState({
    name: '', price: 0, originalPrice: undefined as number | undefined,
    image: '', category: 'T-Shirts',
    sizes: ['S','M','L','XL'], colors: ['Black','White'],
    inventory: 0, sold: 0, inStock: false, lowStock: false,
    isNew: false, isBestSeller: false,
  })
  const [preview, setPreview]   = useState('')
  const [uploading, setUploading] = useState(false)

  const setInventory = (val: number) => {
    setForm(f => ({ ...f, inventory: val, ...deriveStockFlags(val) }))
  }

  const handleImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.size > 5 * 1024 * 1024) { toast.error('Image must be under 5 MB'); return }

    // Show local preview immediately
    const reader = new FileReader()
    reader.onloadend = () => setPreview(reader.result as string)
    reader.readAsDataURL(file)

    // Upload to Supabase storage
    setUploading(true)
    try {
      const fd = new FormData()
      fd.append('file', file)
      const res  = await fetch('/api/upload-image', { method: 'POST', body: fd })
      const data = await res.json()
      if (data.url) {
        setForm(f => ({ ...f, image: data.url }))
        toast.success('Image uploaded!')
      } else {
        toast.error('Image upload failed')
      }
    } finally {
      setUploading(false)
    }
  }

  const handleSubmit = () => {
    if (!form.name.trim())  { toast.error('Enter a product name'); return }
    if (form.price <= 0)    { toast.error('Enter a valid price'); return }
    if (!form.image)        { toast.error('Upload a product image'); return }
    if (form.inventory <= 0){ toast.error('Enter inventory quantity'); return }

    const product: Product = {
      ...form,
      id: String(Date.now()),
      ...deriveStockFlags(form.inventory),
    }
    onAdd(product)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-xl font-bold">Add New Product</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl leading-none">✕</button>
        </div>
        <div className="p-6 space-y-5">

          {/* Image */}
          <div>
            <label className="block text-sm font-semibold mb-2">Product Image *</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              {preview ? (
                <div className="space-y-3">
                  <div className="relative w-full h-56 bg-gray-100 rounded-lg overflow-hidden">
                    <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                    {uploading && (
                      <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                        <p className="text-white font-semibold text-sm">Uploading to cloud...</p>
                      </div>
                    )}
                  </div>
                  {!uploading && (
                    <button type="button" onClick={() => { setPreview(''); setForm(f => ({ ...f, image: '' })) }}
                      className="text-sm text-red-600 hover:text-red-800">Remove Image</button>
                  )}
                </div>
              ) : (
                <>
                  <input type="file" id="prodImg" accept="image/*" onChange={handleImage} className="hidden" />
                  <label htmlFor="prodImg" className="cursor-pointer flex flex-col items-center gap-2">
                    <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-sm text-gray-600">Click to upload from your device</span>
                    <span className="text-xs text-gray-400">PNG, JPG, WEBP · Max 5 MB · Saved to cloud</span>
                  </label>
                </>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Product Name *</label>
            <input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
              placeholder="e.g. Oversized Graphic Tee"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-1">Price (₹) *</label>
              <input type="number" value={form.price || ''} onChange={e => setForm({ ...form, price: Number(e.target.value) })}
                placeholder="1299"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black" />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Original Price (₹)</label>
              <input type="number" value={form.originalPrice ?? ''} onChange={e => setForm({ ...form, originalPrice: Number(e.target.value) || undefined })}
                placeholder="1999 (optional)"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Inventory Quantity *</label>
            <input type="number" min={0} value={form.inventory || ''} onChange={e => setInventory(Number(e.target.value))}
              placeholder="e.g. 20"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black" />
            {form.inventory > 0 && (
              <p className={`text-xs mt-1 font-semibold ${form.inventory <= 5 ? 'text-orange-600' : 'text-green-600'}`}>
                → {form.inventory <= 5 ? 'LOW STOCK' : 'IN STOCK'}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Add to Collections</label>
            <p className="text-xs text-gray-500 mb-3">Product always appears in Shop All. Select collections below.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label className={`flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition ${form.isNew ? 'border-black bg-gray-50' : 'border-gray-200 hover:border-gray-300'}`}>
                <input type="checkbox" checked={form.isNew} onChange={e => setForm({ ...form, isNew: e.target.checked })} className="w-4 h-4" />
                <div>
                  <p className="font-semibold text-sm">New Arrivals</p>
                  <p className="text-xs text-gray-500">Shows in New Arrivals page</p>
                </div>
              </label>
              <label className={`flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition ${form.isBestSeller ? 'border-black bg-gray-50' : 'border-gray-200 hover:border-gray-300'}`}>
                <input type="checkbox" checked={form.isBestSeller} onChange={e => setForm({ ...form, isBestSeller: e.target.checked })} className="w-4 h-4" />
                <div>
                  <p className="font-semibold text-sm">Best Sellers</p>
                  <p className="text-xs text-gray-500">Shows in Best Sellers page</p>
                </div>
              </label>
            </div>
          </div>

          <div className="flex gap-4 pt-2">
            <button onClick={handleSubmit} disabled={uploading}
              className="flex-1 py-3 bg-black text-white rounded-md hover:bg-gray-800 transition font-semibold disabled:bg-gray-400">
              {uploading ? 'Uploading image...' : 'Add Product'}
            </button>
            <button onClick={onClose} className="flex-1 py-3 border border-black rounded-md hover:bg-gray-50 transition">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  )
}
