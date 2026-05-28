import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import AdminSidebar from '@/components/admin/AdminSidebar'

export const metadata = {
  title: 'Admin | Nudge',
  robots: { index: false, follow: false },
}

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect('/auth/login')

  // Check if user is an admin — look for admin role in users table
  const { data: profile } = await supabase
    .from('users')
    .select('id, email, is_admin')
    .eq('id', user.id)
    .single()

  // Also check via admin_user role/flag
  const isAdmin = profile?.is_admin === true

  // Fallback: check if user's email domain or specific emails
  const adminEmails = (process.env.ADMIN_EMAILS || '').split(',').map(e => e.trim().toLowerCase())
  const emailIsAdmin = adminEmails.length > 0 && adminEmails.includes((profile?.email || '').toLowerCase())

  if (!isAdmin && !emailIsAdmin) {
    redirect('/dashboard')
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="flex">
        <AdminSidebar />
        <main className="flex-1 p-6 lg:p-8 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
