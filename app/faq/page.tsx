import { faqs } from '@/lib/data'
import { ChevronDown } from 'lucide-react'

export default function FAQPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-4 text-center">Frequently Asked Questions</h1>
        <p className="text-gray-600 text-center mb-12">
          Everything you need to know about shopping with VIBE
        </p>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <details
              key={index}
              className="group bg-white border border-gray-200 rounded-lg overflow-hidden"
            >
              <summary className="cursor-pointer p-6 font-semibold flex items-center justify-between hover:bg-gray-50 transition">
                {faq.question}
                <ChevronDown className="group-open:rotate-180 transition flex-shrink-0 ml-4" size={20} />
              </summary>
              <div className="px-6 pb-6 text-gray-600">
                {faq.answer}
              </div>
            </details>
          ))}
        </div>

        {/* Still have questions */}
        <div className="mt-12 bg-gray-50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Still have questions?</h2>
          <p className="text-gray-600 mb-6">
            Can't find the answer you're looking for? Get in touch with our team.
          </p>
          <a
            href="/contact"
            className="inline-block px-8 py-3 bg-black text-white font-semibold rounded-md hover:bg-gray-800 transition"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  )
}
