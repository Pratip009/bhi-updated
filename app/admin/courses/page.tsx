// app/admin/courses/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { BookOpen, Plus, Pencil, Trash2, Search, X, Upload, Image as ImageIcon } from 'lucide-react'

interface Course {
  id: number
  image: string
  title: string
  price: number
  teacher: string
  reviewNumber: number
  weeks: number
  hours: number
  category: string
  preRequisite: string
  certification: string
  description: string
  created_at?: string
}

const initialFormData: Omit<Course, 'id' | 'created_at'> = {
  image: '',
  title: '',
  price: 0,
  teacher: '',
  reviewNumber: 0,
  weeks: 0,
  hours: 0,
  category: '',
  preRequisite: '',
  certification: '',
  description: '',
}

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [formData, setFormData] = useState(initialFormData)
  const [submitting, setSubmitting] = useState(false)

  // Image upload states
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string>('')
  const [uploading, setUploading] = useState(false)

  // Delete confirmation
  const [deleteId, setDeleteId] = useState<number | null>(null)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  useEffect(() => {
    fetchCourses()
  }, [])

  async function fetchCourses() {
    try {
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (error) throw error
      setCourses(data || [])
    } catch (err: any) {
      console.error('Error:', err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  // Handle image file selection
  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setError('Please select an image file')
        return
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError('Image size should be less than 5MB')
        return
      }

      setImageFile(file)
      
      // Create preview
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
      setError(null)
    }
  }

  // Upload image to Supabase Storage
  async function uploadImage(file: File): Promise<string> {
    const fileExt = file.name.split('.').pop()
    const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`
    const filePath = `course-images/${fileName}`

    const { error: uploadError } = await supabase.storage
      .from('courses') // Make sure this bucket exists in your Supabase Storage
      .upload(filePath, file)

    if (uploadError) {
      throw uploadError
    }

    // Get public URL
    const { data } = supabase.storage
      .from('courses')
      .getPublicUrl(filePath)

    return data.publicUrl
  }

  // Handle form input changes
  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: ['price', 'reviewNumber', 'weeks', 'hours'].includes(name) ? Number(value) : value
    }))
  }

  // Open modal for adding
  function openAddModal() {
    setFormData(initialFormData)
    setIsEditing(false)
    setEditingId(null)
    setImageFile(null)
    setImagePreview('')
    setIsModalOpen(true)
  }

  // Open modal for editing
  function openEditModal(course: Course) {
    setFormData({
      image: course.image,
      title: course.title,
      price: course.price,
      teacher: course.teacher,
      reviewNumber: course.reviewNumber,
      weeks: course.weeks,
      hours: course.hours,
      category: course.category,
      preRequisite: course.preRequisite,
      certification: course.certification,
      description: course.description,
    })
    setIsEditing(true)
    setEditingId(course.id)
    setImageFile(null)
    setImagePreview(course.image) // Show existing image
    setIsModalOpen(true)
  }

  // Submit form (Add or Edit)
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)

    try {
      let imageUrl = formData.image

      // Upload new image if selected
      if (imageFile) {
        setUploading(true)
        imageUrl = await uploadImage(imageFile)
        setUploading(false)
      }

      const courseData = {
        ...formData,
        image: imageUrl
      }

      if (isEditing && editingId) {
        // Update existing course
        const { error } = await supabase
          .from('courses')
          .update(courseData)
          .eq('id', editingId)
        
        if (error) throw error
      } else {
        // Add new course
        const { error } = await supabase
          .from('courses')
          .insert([courseData])
        
        if (error) throw error
      }

      setIsModalOpen(false)
      setFormData(initialFormData)
      setImageFile(null)
      setImagePreview('')
      fetchCourses()
    } catch (err: any) {
      console.error('Error:', err)
      setError(err.message)
    } finally {
      setSubmitting(false)
      setUploading(false)
    }
  }

  // Delete course
  async function handleDelete() {
    if (!deleteId) return
    
    try {
      const { error } = await supabase
        .from('courses')
        .delete()
        .eq('id', deleteId)
      
      if (error) throw error
      
      setIsDeleteModalOpen(false)
      setDeleteId(null)
      fetchCourses()
    } catch (err: any) {
      console.error('Error:', err)
      setError(err.message)
    }
  }

  const filteredCourses = courses.filter(course => 
    course.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.teacher?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const categories = ['Medical', 'IT', 'Business', 'Hospitality', 'Technical']

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold">Manage Courses</h1>
          <p className="text-gray-400 text-sm mt-1">{courses.length} total courses</p>
        </div>
        <button 
          onClick={openAddModal}
          className="flex items-center gap-2 px-4 py-2 bg-violet-600 rounded-lg hover:bg-violet-700 transition-colors w-fit"
        >
          <Plus className="w-4 h-4" />
          Add Course
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
        <input
          type="text"
          placeholder="Search courses..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-80 pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-violet-500/50"
        />
      </div>

      {/* Error */}
      {error && (
        <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400">
          <p>Error: {error}</p>
        </div>
      )}

      {/* Content */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-10 h-10 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : courses.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 rounded-2xl bg-white/5 border border-white/10">
          <BookOpen className="w-12 h-12 text-violet-400 mb-4" />
          <h3 className="text-xl font-semibold mb-2">No courses yet</h3>
          <p className="text-gray-400 mb-6">Create your first course to get started</p>
          <button 
            onClick={openAddModal}
            className="flex items-center gap-2 px-6 py-3 bg-violet-600 rounded-xl hover:bg-violet-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Add First Course
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <div key={course.id} className="rounded-2xl bg-white/5 border border-white/10 overflow-hidden hover:border-white/20 transition-all">
              {/* Course Image */}
              <div className="h-40 bg-gradient-to-br from-violet-600/20 to-fuchsia-600/20 flex items-center justify-center">
                {course.image ? (
                  <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
                ) : (
                  <BookOpen className="w-12 h-12 text-violet-400" />
                )}
              </div>
              
              {/* Course Info */}
              <div className="p-5">
                <div className="flex items-start justify-between mb-2">
                  <span className="px-2 py-1 text-xs rounded-full bg-violet-500/20 text-violet-400">
                    {course.category}
                  </span>
                  <span className="text-lg font-bold text-green-400">${course.price}</span>
                </div>
                
                <h3 className="text-lg font-semibold mb-2 line-clamp-1">{course.title}</h3>
                
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">{course.description}</p>
                
                <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                  <span>{course.weeks} weeks</span>
                  <span>•</span>
                  <span>{course.hours} hours</span>
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <span className="text-sm text-gray-400">By {course.teacher}</span>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => openEditModal(course)}
                      className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => { setDeleteId(course.id); setIsDeleteModalOpen(true); }}
                      className="p-2 rounded-lg hover:bg-red-500/10 text-gray-400 hover:text-red-400 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#0a0a0f] border border-white/10 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">{isEditing ? 'Edit Course' : 'Add New Course'}</h2>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Course Image</label>
                
                {/* Image Preview */}
                {imagePreview && (
                  <div className="mb-4 relative rounded-xl overflow-hidden">
                    <img 
                      src={imagePreview} 
                      alt="Preview" 
                      className="w-full h-48 object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setImageFile(null)
                        setImagePreview('')
                        setFormData(prev => ({ ...prev, image: '' }))
                      }}
                      className="absolute top-2 right-2 p-2 bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}

                {/* Upload Button */}
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    id="image-upload"
                  />
                  <label
                    htmlFor="image-upload"
                    className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 transition-colors cursor-pointer"
                  >
                    <Upload className="w-5 h-5" />
                    {imageFile ? imageFile.name : 'Choose Image'}
                  </label>
                </div>
                <p className="text-xs text-gray-500 mt-2">Max size: 5MB. Supported formats: JPG, PNG, GIF</p>
              </div>

              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Course Title *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-violet-500/50"
                  placeholder="e.g. Medical Assistant"
                />
              </div>

              {/* Price & Category */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Price ($) *</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-violet-500/50"
                    placeholder="3000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Category *</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-violet-500/50"
                  >
                    <option value="" className="bg-[#0a0a0f]">Select category</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat} className="bg-[#0a0a0f]">{cat}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Teacher */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Teacher/Instructor *</label>
                <input
                  type="text"
                  name="teacher"
                  value={formData.teacher}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-violet-500/50"
                  placeholder="John Doe"
                />
              </div>

              {/* Weeks & Hours */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Duration (Weeks)</label>
                  <input
                    type="number"
                    name="weeks"
                    value={formData.weeks}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-violet-500/50"
                    placeholder="15"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Total Hours</label>
                  <input
                    type="number"
                    name="hours"
                    value={formData.hours}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-violet-500/50"
                    placeholder="300"
                  />
                </div>
              </div>

              {/* Pre-requisite */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Pre-requisite</label>
                <input
                  type="text"
                  name="preRequisite"
                  value={formData.preRequisite}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-violet-500/50"
                  placeholder="GED/High school diploma"
                />
              </div>

              {/* Certification */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Certification</label>
                <input
                  type="text"
                  name="certification"
                  value={formData.certification}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-violet-500/50"
                  placeholder="Certified Medical Assistant (CMA)"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Description *</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-violet-500/50 resize-none"
                  placeholder="Enter course description..."
                />
              </div>

              {/* Review Number (hidden for new, editable for existing) */}
              {isEditing && (
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Review Count</label>
                  <input
                    type="number"
                    name="reviewNumber"
                    value={formData.reviewNumber}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-violet-500/50"
                    placeholder="0"
                  />
                </div>
              )}

              {/* Buttons */}
              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting || uploading}
                  className="flex-1 px-4 py-3 rounded-xl bg-violet-600 text-white hover:bg-violet-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {uploading ? 'Uploading Image...' : submitting ? 'Saving...' : isEditing ? 'Update Course' : 'Add Course'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl bg-[#0a0a0f] border border-white/10 p-6">
            <h2 className="text-xl font-bold mb-4">Delete Course</h2>
            <p className="text-gray-400 mb-6">Are you sure you want to delete this course? This action cannot be undone.</p>
            <div className="flex gap-4">
              <button
                onClick={() => { setIsDeleteModalOpen(false); setDeleteId(null); }}
                className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 px-4 py-3 rounded-xl bg-red-600 text-white hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}