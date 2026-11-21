export default function RefundPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Refund Policy</h1>
        
        <div className="prose prose-lg max-w-none space-y-6">
          <section>
            <h2 className="text-2xl font-bold mb-4">Refund Eligibility</h2>
            <p className="text-gray-600 mb-4">
              Refunds are issued for eligible returns in accordance with our Returns & Exchange Policy. 
              To be eligible for a refund:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Return request must be initiated within 7 days of delivery</li>
              <li>Items must be unworn, unwashed, and with original tags</li>
              <li>Items must be in original packaging</li>
              <li>Return must be approved by our team</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Refund Process</h2>
            <div className="bg-gray-50 rounded-lg p-6 space-y-4">
              <div>
                <h3 className="font-bold mb-2">1. Return Approval</h3>
                <p className="text-gray-600">
                  Once we receive your return request, we'll review and approve eligible returns within 24 hours.
                </p>
              </div>
              <div>
                <h3 className="font-bold mb-2">2. Item Inspection</h3>
                <p className="text-gray-600">
                  After receiving your returned item, our team will inspect it to ensure it meets return criteria.
                </p>
              </div>
              <div>
                <h3 className="font-bold mb-2">3. Refund Initiation</h3>
                <p className="text-gray-600">
                  If approved, refund will be initiated within 5-7 business days to your original payment method.
                </p>
              </div>
              <div>
                <h3 className="font-bold mb-2">4. Bank Processing</h3>
                <p className="text-gray-600">
                  Your bank may take an additional 3-5 business days to credit the refund to your account.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Refund Timeline</h2>
            <div className="overflow-x-auto">
              <table className="w-full border border-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left font-bold">Stage</th>
                    <th className="px-4 py-3 text-left font-bold">Timeline</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600">
                  <tr className="border-t border-gray-200">
                    <td className="px-4 py-3">Return approval</td>
                    <td className="px-4 py-3">Within 24 hours</td>
                  </tr>
                  <tr className="border-t border-gray-200">
                    <td className="px-4 py-3">Item inspection</td>
                    <td className="px-4 py-3">2-3 business days</td>
                  </tr>
                  <tr className="border-t border-gray-200">
                    <td className="px-4 py-3">Refund initiation</td>
                    <td className="px-4 py-3">5-7 business days</td>
                  </tr>
                  <tr className="border-t border-gray-200">
                    <td className="px-4 py-3">Bank processing</td>
                    <td className="px-4 py-3">3-5 business days</td>
                  </tr>
                  <tr className="border-t border-gray-200 bg-gray-50 font-bold">
                    <td className="px-4 py-3">Total time</td>
                    <td className="px-4 py-3">10-15 business days</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Refund Methods</h2>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li><strong>Online Payments:</strong> Refunded to original payment method (card/UPI/wallet)</li>
              <li><strong>Cash on Delivery:</strong> Bank transfer to your provided account details</li>
              <li><strong>Partial Refunds:</strong> May be issued for items with visible wear or missing tags</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Non-Refundable Items</h2>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Shipping charges (except in case of defective/wrong items)</li>
              <li>Items returned after 7 days</li>
              <li>Items without original tags or packaging</li>
              <li>Worn, washed, or damaged items</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Defective or Wrong Items</h2>
            <p className="text-gray-600 mb-4">
              If you receive a defective or wrong item:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Contact us within 48 hours of delivery</li>
              <li>Provide photos of the item and packaging</li>
              <li>We'll arrange for pickup at no cost to you</li>
              <li>Full refund including shipping charges will be issued</li>
              <li>Or we can send a replacement immediately</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Cancellation Refunds</h2>
            <p className="text-gray-600">
              If you cancel your order before shipping, a full refund will be processed within 3-5 business days. 
              Orders cannot be cancelled once shipped.
            </p>
          </section>

          <section className="bg-blue-50 rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Need Help with Refunds?</h2>
            <p className="text-gray-600 mb-4">
              Our customer support team is here to assist with any refund-related questions.
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
