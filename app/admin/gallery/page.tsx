'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { Upload, Trash2, X, Loader2, Image as ImageIcon } from 'lucide-react'
import Image from 'next/image'

interface GalleryImage {
  name: string
  url: string
  created_at: string
}

export default function GalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)
  const [deleting, setDeleting] = useState<string | null>(null)

  useEffect(() => {
    fetchImages()
  }, [])

  async function fetchImages() {
    try {
      setLoading(true)
      const { data, error } = await supabase.storage
        .from('gallery')
        .list('', {
          limit: 100,
          offset: 0,
          sortBy: { column: 'created_at', order: 'desc' }
        })

      if (error) throw error

      if (data) {
        const imageUrls = data
          .filter(file => file.name !== '.emptyFolderPlaceholder')
          .map(file => {
            const { data: urlData } = supabase.storage
              .from('gallery')
              .getPublicUrl(file.name)
            
            return {
              name: file.name,
              url: urlData.publicUrl,
              created_at: file.created_at
            }
          })

        setImages(imageUrls)
      }
    } catch (error) {
      console.error('Error fetching images:', error)
      alert('Failed to load images')
    } finally {
      setLoading(false)
    }
  }

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files
    if (!files || files.length === 0) return

    try {
      setUploading(true)

      for (const file of Array.from(files)) {
        // Validate file type
        if (!file.type.startsWith('image/')) {
          alert(`${file.name} is not an image file`)
          continue
        }

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
          alert(`${file.name} is too large. Max size is 5MB`)
          continue
        }

        // Create unique filename
        const fileExt = file.name.split('.').pop()
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`

        const { error: uploadError } = await supabase.storage
          .from('gallery')
          .upload(fileName, file, {
            cacheControl: '3600',
            upsert: false
          })

        if (uploadError) throw uploadError
      }

      // Refresh the gallery
      await fetchImages()
      
      // Reset input
      e.target.value = ''
    } catch (error) {
      console.error('Error uploading images:', error)
      alert('Failed to upload images')
    } finally {
      setUploading(false)
    }
  }

  async function handleDelete(imageName: string) {
    if (!confirm('Are you sure you want to delete this image?')) return

    try {
      setDeleting(imageName)
      
      const { error } = await supabase.storage
        .from('gallery')
        .remove([imageName])

      if (error) throw error

      // Remove from state
      setImages(prev => prev.filter(img => img.name !== imageName))
      setSelectedImage(null)
    } catch (error) {
      console.error('Error deleting image:', error)
      alert('Failed to delete image')
    } finally {
      setDeleting(null)
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Gallery</h1>
            <p className="text-gray-400">Manage your gallery images</p>
          </div>

          {/* Upload Button */}
          <label className="cursor-pointer">
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleUpload}
              className="hidden"
              disabled={uploading}
            />
            <div className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700 rounded-xl text-white font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed">
              {uploading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Uploading...</span>
                </>
              ) : (
                <>
                  <Upload className="w-5 h-5" />
                  <span>Upload Images</span>
                </>
              )}
            </div>
          </label>
        </div>

        {/* Gallery Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-violet-500" />
          </div>
        ) : images.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-4">
              <ImageIcon className="w-10 h-10 text-gray-600" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">No images yet</h3>
            <p className="text-gray-400 mb-6">Upload your first image to get started</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {images.map((image) => (
              <div
                key={image.name}
                className="group relative aspect-square rounded-xl overflow-hidden bg-white/5 border border-white/10 hover:border-violet-500/50 transition-all cursor-pointer"
                onClick={() => setSelectedImage(image)}
              >
                <Image
                  src={image.url}
                  alt={image.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleDelete(image.name)
                    }}
                    disabled={deleting === image.name}
                    className="p-3 bg-red-500 hover:bg-red-600 rounded-full text-white transition-colors disabled:opacity-50"
                  >
                    {deleting === image.name ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <Trash2 className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Image Preview Modal */}
        {selectedImage && (
          <div
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="relative max-w-5xl max-h-[90vh] w-full h-full">
              <Image
                src={selectedImage.url}
                alt={selectedImage.name}
                fill
                className="object-contain"
                sizes="90vw"
              />
            </div>

            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between bg-black/50 backdrop-blur-sm rounded-xl p-4">
              <p className="text-white text-sm truncate flex-1">{selectedImage.name}</p>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  handleDelete(selectedImage.name)
                }}
                disabled={deleting === selectedImage.name}
                className="ml-4 px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg text-white font-medium transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                {deleting === selectedImage.name ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Deleting...</span>
                  </>
                ) : (
                  <>
                    <Trash2 className="w-4 h-4" />
                    <span>Delete</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}