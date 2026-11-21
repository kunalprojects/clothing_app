export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">Terms & Conditions</h1>
        <p className="text-gray-600 mb-8">Last updated: November 2024</p>
        
        <div className="prose prose-lg max-w-none space-y-6">
          <section>
            <h2 className="text-2xl font-bold mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-600">
              By accessing and using this website, you accept and agree to be bound by these Terms and Conditions. 
              If you do not agree to these terms, please do not use our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">2. Use of Website</h2>
            <p className="text-gray-600 mb-4">You agree to use this website only for lawful purposes. You must not:</p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Use the website in any way that violates applicable laws</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Interfere with the proper functioning of the website</li>
              <li>Transmit any harmful code or malware</li>
              <li>Impersonate any person or entity</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">3. Product Information</h2>
            <p className="text-gray-600">
              We strive to provide accurate product descriptions and pricing. However, we do not warrant that 
              product descriptions, colors, or other content is accurate, complete, or error-free.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">4. Orders and Payments</h2>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>All orders are subject to availability and acceptance</li>
              <li>We reserve the right to refuse or cancel any order</li>
              <li>Prices are subject to change without notice</li>
              <li>Payment must be received before order processing</li>
              <li>We accept UPI, credit/debit cards, net banking, and COD</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">5. Shipping and Delivery</h2>
            <p className="text-gray-600">
              Delivery times are estimates and not guaranteed. We are not liable for delays caused by courier 
              services or circumstances beyond our control.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">6. Returns and Refunds</h2>
            <p className="text-gray-600">
              Returns and refunds are subject to our Return & Exchange Policy. Please review the policy for 
              complete details on eligibility and procedures.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">7. Intellectual Property</h2>
            <p className="text-gray-600">
              All content on this website, including text, graphics, logos, and images, is the property of VIBE 
              and protected by copyright laws. You may not reproduce, distribute, or use any content without 
              our written permission.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">8. User Accounts</h2>
            <p className="text-gray-600 mb-4">When creating an account, you agree to:</p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Provide accurate and complete information</li>
              <li>Maintain the security of your password</li>
              <li>Accept responsibility for all activities under your account</li>
              <li>Notify us immediately of any unauthorized use</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">9. Limitation of Liability</h2>
            <p className="text-gray-600">
              To the fullest extent permitted by law, VIBE shall not be liable for any indirect, incidental, 
              special, or consequential damages arising from your use of our website or products.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">10. Governing Law</h2>
            <p className="text-gray-600">
              These terms are governed by the laws of India. Any disputes shall be subject to the exclusive 
              jurisdiction of courts in Mumbai, Maharashtra.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">11. Changes to Terms</h2>
            <p className="text-gray-600">
              We reserve the right to modify these terms at any time. Continued use of the website after 
              changes constitutes acceptance of the modified terms.
            </p>
          </section>

          <section className="bg-blue-50 rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Questions?</h2>
            <p className="text-gray-600 mb-4">
              If you have any questions about these Terms & Conditions, please contact us:
            </p>
            <p className="text-gray-600 mb-2">Email: legal@vibe.in</p>
            <p className="text-gray-600 mb-4">Phone: +91 98765 43210</p>
            <a
              href="/contact"
              className="inline-block px-6 py-3 bg-black text-white rounded-md hover:bg-gray-800 transition"
            >
              Contact Us
            </a>
          </section>
        </div>
      </div>
    </div>
  )
}
