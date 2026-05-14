// app/admin/blogs/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabaseClient'
import Image from 'next/image'
import { FileText, Plus, Pencil, Trash2, Search, X, Upload, Heart, User } from 'lucide-react'
import dynamic from 'next/dynamic'
import 'react-quill/dist/quill.snow.css'

// Dynamically import ReactQuill to avoid SSR issues
const ReactQuill = dynamic(() => import('react-quill'), { 
  ssr: false,
  loading: () => <div className="w-full h-64 bg-white/5 rounded-xl animate-pulse" />
})

interface Blog {
  id: number
  user_image: string
  username: string
  title: string
  long_description: string
  reaction: number
  cover_image: string
  created_at?: string
}

const initialFormData: Omit<Blog, 'id' | 'created_at'> = {
  user_image: '',
  username: '',
  title: '',
  long_description: '',
  reaction: 0,
  cover_image: '',
}

// Quill editor modules configuration
const quillModules = {
  toolbar: [
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    [{ 'font': [] }],
    [{ 'size': ['small', false, 'large', 'huge'] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ 'color': [] }, { 'background': [] }],
    [{ 'script': 'sub'}, { 'script': 'super' }],
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    [{ 'indent': '-1'}, { 'indent': '+1' }],
    [{ 'align': [] }],
    ['blockquote', 'code-block'],
    ['link', 'image', 'video'],
    ['clean']
  ],
}

const quillFormats = [
  'header', 'font', 'size',
  'bold', 'italic', 'underline', 'strike',
  'color', 'background',
  'script',
  'list', 'bullet', 'indent',
  'align',
  'blockquote', 'code-block',
  'link', 'image', 'video'
]

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([])
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
  const [coverImageFile, setCoverImageFile] = useState<File | null>(null)
  const [coverImagePreview, setCoverImagePreview] = useState<string>('')
  const [userImageFile, setUserImageFile] = useState<File | null>(null)
  const [userImagePreview, setUserImagePreview] = useState<string>('')
  const [uploading, setUploading] = useState(false)

  // Delete confirmation
  const [deleteId, setDeleteId] = useState<number | null>(null)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  useEffect(() => {
    fetchBlogs()
  }, [])

  async function fetchBlogs() {
    try {
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (error) throw error
      setBlogs(data || [])
    } catch (err: any) {
      console.error('Error:', err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  // Handle cover image selection
  function handleCoverImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) {
      if (!file.type.startsWith('image/')) {
        setError('Please select an image file')
        return
      }
      
      if (file.size > 5 * 1024 * 1024) {
        setError('Image size should be less than 5MB')
        return
      }

      setCoverImageFile(file)
      
      const reader = new FileReader()
      reader.onloadend = () => {
        setCoverImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
      setError(null)
    }
  }

  // Handle user image selection
  function handleUserImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) {
      if (!file.type.startsWith('image/')) {
        setError('Please select an image file')
        return
      }
      
      if (file.size > 5 * 1024 * 1024) {
        setError('Image size should be less than 5MB')
        return
      }

      setUserImageFile(file)
      
      const reader = new FileReader()
      reader.onloadend = () => {
        setUserImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
      setError(null)
    }
  }

  // Upload image to Supabase Storage
  async function uploadImage(file: File, folder: string): Promise<string> {
    const fileExt = file.name.split('.').pop()
    const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`
    const filePath = `${folder}/${fileName}`

    const { error: uploadError } = await supabase.storage
      .from('blogs')
      .upload(filePath, file)

    if (uploadError) {
      throw uploadError
    }

    const { data } = supabase.storage
      .from('blogs')
      .getPublicUrl(filePath)

    return data.publicUrl
  }

  // Handle form input changes
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'reaction' ? Number(value) : value
    }))
  }

  // Handle rich text editor change
  function handleEditorChange(content: string) {
    setFormData(prev => ({
      ...prev,
      long_description: content
    }))
  }

  // Open modal for adding
  function openAddModal() {
    setFormData(initialFormData)
    setIsEditing(false)
    setEditingId(null)
    setCoverImageFile(null)
    setCoverImagePreview('')
    setUserImageFile(null)
    setUserImagePreview('')
    setIsModalOpen(true)
  }

  // Open modal for editing
  function openEditModal(blog: Blog) {
    setFormData({
      user_image: blog.user_image,
      username: blog.username,
      title: blog.title,
      long_description: blog.long_description,
      reaction: blog.reaction,
      cover_image: blog.cover_image,
    })
    setIsEditing(true)
    setEditingId(blog.id)
    setCoverImageFile(null)
    setCoverImagePreview(blog.cover_image)
    setUserImageFile(null)
    setUserImagePreview(blog.user_image)
    setIsModalOpen(true)
  }

  // Submit form (Add or Edit)
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)

    try {
      let coverImageUrl = formData.cover_image
      let userImageUrl = formData.user_image

      setUploading(true)

      // Upload new cover image if selected
      if (coverImageFile) {
        coverImageUrl = await uploadImage(coverImageFile, 'cover-images')
      }

      // Upload new user image if selected
      if (userImageFile) {
        userImageUrl = await uploadImage(userImageFile, 'user-images')
      }

      setUploading(false)

      const blogData = {
        ...formData,
        cover_image: coverImageUrl,
        user_image: userImageUrl
      }

      if (isEditing && editingId) {
        const { error } = await supabase
          .from('blogs')
          .update(blogData)
          .eq('id', editingId)
        
        if (error) throw error
      } else {
        const { error } = await supabase
          .from('blogs')
          .insert([blogData])
        
        if (error) throw error
      }

      setIsModalOpen(false)
      setFormData(initialFormData)
      setCoverImageFile(null)
      setCoverImagePreview('')
      setUserImageFile(null)
      setUserImagePreview('')
      fetchBlogs()
    } catch (err: any) {
      console.error('Error:', err)
      setError(err.message)
    } finally {
      setSubmitting(false)
      setUploading(false)
    }
  }

  // Delete blog
  async function handleDelete() {
    if (!deleteId) return
    
    try {
      const { error } = await supabase
        .from('blogs')
        .delete()
        .eq('id', deleteId)
      
      if (error) throw error
      
      setIsDeleteModalOpen(false)
      setDeleteId(null)
      fetchBlogs()
    } catch (err: any) {
      console.error('Error:', err)
      setError(err.message)
    }
  }

  // Handle reaction (like/love)
  async function handleReaction(blogId: number) {
    try {
      const blog = blogs.find(b => b.id === blogId)
      if (!blog) return

      const newReactionCount = blog.reaction + 1

      const { error } = await supabase
        .from('blogs')
        .update({ reaction: newReactionCount })
        .eq('id', blogId)
      
      if (error) throw error

      setBlogs(prevBlogs => 
        prevBlogs.map(b => 
          b.id === blogId 
            ? { ...b, reaction: newReactionCount }
            : b
        )
      )
    } catch (err: any) {
      console.error('Error updating reaction:', err)
      setError(err.message)
    }
  }

  // Strip HTML tags for preview
  function stripHtml(html: string): string {
    const tmp = document.createElement('DIV')
    tmp.innerHTML = html
    return tmp.textContent || tmp.innerText || ''
  }

  const filteredBlogs = blogs.filter(blog => 
    blog.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    blog.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    stripHtml(blog.long_description || '').toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold">Manage Blogs</h1>
          <p className="text-gray-400 text-sm mt-1">{blogs.length} total blogs</p>
        </div>
        <button 
          onClick={openAddModal}
          className="flex items-center gap-2 px-4 py-2 bg-violet-600 rounded-lg hover:bg-violet-700 transition-colors w-fit"
        >
          <Plus className="w-4 h-4" />
          Add Blog
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
        <input
          type="text"
          placeholder="Search blogs..."
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
      ) : blogs.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 rounded-2xl bg-white/5 border border-white/10">
          <FileText className="w-12 h-12 text-violet-400 mb-4" />
          <h3 className="text-xl font-semibold mb-2">No blogs yet</h3>
          <p className="text-gray-400 mb-6">Create your first blog post to get started</p>
          <button 
            onClick={openAddModal}
            className="flex items-center gap-2 px-6 py-3 bg-violet-600 rounded-xl hover:bg-violet-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Add First Blog
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBlogs.map((blog) => (
            <div key={blog.id} className="rounded-2xl bg-white/5 border border-white/10 overflow-hidden hover:border-white/20 transition-all">
              {/* Cover Image */}
              <div className="h-48 bg-gradient-to-br from-violet-600/20 to-fuchsia-600/20 flex items-center justify-center relative overflow-hidden">
                {blog.cover_image ? (
                  <Image 
                    src={blog.cover_image} 
                    alt={blog.title} 
                    fill
                    className="object-cover"
                  />
                ) : (
                  <FileText className="w-12 h-12 text-violet-400" />
                )}
              </div>
              
              {/* Blog Info */}
              <div className="p-5">
                {/* Author Info */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center overflow-hidden relative">
                    {blog.user_image ? (
                      <Image 
                        src={blog.user_image} 
                        alt={blog.username} 
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <User className="w-5 h-5 text-white" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{blog.username}</p>
                    <p className="text-xs text-gray-400">{new Date(blog.created_at || '').toLocaleDateString()}</p>
                  </div>
                </div>
                
                <h3 className="text-lg font-semibold mb-2 line-clamp-2">{blog.title}</h3>
                
                <p className="text-gray-400 text-sm mb-4 line-clamp-3">{stripHtml(blog.long_description)}</p>
                
                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <button
                    onClick={() => handleReaction(blog.id)}
                    className="flex items-center gap-2 text-sm text-gray-400 hover:text-red-400 transition-colors group"
                  >
                    <Heart className="w-4 h-4 group-hover:fill-red-400 group-hover:text-red-400 transition-all" />
                    <span>{blog.reaction} reactions</span>
                  </button>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => openEditModal(blog)}
                      className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => { setDeleteId(blog.id); setIsDeleteModalOpen(true); }}
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
          <div className="w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#0a0a0f] border border-white/10 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">{isEditing ? 'Edit Blog' : 'Add New Blog'}</h2>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Cover Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Cover Image *</label>
                
                {coverImagePreview && (
                  <div className="mb-4 relative rounded-xl overflow-hidden h-48">
                    <Image 
                      src={coverImagePreview} 
                      alt="Cover Preview" 
                      fill
                      className="object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setCoverImageFile(null)
                        setCoverImagePreview('')
                        setFormData(prev => ({ ...prev, cover_image: '' }))
                      }}
                      className="absolute top-2 right-2 p-2 bg-red-600 rounded-lg hover:bg-red-700 transition-colors z-10"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}

                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleCoverImageChange}
                    className="hidden"
                    id="cover-image-upload"
                  />
                  <label
                    htmlFor="cover-image-upload"
                    className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 transition-colors cursor-pointer"
                  >
                    <Upload className="w-5 h-5" />
                    {coverImageFile ? coverImageFile.name : 'Choose Cover Image'}
                  </label>
                </div>
              </div>

              {/* User Image & Username */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Author Image</label>
                  
                  {userImagePreview && (
                    <div className="mb-4 relative w-24 h-24 rounded-full overflow-hidden">
                      <Image 
                        src={userImagePreview} 
                        alt="User Preview" 
                        fill
                        className="object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setUserImageFile(null)
                          setUserImagePreview('')
                          setFormData(prev => ({ ...prev, user_image: '' }))
                        }}
                        className="absolute top-0 right-0 p-1 bg-red-600 rounded-full hover:bg-red-700 transition-colors z-10"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  )}

                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleUserImageChange}
                      className="hidden"
                      id="user-image-upload"
                    />
                    <label
                      htmlFor="user-image-upload"
                      className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 transition-colors cursor-pointer"
                    >
                      <Upload className="w-5 h-5" />
                      Choose
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Author Name *</label>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-violet-500/50"
                    placeholder="John Doe"
                  />
                </div>
              </div>

              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Blog Title *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-violet-500/50"
                  placeholder="Introduction to React Hooks"
                />
              </div>

              {/* Rich Text Editor */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Content *</label>
                <div className="quill-editor-wrapper">
                  <ReactQuill
                    theme="snow"
                    value={formData.long_description}
                    onChange={handleEditorChange}
                    modules={quillModules}
                    formats={quillFormats}
                    placeholder="Write your blog content here..."
                    className="bg-white/5 rounded-xl border border-white/10"
                  />
                </div>
              </div>

              {/* Reaction Count (for editing) */}
              {isEditing && (
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Reaction Count</label>
                  <input
                    type="number"
                    name="reaction"
                    value={formData.reaction}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-violet-500/50"
                    placeholder="0"
                  />
                </div>
              )}

              <p className="text-xs text-gray-500">Max image size: 5MB. Supported formats: JPG, PNG, GIF</p>

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
                  {uploading ? 'Uploading Images...' : submitting ? 'Saving...' : isEditing ? 'Update Blog' : 'Add Blog'}
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
            <h2 className="text-xl font-bold mb-4">Delete Blog</h2>
            <p className="text-gray-400 mb-6">Are you sure you want to delete this blog post? This action cannot be undone.</p>
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

      <style jsx global>{`
        .quill-editor-wrapper .ql-container {
          min-height: 300px;
          font-size: 14px;
          background: rgba(255, 255, 255, 0.03);
          border-bottom-left-radius: 12px;
          border-bottom-right-radius: 12px;
        }
        
        .quill-editor-wrapper .ql-toolbar {
          background: rgba(255, 255, 255, 0.05);
          border-top-left-radius: 12px;
          border-top-right-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-bottom: none;
        }
        
        .quill-editor-wrapper .ql-container {
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-top: none;
          color: white;
        }
        
        .quill-editor-wrapper .ql-editor.ql-blank::before {
          color: rgba(156, 163, 175, 0.6);
        }
        
        .quill-editor-wrapper .ql-snow .ql-stroke {
          stroke: rgba(255, 255, 255, 0.7);
        }
        
        .quill-editor-wrapper .ql-snow .ql-fill {
          fill: rgba(255, 255, 255, 0.7);
        }
        
        .quill-editor-wrapper .ql-snow .ql-picker-label {
          color: rgba(255, 255, 255, 0.7);
        }
        
        .quill-editor-wrapper .ql-toolbar button:hover,
        .quill-editor-wrapper .ql-toolbar button.ql-active {
          color: #a78bfa !important;
        }
        
        .quill-editor-wrapper .ql-toolbar button:hover .ql-stroke,
        .quill-editor-wrapper .ql-toolbar button.ql-active .ql-stroke {
          stroke: #a78bfa !important;
        }
        
        .quill-editor-wrapper .ql-toolbar button:hover .ql-fill,
        .quill-editor-wrapper .ql-toolbar button.ql-active .ql-fill {
          fill: #a78bfa !important;
        }
        
        .quill-editor-wrapper .ql-snow.ql-toolbar button:hover,
        .quill-editor-wrapper .ql-snow .ql-toolbar button:hover,
        .quill-editor-wrapper .ql-snow.ql-toolbar button.ql-active,
        .quill-editor-wrapper .ql-snow .ql-toolbar button.ql-active {
          background: rgba(167, 139, 250, 0.1);
          border-radius: 4px;
        }
      `}</style>
    </div>
  )
}