'use client'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { Mail, Phone, User, Calendar, Eye, Trash2, Search, Filter, X, RefreshCw, Send } from 'lucide-react'

interface ContactSubmission {
  id: string
  name: string
  email: string
  contact: string
  message: string
  created_at: string
  status: 'new' | 'read' | 'replied'
}

export default function ContactFormsPage() {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<'all' | 'new' | 'read' | 'replied'>('all')
  const [selectedSubmission, setSelectedSubmission] = useState<ContactSubmission | null>(null)
  const [showReplyModal, setShowReplyModal] = useState(false)
  const [replySubject, setReplySubject] = useState('')
  const [replyMessage, setReplyMessage] = useState('')
  const [sending, setSending] = useState(false)

  useEffect(() => {
    fetchSubmissions()
  }, [])

  async function fetchSubmissions() {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('contact_submissions')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setSubmissions(data || [])
    } catch (error) {
      console.error('Error fetching submissions:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredSubmissions = submissions.filter(sub => {
    const matchesSearch = 
      sub.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sub.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sub.message.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesFilter = filterStatus === 'all' || sub.status === filterStatus
    
    return matchesSearch && matchesFilter
  })

  async function handleStatusChange(id: string, newStatus: 'new' | 'read' | 'replied') {
    try {
      const { error } = await supabase
        .from('contact_submissions')
        .update({ status: newStatus })
        .eq('id', id)

      if (error) throw error

      setSubmissions(prev => 
        prev.map(sub => sub.id === id ? { ...sub, status: newStatus } : sub)
      )

      if (selectedSubmission?.id === id) {
        setSelectedSubmission(prev => prev ? { ...prev, status: newStatus } : null)
      }
    } catch (error) {
      console.error('Error updating status:', error)
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Are you sure you want to delete this submission?')) return

    try {
      const { error } = await supabase
        .from('contact_submissions')
        .delete()
        .eq('id', id)

      if (error) throw error

      setSubmissions(prev => prev.filter(sub => sub.id !== id))
      setSelectedSubmission(null)
    } catch (error) {
      console.error('Error deleting submission:', error)
    }
  }

  function handleViewSubmission(submission: ContactSubmission) {
    setSelectedSubmission(submission)
    if (submission.status === 'new') {
      handleStatusChange(submission.id, 'read')
    }
  }

  function openReplyModal(submission: ContactSubmission) {
    setReplySubject(`Re: Your Contact Form Submission`)
    setReplyMessage(`Hi ${submission.name},\n\nThank you for contacting us.\n\n`)
    setShowReplyModal(true)
  }

  async function handleSendReply() {
    if (!selectedSubmission || !replyMessage.trim()) return

    setSending(true)
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: selectedSubmission.email,
          subject: replySubject,
          message: replyMessage,
          name: selectedSubmission.name
        })
      })

      if (response.ok) {
        await handleStatusChange(selectedSubmission.id, 'replied')
        alert('Reply sent successfully!')
        setShowReplyModal(false)
        setReplyMessage('')
        setReplySubject('')
      } else {
        throw new Error('Failed to send email')
      }
    } catch (error) {
      console.error('Error sending reply:', error)
      alert('Failed to send reply. Please check your email configuration.')
    } finally {
      setSending(false)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'new': return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
      case 'read': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
      case 'replied': return 'bg-green-500/20 text-green-400 border-green-500/30'
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    }
  }

  const stats = {
    total: submissions.length,
    new: submissions.filter(s => s.status === 'new').length,
    read: submissions.filter(s => s.status === 'read').length,
    replied: submissions.filter(s => s.status === 'replied').length
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold mb-2 bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
              Contact Form Submissions
            </h1>
            <p className="text-gray-400">Manage and respond to customer inquiries</p>
          </div>
          <button
            onClick={fetchSubmissions}
            className="flex items-center gap-2 px-4 py-2 bg-violet-600 hover:bg-violet-700 rounded-xl transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1">Total</p>
                <p className="text-3xl font-bold">{stats.total}</p>
              </div>
              <Mail className="w-10 h-10 text-violet-400" />
            </div>
          </div>
          
          <div className="bg-blue-500/10 backdrop-blur-sm border border-blue-500/30 rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1">New</p>
                <p className="text-3xl font-bold text-blue-400">{stats.new}</p>
              </div>
              <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center">
                <span className="text-blue-400 font-bold">{stats.new}</span>
              </div>
            </div>
          </div>

          <div className="bg-yellow-500/10 backdrop-blur-sm border border-yellow-500/30 rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1">Read</p>
                <p className="text-3xl font-bold text-yellow-400">{stats.read}</p>
              </div>
              <Eye className="w-10 h-10 text-yellow-400" />
            </div>
          </div>

          <div className="bg-green-500/10 backdrop-blur-sm border border-green-500/30 rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1">Replied</p>
                <p className="text-3xl font-bold text-green-400">{stats.replied}</p>
              </div>
              <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center text-green-400">
                ✓
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, email, or message..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-violet-500 transition-colors"
            />
          </div>
          <div className="flex gap-2">
            {['all', 'new', 'read', 'replied'].map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status as any)}
                className={`px-4 py-3 rounded-xl font-medium capitalize transition-all ${
                  filterStatus === status
                    ? 'bg-violet-600 text-white'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Submissions List */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-12 h-12 border-4 border-violet-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : filteredSubmissions.length === 0 ? (
          <div className="text-center py-20">
            <Mail className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400 text-lg">No submissions found</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {filteredSubmissions.map((submission) => (
              <div
                key={submission.id}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-violet-500/50 transition-all cursor-pointer"
                onClick={() => handleViewSubmission(submission)}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold">{submission.name}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(submission.status)}`}>
                        {submission.status}
                      </span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-gray-400 mb-3">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        {submission.email}
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        {submission.contact}
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {formatDate(submission.created_at)}
                      </div>
                    </div>
                    <p className="text-gray-300 line-clamp-2">{submission.message}</p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleDelete(submission.id)
                    }}
                    className="p-2 hover:bg-red-500/20 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-5 h-5 text-red-400" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal for viewing full submission */}
      {selectedSubmission && !showReplyModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50" onClick={() => setSelectedSubmission(null)}>
          <div className="bg-[#0a0a0f] border border-white/10 rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between mb-6">
              <h2 className="text-2xl font-bold">Contact Submission</h2>
              <button
                onClick={() => setSelectedSubmission(null)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="text-gray-400 text-sm mb-2 block">Name</label>
                <div className="flex items-center gap-3 p-4 bg-white/5 rounded-xl">
                  <User className="w-5 h-5 text-violet-400" />
                  <span className="font-medium">{selectedSubmission.name}</span>
                </div>
              </div>

              <div>
                <label className="text-gray-400 text-sm mb-2 block">Email</label>
                <div className="flex items-center gap-3 p-4 bg-white/5 rounded-xl">
                  <Mail className="w-5 h-5 text-violet-400" />
                  <a href={`mailto:${selectedSubmission.email}`} className="font-medium hover:text-violet-400 transition-colors">
                    {selectedSubmission.email}
                  </a>
                </div>
              </div>

              <div>
                <label className="text-gray-400 text-sm mb-2 block">Phone</label>
                <div className="flex items-center gap-3 p-4 bg-white/5 rounded-xl">
                  <Phone className="w-5 h-5 text-violet-400" />
                  <a href={`tel:${selectedSubmission.contact}`} className="font-medium hover:text-violet-400 transition-colors">
                    {selectedSubmission.contact}
                  </a>
                </div>
              </div>

              <div>
                <label className="text-gray-400 text-sm mb-2 block">Submitted At</label>
                <div className="flex items-center gap-3 p-4 bg-white/5 rounded-xl">
                  <Calendar className="w-5 h-5 text-violet-400" />
                  <span className="font-medium">{formatDate(selectedSubmission.created_at)}</span>
                </div>
              </div>

              <div>
                <label className="text-gray-400 text-sm mb-2 block">Message</label>
                <div className="p-4 bg-white/5 rounded-xl">
                  <p className="text-gray-300 whitespace-pre-wrap">{selectedSubmission.message}</p>
                </div>
              </div>

              <div>
                <label className="text-gray-400 text-sm mb-2 block">Status</label>
                <div className="flex gap-2">
                  {['new', 'read', 'replied'].map((status) => (
                    <button
                      key={status}
                      onClick={() => handleStatusChange(selectedSubmission.id, status as any)}
                      className={`px-4 py-2 rounded-xl font-medium capitalize transition-all ${
                        selectedSubmission.status === status
                          ? 'bg-violet-600 text-white'
                          : 'bg-white/5 text-gray-400 hover:bg-white/10'
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  onClick={() => openReplyModal(selectedSubmission)}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700 rounded-xl font-semibold text-center transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  Reply via Email
                </button>
                <button
                  onClick={() => handleDelete(selectedSubmission.id)}
                  className="px-6 py-3 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-xl font-semibold transition-all"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reply Modal */}
      {showReplyModal && selectedSubmission && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50" onClick={() => setShowReplyModal(false)}>
          <div className="bg-[#0a0a0f] border border-white/10 rounded-3xl p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold mb-1">Compose Reply</h2>
                <p className="text-gray-400 text-sm">To: {selectedSubmission.email}</p>
              </div>
              <button
                onClick={() => setShowReplyModal(false)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-6">
              {/* Original Message Reference */}
              <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
                <p className="text-xs text-gray-400 mb-2">ORIGINAL MESSAGE FROM {selectedSubmission.name.toUpperCase()}</p>
                <p className="text-sm text-gray-300 italic">&quot;{selectedSubmission.message}&quot;</p>
              </div>

              {/* Subject */}
              <div>
                <label className="text-gray-400 text-sm mb-2 block">Subject</label>
                <input
                  type="text"
                  value={replySubject}
                  onChange={(e) => setReplySubject(e.target.value)}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-violet-500 transition-colors text-white"
                  placeholder="Email subject..."
                />
              </div>

              {/* Message */}
              <div>
                <label className="text-gray-400 text-sm mb-2 block">Your Reply</label>
                <textarea
                  value={replyMessage}
                  onChange={(e) => setReplyMessage(e.target.value)}
                  rows={12}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-violet-500 transition-colors resize-none text-white"
                  placeholder="Type your reply here..."
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-4">
                <button
                  onClick={handleSendReply}
                  disabled={sending || !replyMessage.trim()}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700 rounded-xl font-semibold text-center transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {sending ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Reply
                    </>
                  )}
                </button>
                <button
                  onClick={() => setShowReplyModal(false)}
                  disabled={sending}
                  className="px-6 py-3 bg-white/5 hover:bg-white/10 text-gray-400 rounded-xl font-semibold transition-all disabled:opacity-50"
                >
                  Cancel
                </button>
              </div>

              {/* Note */}
              <p className="text-xs text-gray-500 text-center">
                Make sure your email API is configured in /api/send-email
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}