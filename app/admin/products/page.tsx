'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Plus, Edit, Trash2, AlertCircle, Package } from 'lucide-react'
import { products as initialProducts } from '@/lib/data'
import { formatPrice } from '@/lib/utils'
import { AdminAuthCheck } from '@/components/AdminAuthCheck'
import { useRouter } from 'next/navigation'

// Extended product type with inventory
interface ProductWithInventory {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  category: string
  sizes: string[]
  colors: string[]
  inStock: boolean
  lowStock?: boolean
  inventory: number // Total quantity
  sold: number // Quantity sold
  rating?: number
  reviews?: number
}

export default function AdminProductsPage() {
  const router = useRouter()
  
  const handleLogout = () => {
    localStorage.removeItem('adminLoggedIn')
    router.push('/admin/login')
  }

  // Demo inventory data
  const [products, setProducts] = useState<ProductWithInventory[]>(
    initialProducts.map((p, index) => ({
      ...p,
      inventory: [10, 5, 15, 8, 20, 3, 12, 2, 18, 0, 14, 4][index] || 10,
      sold: [5, 8, 3, 12, 2, 15, 4, 18, 6, 10, 2, 14][index] || 0
    }))
  )

  const [showAddModal, setShowAddModal] = useState(false)
  const [editingProduct, setEditingProduct] = useState<ProductWithInventory | null>(null)

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(p => p.id !== id))
    }
  }

  const getStockStatus = (product: ProductWithInventory) => {
    if (product.inventory === 0) return { label: 'OUT OF STOCK', color: 'bg-red-100 text-red-700' }
    if (product.inventory <= 5) return { label: 'LOW STOCK', color: 'bg-orange-100 text-orange-700' }
    return { label: 'IN STOCK', color: 'bg-green-100 text-green-700' }
  }

  return (
    <AdminAuthCheck>
      <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <header className="bg-black text-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-between">
              <Link href="/admin" className="hover:text-gray-300">
                <ArrowLeft size={24} />
              </Link>
              <h1 className="text-2xl font-bold">Product Management</h1>
            </div>
            <div className="flex items-center gap-4">
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-md hover:bg-gray-100 transition"
            >
              <Plus size={20} />
              Add New Product
            </button>
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
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-gray-600 text-sm font-semibold mb-2">Total Products</h3>
            <p className="text-3xl font-bold">{products.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-gray-600 text-sm font-semibold mb-2">In Stock</h3>
            <p className="text-3xl font-bold text-green-600">
              {products.filter(p => p.inventory > 5).length}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-gray-600 text-sm font-semibold mb-2">Low Stock</h3>
            <p className="text-3xl font-bold text-orange-600">
              {products.filter(p => p.inventory > 0 && p.inventory <= 5).length}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-gray-600 text-sm font-semibold mb-2">Out of Stock</h3>
            <p className="text-3xl font-bold text-red-600">
              {products.filter(p => p.inventory === 0).length}
            </p>
          </div>
        </div>

        {/* Low Stock Alert */}
        {products.some(p => p.inventory <= 5) && (
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6 flex items-start gap-3">
            <AlertCircle className="text-orange-600 flex-shrink-0 mt-0.5" size={20} />
            <div>
              <p className="font-semibold text-orange-800">Low Stock Alert</p>
              <p className="text-sm text-orange-700">
                {products.filter(p => p.inventory <= 5 && p.inventory > 0).length} products have low inventory. 
                {products.filter(p => p.inventory === 0).length > 0 && 
                  ` ${products.filter(p => p.inventory === 0).length} products are out of stock.`
                }
              </p>
            </div>
          </div>
        )}

        {/* Products Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Product</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Price</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Inventory</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Sold</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => {
                  const stockStatus = getStockStatus(product)
                  return (
                    <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <div className="relative w-16 h-16 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                            <Image
                              src={product.image}
                              alt={product.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <p className="font-semibold">{product.name}</p>
                            <p className="text-sm text-gray-600">{product.category}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-semibold">{formatPrice(product.price)}</p>
                        {product.originalPrice && (
                          <p className="text-sm text-gray-400 line-through">
                            {formatPrice(product.originalPrice)}
                          </p>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Package size={16} className="text-gray-400" />
                          <span className={`font-semibold ${
                            product.inventory === 0 ? 'text-red-600' :
                            product.inventory <= 5 ? 'text-orange-600' :
                            'text-green-600'
                          }`}>
                            {product.inventory}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-gray-600">{product.sold} units</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${stockStatus.color}`}>
                          {stockStatus.label}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setEditingProduct(product)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-md transition"
                            title="Edit"
                          >
                            <Edit size={18} />
                          </button>
                          <button
                            onClick={() => handleDelete(product.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-md transition"
                            title="Delete"
                          >
                            <Trash2 size={18} />
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

        {/* Edit Modal */}
        {editingProduct && (
          <EditProductModal
            product={editingProduct}
            onClose={() => setEditingProduct(null)}
            onSave={(updated) => {
              setProducts(products.map(p => p.id === updated.id ? updated : p))
              setEditingProduct(null)
            }}
          />
        )}

        {/* Add Modal */}
        {showAddModal && (
          <AddProductModal
            onClose={() => setShowAddModal(false)}
            onAdd={(newProduct) => {
              setProducts([...products, { ...newProduct, id: String(products.length + 1) }])
              setShowAddModal(false)
            }}
          />
        )}
      </div>
    </div>
  )
}

// Edit Product Modal Component
function EditProductModal({ 
  product, 
  onClose, 
  onSave 
}: { 
  product: ProductWithInventory
  onClose: () => void
  onSave: (product: ProductWithInventory) => void
}) {
  const [formData, setFormData] = useState(product)

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Edit Product</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            ✕
          </button>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="block font-semibold mb-2">Product Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold mb-2">Price (₹)</label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
            <div>
              <label className="block font-semibold mb-2">Original Price (₹)</label>
              <input
                type="number"
                value={formData.originalPrice || ''}
                onChange={(e) => setFormData({ ...formData, originalPrice: Number(e.target.value) || undefined })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold mb-2">Inventory Quantity</label>
              <input
                type="number"
                value={formData.inventory}
                onChange={(e) => setFormData({ ...formData, inventory: Number(e.target.value) })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
            <div>
              <label className="block font-semibold mb-2">Units Sold</label>
              <input
                type="number"
                value={formData.sold}
                onChange={(e) => setFormData({ ...formData, sold: Number(e.target.value) })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
          </div>
          <div className="flex gap-4 pt-4">
            <button
              onClick={() => onSave(formData)}
              className="flex-1 py-3 bg-black text-white rounded-md hover:bg-gray-800 transition"
            >
              Save Changes
            </button>
            <button
              onClick={onClose}
              className="flex-1 py-3 border border-black rounded-md hover:bg-gray-50 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// Add Product Modal Component
function AddProductModal({ 
  onClose, 
  onAdd 
}: { 
  onClose: () => void
  onAdd: (product: Omit<ProductWithInventory, 'id'>) => void
}) {
  const [formData, setFormData] = useState({
    name: '',
    price: 0,
    originalPrice: undefined as number | undefined,
    image: '',
    category: 'T-Shirts',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black', 'White'],
    inStock: true,
    inventory: 0,
    sold: 0
  })
  const [imagePreview, setImagePreview] = useState<string>('')

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Create preview
      const reader = new FileReader()
      reader.onloadend = () => {
        const result = reader.result as string
        setImagePreview(result)
        setFormData({ ...formData, image: result })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = () => {
    if (!formData.name || !formData.price || !formData.image) {
      alert('Please fill in all required fields including product image')
      return
    }
    onAdd(formData)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Add New Product</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            ✕
          </button>
        </div>
        <div className="p-6 space-y-4">
          {/* Product Image Upload */}
          <div>
            <label className="block font-semibold mb-2">Product Image *</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              {imagePreview ? (
                <div className="space-y-4">
                  <div className="relative w-full h-64 bg-gray-100 rounded-lg overflow-hidden">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setImagePreview('')
                      setFormData({ ...formData, image: '' })
                    }}
                    className="text-sm text-red-600 hover:text-red-800"
                  >
                    Remove Image
                  </button>
                </div>
              ) : (
                <div>
                  <input
                    type="file"
                    id="productImage"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <label
                    htmlFor="productImage"
                    className="cursor-pointer flex flex-col items-center"
                  >
                    <svg
                      className="w-12 h-12 text-gray-400 mb-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <span className="text-sm text-gray-600 mb-1">
                      Click to upload product image
                    </span>
                    <span className="text-xs text-gray-500">
                      PNG, JPG or WEBP (Max 5MB)
                    </span>
                  </label>
                </div>
              )}
            </div>
          </div>

          <div>
            <label className="block font-semibold mb-2">Product Name *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              required
              placeholder="e.g., Oversized Graphic Tee"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold mb-2">Price (₹) *</label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                required
                placeholder="1299"
              />
            </div>
            <div>
              <label className="block font-semibold mb-2">Original Price (₹)</label>
              <input
                type="number"
                value={formData.originalPrice || ''}
                onChange={(e) => setFormData({ ...formData, originalPrice: Number(e.target.value) || undefined })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="1999"
              />
            </div>
          </div>
          <div>
            <label className="block font-semibold mb-2">Initial Inventory Quantity *</label>
            <input
              type="number"
              value={formData.inventory}
              onChange={(e) => setFormData({ ...formData, inventory: Number(e.target.value) })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              required
              placeholder="10"
            />
          </div>
          <div className="flex gap-4 pt-4">
            <button
              onClick={handleSubmit}
              className="flex-1 py-3 bg-black text-white rounded-md hover:bg-gray-800 transition"
            >
              Add Product
            </button>
            <button
              onClick={onClose}
              className="flex-1 py-3 border border-black rounded-md hover:bg-gray-50 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
