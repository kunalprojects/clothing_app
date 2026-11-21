export default function ShippingPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Shipping & Delivery Policy</h1>
        
        <div className="prose prose-lg max-w-none space-y-6">
          <section>
            <h2 className="text-2xl font-bold mb-4">Shipping Information</h2>
            <p className="text-gray-600">
              We currently ship across India. All orders are processed within 2-3 business days and 
              delivered within 4-7 business days depending on your location.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Shipping Charges</h2>
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                  <div>
                    <p className="font-bold">Orders below ₹1,999</p>
                    <p className="text-sm text-gray-600">Flat shipping charge</p>
                  </div>
                  <p className="text-xl font-bold">₹99</p>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-bold">Orders ₹1,999 and above</p>
                    <p className="text-sm text-gray-600">Free shipping across India</p>
                  </div>
                  <p className="text-xl font-bold text-green-600">FREE</p>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Processing Time</h2>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Order confirmation: Instant</li>
              <li>Order processing: 2-3 business days</li>
              <li>Shipping: 4-7 business days</li>
              <li>Total delivery time: 6-10 business days</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Delivery Areas</h2>
            <p className="text-gray-600 mb-4">We deliver to all serviceable pin codes across India, including:</p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Metro cities: 4-5 business days</li>
              <li>Tier 2 cities: 5-6 business days</li>
              <li>Tier 3 cities: 6-7 business days</li>
              <li>Remote areas: 7-10 business days</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Order Tracking</h2>
            <p className="text-gray-600 mb-4">
              Once your order is shipped, you'll receive a tracking number via email and SMS. 
              You can track your order status anytime from your account dashboard.
            </p>
            <a
              href="/account"
              className="inline-block px-6 py-3 bg-black text-white rounded-md hover:bg-gray-800 transition"
            >
              Track Your Order
            </a>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Delivery Partners</h2>
            <p className="text-gray-600">
              We work with trusted courier partners to ensure safe and timely delivery of your orders.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Failed Delivery</h2>
            <p className="text-gray-600 mb-4">
              If delivery fails due to:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Incorrect address provided</li>
              <li>Recipient unavailable</li>
              <li>Refused delivery</li>
            </ul>
            <p className="text-gray-600 mt-4">
              The package will be returned to us and you will be contacted for redelivery arrangements.
            </p>
          </section>

          <section className="bg-blue-50 rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Questions About Shipping?</h2>
            <p className="text-gray-600 mb-4">
              Contact our support team for any shipping-related queries.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="/contact"
                className="inline-block px-6 py-3 bg-black text-white rounded-md hover:bg-gray-800 transition text-center"
              >
                Contact Us
              </a>
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 py-3 border-2 border-black rounded-md hover:bg-gray-50 transition text-center"
              >
                WhatsApp Us
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
