export default function ReturnsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Returns & Exchange Policy</h1>
        
        <div className="prose prose-lg max-w-none space-y-6">
          <section>
            <h2 className="text-2xl font-bold mb-4">Easy Returns</h2>
            <p className="text-gray-600">
              We want you to be completely satisfied with your purchase. If for any reason you're not happy with your order, 
              we offer easy returns within 7 days of delivery.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Return Eligibility</h2>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Items must be unworn, unwashed, and in original condition</li>
              <li>All original tags must be attached</li>
              <li>Items must be returned in original packaging</li>
              <li>Return request must be initiated within 7 days of delivery</li>
              <li>Sale items and discounted products are eligible for return</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">How to Return</h2>
            <div className="bg-gray-50 rounded-lg p-6 space-y-4">
              <div>
                <h3 className="font-bold mb-2">Step 1: Request Return</h3>
                <p className="text-gray-600">
                  Fill out our return request form with your order number, item details, and reason for return.
                </p>
              </div>
              <div>
                <h3 className="font-bold mb-2">Step 2: Pack Your Item</h3>
                <p className="text-gray-600">
                  Securely pack the item in its original packaging with all tags attached.
                </p>
              </div>
              <div>
                <h3 className="font-bold mb-2">Step 3: Ship to Us</h3>
                <p className="text-gray-600">
                  We'll provide you with a return address. Ship the package via any courier service.
                </p>
              </div>
              <div>
                <h3 className="font-bold mb-2">Step 4: Get Your Refund</h3>
                <p className="text-gray-600">
                  Once we receive and inspect your return, we'll process your refund within 5-7 business days.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Exchange Policy</h2>
            <p className="text-gray-600 mb-4">
              Want a different size or color? We offer free exchanges within 7 days of delivery.
            </p>
            <p className="text-gray-600">
              Simply request an exchange through our return form, and we'll send you the replacement item once we receive your original item.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Refund Method</h2>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Refunds will be issued to the original payment method</li>
              <li>Processing time: 5-7 business days after item is received</li>
              <li>Bank processing may take an additional 3-5 days</li>
              <li>Shipping charges are non-refundable</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Non-Returnable Items</h2>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Items without original tags</li>
              <li>Worn or washed items</li>
              <li>Items damaged after delivery</li>
              <li>Items returned after 7 days</li>
            </ul>
          </section>

          <section className="bg-blue-50 rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Need Help?</h2>
            <p className="text-gray-600 mb-4">
              Have questions about returns or exchanges? We're here to help!
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
                WhatsApp Support
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
