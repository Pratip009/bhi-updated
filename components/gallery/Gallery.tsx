import React from 'react'
import GalleryGrid from './GalleryGrid'

const Gallery = () => {
  return (
    <>
      {/* Top Blue Header Section */}
      <section className="bg-blue-600 py-32 text-white text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6">
            Our Gallery
          </h1>
          <p className="text-xl md:text-2xl opacity-90 leading-relaxed">
            Explore the latest photos, moments, and memories from our community.
          </p>
        </div>
      </section>

      {/* Gallery Section (separate, no blue background) */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <GalleryGrid />
      </section>
    </>
  )
}

export default Gallery
