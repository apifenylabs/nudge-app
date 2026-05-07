'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { User, Baby, MapPin, Save, ArrowLeft, Sparkles, Camera } from 'lucide-react'
import { createBrowserSupabaseClient } from '@/lib/supabase-browser'
import AuthGuard from '@/components/AuthGuard'

function AccountProfileForm() {
  const router = useRouter()
  const supabase = createBrowserSupabaseClient()

  const [name, setName] = useState('')
  const [kidAges, setKidAges] = useState<string[]>([])
  const [kidAgeInput, setKidAgeInput] = useState('')
  const [homeCity, setHomeCity] = useState('')
  const [avatarUrl, setAvatarUrl] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    async function loadProfile() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      if (data) {
        const profile = data as Record<string, unknown>;
        setName((profile.name as string) || '')
        setKidAges((profile.kids_ages as string[]) || [])
        setHomeCity((profile.home_city as string) || '')
        setAvatarUrl((profile.avatar_url as string) || '')
      }
      setLoading(false)
    }
    loadProfile()
  }, [supabase])

  const addKidAge = () => {
    const age = parseInt(kidAgeInput)
    if (!isNaN(age) && age >= 0 && age <= 18) {
      setKidAges([...kidAges, String(age)])
      setKidAgeInput('')
    }
  }

  const removeKidAge = (idx: number) => {
    setKidAges(kidAges.filter((_, i) => i !== idx))
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setMessage('')

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const { error } = await supabase
      .from('profiles')
      .upsert({
        id: user.id,
        name,
        kids_ages: kidAges,
        home_city: homeCity,
        avatar_url: avatarUrl,
        updated_at: new Date().toISOString(),
      })

    if (error) {
      setMessage('Error saving profile: ' + error.message)
    } else {
      setMessage('Profile updated successfully!')
    }
    setSaving(false)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-10 h-10 border-2 border-gray-200 border-t-sky-500 rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      {/* Back */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 mb-8 transition-colors"
      >
        <ArrowLeft size={16} />
        Back to destinations
      </Link>

      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-sky-400 to-blue-500 flex items-center justify-center shadow-lg shadow-sky-200">
          <User className="w-8 h-8 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Account Settings</h1>
          <p className="text-sm text-gray-500">Manage your profile and preferences</p>
        </div>
      </div>

      {/* Message */}
      {message && (
        <div className={`mb-6 p-3 rounded-xl border text-sm ${
          message.includes('Error')
            ? 'bg-red-50 border-red-200 text-red-700'
            : 'bg-emerald-50 border-emerald-200 text-emerald-700'
        }`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSave} className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8 space-y-6">
        {/* Avatar */}
        <div className="flex items-center gap-4 pb-6 border-b border-gray-100">
          <div className="relative">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-r from-sky-400 to-blue-500 flex items-center justify-center">
              <User className="w-10 h-10 text-white" />
            </div>
            <button
              type="button"
              className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-white border border-gray-200 flex items-center justify-center shadow-sm hover:bg-gray-50"
            >
              <Camera size={14} className="text-gray-500" />
            </button>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">{name || 'Your Name'}</p>
            <p className="text-xs text-gray-500">Profile photo coming soon</p>
          </div>
        </div>

        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1.5">
            <User size={14} className="inline mr-1.5 text-gray-400" />
            Full Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
          />
        </div>

        {/* Kids' Ages */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            <Baby size={14} className="inline mr-1.5 text-gray-400" />
            Kids' Ages <span className="text-gray-400 font-normal">(optional)</span>
          </label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              value={kidAgeInput}
              onChange={e => setKidAgeInput(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addKidAge(); } }}
              placeholder="Age (0-18)"
              min={0}
              max={18}
              className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
            />
            <button
              type="button"
              onClick={addKidAge}
              className="px-4 py-2.5 rounded-xl bg-gray-100 text-gray-700 font-medium text-sm hover:bg-gray-200 transition-colors"
            >
              Add
            </button>
          </div>
          {kidAges.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-2">
              {kidAges.map((age, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-sky-50 text-sky-700 text-xs font-medium border border-sky-100"
                >
                  {age} yrs
                  <button type="button" onClick={() => removeKidAge(i)} className="text-sky-400 hover:text-sky-600">&times;</button>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Home City */}
        <div>
          <label htmlFor="homeCity" className="block text-sm font-medium text-gray-700 mb-1.5">
            <MapPin size={14} className="inline mr-1.5 text-gray-400" />
            Home City <span className="text-gray-400 font-normal">(optional)</span>
          </label>
          <input
            id="homeCity"
            type="text"
            value={homeCity}
            onChange={e => setHomeCity(e.target.value)}
            placeholder="e.g., Hong Kong"
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
          />
        </div>

        {/* Save */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Save size={14} />
            <span>Don't forget to save</span>
          </div>
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2.5 bg-gradient-to-r from-sky-500 to-blue-600 text-white rounded-xl font-medium text-sm hover:shadow-lg hover:shadow-sky-200 transition-all disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>

      {/* Quick links */}
      <div className="mt-6 grid grid-cols-2 gap-4">
        <Link
          href="/account/saved"
          className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-200 hover:border-gray-300 transition-colors"
        >
          <div className="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center">
            <Save size={18} className="text-rose-500" />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900">Saved Destinations</p>
            <p className="text-xs text-gray-500">View your bookmarks</p>
          </div>
        </Link>
        <Link
          href="/account/reviews"
          className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-200 hover:border-gray-300 transition-colors"
        >
          <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center">
            <Sparkles size={18} className="text-amber-500" />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900">My Reviews</p>
            <p className="text-xs text-gray-500">Your shared feedback</p>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default function AccountPage() {
  return (
    <AuthGuard>
      <AccountProfileForm />
    </AuthGuard>
  )
}
