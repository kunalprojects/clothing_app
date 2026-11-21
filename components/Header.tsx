'use client'

import Link from 'next/link'
import { Search, ShoppingBag, Heart, User, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { useStore } from '@/lib/store'
import { CartDrawer } from './CartDrawer'
import { SearchModal } from './SearchModal'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const cart = useStore(state => state.cart)
  const wishlist = useStore(state => state.wishlist)
  
  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <>
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
        {/* Announcement Bar */}
        <div className="bg-black text-white text-center py-2 text-sm">
          <p className="animate-pulse">🎉 Get 5% Cashback on Every Order | Easy Returns & Exchange | New Drops Every Week</p>
        </div>

        {/* Main Header */}
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Logo */}
            <Link href="/" className="text-2xl font-bold tracking-tight">
              VIBE
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              <Link href="/shop" className="hover:text-gray-600 transition">
                Shop All
              </Link>
              <Link href="/collections/new-arrivals" className="hover:text-gray-600 transition">
                New Arrivals
              </Link>
              <Link href="/collections/best-sellers" className="hover:text-gray-600 transition">
                Best Sellers
              </Link>
              <Link href="/about" className="hover:text-gray-600 transition">
                About
              </Link>
              <Link href="/contact" className="hover:text-gray-600 transition">
                Contact
              </Link>
            </nav>

            {/* Icons */}
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setIsSearchOpen(true)}
                className="hover:text-gray-600 transition"
              >
                <Search size={20} />
              </button>
              <Link href="/wishlist" className="hover:text-gray-600 transition relative">
                <Heart size={20} />
                {wishlist.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </Link>
              <Link href="/account" className="hover:text-gray-600 transition hidden sm:block">
                <User size={20} />
              </Link>
              <button 
                onClick={() => setIsCartOpen(true)}
                className="hover:text-gray-600 transition relative"
              >
                <ShoppingBag size={20} />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartItemsCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 py-4 px-4 space-y-4">
            <Link
              href="/shop"
              className="block hover:text-gray-600 transition"
              onClick={() => setIsMenuOpen(false)}
            >
              Shop All
            </Link>
            <Link
              href="/collections/new-arrivals"
              className="block hover:text-gray-600 transition"
              onClick={() => setIsMenuOpen(false)}
            >
              New Arrivals
            </Link>
            <Link
              href="/collections/best-sellers"
              className="block hover:text-gray-600 transition"
              onClick={() => setIsMenuOpen(false)}
            >
              Best Sellers
            </Link>
            <Link
              href="/about"
              className="block hover:text-gray-600 transition"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/contact"
              className="block hover:text-gray-600 transition"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <div className="pt-4 border-t border-gray-200 flex gap-4">
              <Link href="/account" className="hover:text-gray-600 transition">
                <User size={20} />
              </Link>
            </div>
          </div>
        )}
      </header>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  )
}
