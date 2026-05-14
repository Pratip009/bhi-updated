'use client'

import React from 'react'

const Page = () => {
  return (
    <>
      {/* Hero Section */}
      <div className="w-full bg-[#303079] py-24 text-center text-white relative overflow-hidden">
        {/* Decorative background circles */}
        <div className="absolute top-[-60px] left-[-60px] w-64 h-64 rounded-full bg-white opacity-5" />
        <div className="absolute bottom-[-80px] right-[-40px] w-80 h-80 rounded-full bg-white opacity-5" />

        <p className="text-sm uppercase tracking-widest text-white/50 mb-3 font-medium">
          Work with us
        </p>
        <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
          Partnerships
        </h1>
        <p className="text-lg md:text-xl text-white/60 w-[90%] md:w-2/3 mx-auto leading-relaxed">
          Discover exciting partnership opportunities and collaborate with us
          to achieve your goals across the USA, India, and Thailand.
        </p>

        {/* Stat bar */}
        <div className="flex flex-wrap justify-center gap-10 mt-10">
          {[
            { value: '3', label: 'Countries' },
            { value: 'Global', label: 'Reach' },
            { value: '3', label: 'Points of Contact' },
          ].map((item) => (
            <div key={item.label} className="text-center">
              <div className="text-2xl font-bold text-white">{item.value}</div>
              <div className="text-xs text-white/50 uppercase tracking-widest mt-1">
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="w-[90%] md:w-4/5 mx-auto py-16 grid md:grid-cols-2 gap-10">

        {/* Left — Benefits */}
        <div className="bg-white shadow-lg rounded-2xl p-8 flex flex-col gap-6">
          <div>
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[#303079] bg-[#303079]/10 px-3 py-1 rounded-full mb-3">
              Collaboration
            </span>
            <h2 className="text-2xl font-bold text-gray-800 mb-3">
              Why partner with us?
            </h2>
            <p className="text-gray-500 leading-relaxed text-sm">
              We believe in building strong collaborations that create lasting
              value for all parties involved. By partnering with us, you gain
              access to shared expertise, expanded global networks, and new
              cross-border opportunities.
            </p>
          </div>

          {/* Benefits list */}
          <ul className="flex flex-col gap-4">
            {[
              {
                icon: '🌐',
                title: 'Global market reach',
                desc: 'Access audiences across USA, India, and Thailand simultaneously.',
              },
              {
                icon: '🤝',
                title: 'Shared resources & expertise',
                desc: 'Pool knowledge, tools, and networks for better outcomes.',
              },
              {
                icon: '📢',
                title: 'Increased brand visibility',
                desc: 'Grow your brand presence across multiple markets.',
              },
              {
                icon: '📈',
                title: 'Long-term growth',
                desc: 'Sustainable partnerships built on mutual benefit and trust.',
              },
              {
                icon: '💡',
                title: 'Innovation through collaboration',
                desc: 'Fresh ideas born from cross-cultural and cross-industry synergy.',
              },
            ].map((benefit) => (
              <li key={benefit.title} className="flex items-start gap-4">
                <span className="text-2xl mt-0.5">{benefit.icon}</span>
                <div>
                  <p className="font-semibold text-gray-800 text-sm">{benefit.title}</p>
                  <p className="text-gray-400 text-sm leading-relaxed">{benefit.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Right — Contact Card */}
        <div className="bg-white shadow-lg rounded-2xl p-8 flex flex-col items-center gap-6">

          {/* Profile */}
          <div className="text-center">
            <div className="relative inline-block">
              <img
                src="/your-image.jpg"         // ← replace with your image path
                alt="Profile photo"
                className="w-28 h-28 rounded-full object-cover border-4 border-[#303079]/20 mx-auto"
                onError={(e) => {
                  // Fallback avatar if image not found
                  const target = e.currentTarget as HTMLImageElement
                  target.style.display = 'none'
                  const next = target.nextElementSibling as HTMLElement | null
                  if (next) next.style.display = 'flex'
                }}
              />
              {/* Fallback initials avatar */}
              <div
                className="w-28 h-28 rounded-full bg-[#303079] text-white text-3xl font-bold items-center justify-center mx-auto border-4 border-[#303079]/20"
                style={{ display: 'none' }}
              >
                YN
              </div>
              {/* Online dot */}
              <span className="absolute bottom-1 right-1 w-4 h-4 bg-green-400 border-2 border-white rounded-full" />
            </div>

            <h3 className="text-xl font-bold text-gray-800 mt-4">
             Mohamed Sajjad Khan         {/* ← replace */}
            </h3>
            <p className="text-sm text-gray-400 mt-1">
              Open to global collaborations &amp; partnerships
            </p>

            {/* Country flags */}
            <div className="flex justify-center gap-2 mt-3 text-xl" title="Active in USA, India, Thailand">
              🇺🇸 🇮🇳 🇹🇭
            </div>
          </div>

          <div className="w-full border-t border-gray-100" />

          {/* Contact details */}
          <div className="w-full flex flex-col gap-3">
            {[
              {
                flag: '🇺🇸',
                country: 'USA',
                number: '+1-XXX-XXX-XXXX',   // ← replace
              },
              {
                flag: '🇮🇳',
                country: 'India',
                number: ' +91 9741362690',     // ← replace
              },
              {
                flag: '🇹🇭',
                country: 'Thailand',
                number: '+66 0991131858',      // ← replace
              },
            ].map((contact) => (
              <div
                key={contact.country}
                className="flex items-center justify-between bg-gray-50 rounded-xl px-4 py-3"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">{contact.flag}</span>
                  <div>
                    <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">
                      {contact.country}
                    </p>
                    <p className="text-sm font-semibold text-gray-700">
                      {contact.number}
                    </p>
                  </div>
                </div>
                {/* WhatsApp badge */}
                <span className="flex items-center gap-1 text-xs font-semibold text-green-700 bg-green-100 px-2 py-1 rounded-full">
                  <svg
                    className="w-3 h-3"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.125.554 4.118 1.523 5.847L.057 23.882l6.19-1.623A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.885 0-3.655-.502-5.188-1.381l-.371-.221-3.843 1.008 1.026-3.748-.242-.386A9.954 9.954 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
                  </svg>
                  WhatsApp
                </span>
              </div>
            ))}
          </div>

          <div className="w-full border-t border-gray-100" />

          {/* Shared Email */}
          <div className="w-full bg-[#303079]/5 border border-[#303079]/20 rounded-xl px-5 py-4 flex items-start gap-4">
            <div className="bg-[#303079] text-white rounded-lg p-2 mt-0.5 flex-shrink-0">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <div>
              <p className="text-xs text-[#303079] font-semibold uppercase tracking-wide mb-0.5">
                Shared Email
              </p>
              <p className="text-sm font-semibold text-gray-800">
                shared@email.com   {/* ← replace */}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Monitored by all 3 members across USA, India &amp; Thailand
              </p>
            </div>
          </div>

          {/* CTA */}
          <a
            href="mailto:shared@email.com"   // ← replace
            className="w-full text-center bg-[#303079] hover:bg-[#25255f] transition-colors text-white font-semibold py-3 px-6 rounded-xl text-sm"
          >
            Get in touch →
          </a>
        </div>

      </div>
    </>
  )
}

export default Page