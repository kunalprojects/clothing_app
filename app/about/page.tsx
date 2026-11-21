import Image from 'next/image'
import { Heart, Users, TrendingUp, Package } from 'lucide-react'

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative h-[400px] bg-black">
        <Image
          src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&h=400&fit=crop"
          alt="About Us"
          fill
          className="object-cover opacity-50"
        />
        <div className="absolute inset-0 flex items-center justify-center text-white">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-4">Our Story</h1>
            <p className="text-xl">Built by Gen Z, for Gen Z</p>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">Who We Are</h2>
          <div className="space-y-4 text-gray-600 text-lg leading-relaxed">
            <p>
              VIBE was born in 2023 from a simple frustration: we couldn't find clothing that matched 
              our aesthetic without breaking the bank or compromising on quality.
            </p>
            <p>
              As Gen Z creators and fashion enthusiasts, we knew there had to be a better way. We wanted 
              pieces that were comfortable enough for a Netflix binge but stylish enough for a spontaneous 
              hangout. Clothes that felt authentic to who we are, not what fast fashion tells us to be.
            </p>
            <p>
              So we built VIBE — a brand that gets it. Every collection is designed with your lifestyle 
              in mind, from oversized tees that actually fit right to cargo pants with pockets that can 
              hold your whole life. We're all about quality fabrics, inclusive sizing, and designs that 
              make you feel like the main character.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">What We Stand For</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div className="text-center">
              <div className="inline-block p-4 bg-white rounded-full mb-4">
                <Heart size={32} />
              </div>
              <h3 className="font-bold text-lg mb-2">Authenticity</h3>
              <p className="text-gray-600">
                No fake vibes. Just real clothes for real people.
              </p>
            </div>
            <div className="text-center">
              <div className="inline-block p-4 bg-white rounded-full mb-4">
                <Package size={32} />
              </div>
              <h3 className="font-bold text-lg mb-2">Quality First</h3>
              <p className="text-gray-600">
                Premium fabrics and construction that lasts.
              </p>
            </div>
            <div className="text-center">
              <div className="inline-block p-4 bg-white rounded-full mb-4">
                <Users size={32} />
              </div>
              <h3 className="font-bold text-lg mb-2">Community</h3>
              <p className="text-gray-600">
                Built with input from our customers, for our customers.
              </p>
            </div>
            <div className="text-center">
              <div className="inline-block p-4 bg-white rounded-full mb-4">
                <TrendingUp size={32} />
              </div>
              <h3 className="font-bold text-lg mb-2">Sustainability</h3>
              <p className="text-gray-600">
                Mindful production, minimal waste, maximum style.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-12 text-center">Meet the Team</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {[
            {
              name: 'Priya Sharma',
              role: 'Founder & Creative Director',
              image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop'
            },
            {
              name: 'Arjun Patel',
              role: 'Head of Design',
              image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop'
            },
            {
              name: 'Zara Khan',
              role: 'Community Manager',
              image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop'
            }
          ].map((member, i) => (
            <div key={i} className="text-center">
              <div className="relative w-48 h-48 mx-auto mb-4 rounded-full overflow-hidden">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="font-bold text-lg">{member.name}</h3>
              <p className="text-gray-600">{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-black text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Join the Movement</h2>
          <p className="text-xl text-gray-300 mb-8">
            Be part of a community that values authenticity and style
          </p>
          <a
            href="/shop"
            className="inline-block px-8 py-3 bg-white text-black font-semibold rounded-md hover:bg-gray-100 transition"
          >
            Shop Now
          </a>
        </div>
      </section>
    </div>
  )
}
