# 📋 Quick Reference Card

## 🔑 Admin Login
```
URL: http://localhost:3000/admin/login
Username: administrator
Password: admin@123
```

## 🌐 Important URLs

**Customer Site:**
- Homepage: http://localhost:3000
- Shop All: http://localhost:3000/shop
- Checkout: http://localhost:3000/checkout
- Account: http://localhost:3000/account

**Admin Portal:**
- Login: http://localhost:3000/admin/login
- Dashboard: http://localhost:3000/admin
- Products: http://localhost:3000/admin/products
- Orders: http://localhost:3000/admin/orders
- Customers: http://localhost:3000/admin/customers

## ✨ Key Features

### Customer Side
- 🛍️ Browse 12 T-shirt products
- 🔍 Real-time search
- 🛒 Shopping cart
- ❤️ Wishlist
- 💰 5% cashback on every order
- 📱 Mobile responsive

### Admin Side
- 🔐 Secure login required
- 📦 Product management with image upload
- 📊 Inventory tracking (auto stock status)
- 🚚 Order management
- 👥 Customer database
- 💵 Cashback tracking

## 📸 Add Product with Image

1. Login to admin
2. Go to Products
3. Click "Add New Product"
4. **Click upload area → Select image from device**
5. Fill: Name, Price, Inventory
6. Click "Add Product"
7. Done! Product shows with your image

## 💰 5% Cashback

**Shows:**
- Homepage hero (big green badge)
- Announcement bar (all pages)
- Checkout (green box with amount)
- Admin orders (per order)
- Admin customers (per customer)

**Example:**
- Order: ₹2,798
- Cashback: ₹140 (5%)
- Customer earns: +₹140 for next order

## 📊 Stock Status

**Auto-calculated:**
- 🟢 **IN STOCK** - More than 5 units
- 🟠 **LOW STOCK** - 1-5 units remaining
- 🔴 **OUT OF STOCK** - 0 units

**Example:**
- Add product with 10 inventory
- When 8 sell → 2 left → Shows "LOW STOCK"
- When 10 sell → 0 left → Shows "OUT OF STOCK"

## 🎯 Quick Demo Script

### 5-Minute Customer Demo:
1. Homepage - Show cashback banner
2. Shop - Filter and add to cart
3. Product - Select size/color
4. Checkout - Show 5% cashback
5. Mobile - Resize browser

### 10-Minute Admin Demo:
1. Login - Enter credentials
2. Dashboard - Show stats
3. **Products - Upload image from device**
4. Products - Show inventory tracking
5. Orders - Show cashback column
6. Customers - Show cashback tracking

## 🔧 Troubleshooting

**Can't access admin?**
→ Go to http://localhost:3000/admin/login
→ Enter: administrator / admin@123

**Image not uploading?**
→ Click upload area
→ Select PNG, JPG, or WEBP (max 5MB)
→ See preview before saving

**Server not running?**
→ Open terminal in project folder
→ Run: `npm run dev`
→ Wait for "Ready" message

## 📱 Test Checklist

**Customer:**
- [ ] Browse homepage
- [ ] Search for "oversized"
- [ ] Add to cart
- [ ] Go to checkout
- [ ] See 5% cashback

**Admin:**
- [ ] Login with credentials
- [ ] View dashboard
- [ ] Add product with image
- [ ] View orders
- [ ] Check inventory

## 💡 Show Your Client

**Highlights:**
1. "5% cashback on every order" - Customer loyalty
2. "Upload products easily" - Admin convenience
3. "Track inventory automatically" - Business intelligence
4. "Mobile responsive" - Modern experience
5. "Secure admin portal" - Professional system

## 🎉 You're Ready!

**Demo Status:** ✅ Complete
**Features:** ✅ All working
**Design:** ✅ Professional
**Security:** ✅ Login protected
**Mobile:** ✅ Responsive

**Go impress your client!** 🚀
