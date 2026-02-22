import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import Link from 'next/link'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)
  if (!session?.user || (session.user as { role?: string }).role !== 'ADMIN') {
    redirect('/auth/signin')
  }

  const nav = [
    { label: 'Case Studies', href: '/admin/case-studies' },
    { label: 'Pricing Tiers', href: '/admin/pricing' },
    { label: 'Contact Submissions', href: '/admin/contact' },
    { label: 'Users', href: '/admin/users' },
  ]

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/admin" className="font-semibold text-slate-900">
            Stratosphere Admin
          </Link>
          <nav className="flex gap-6">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-slate-600 hover:text-slate-900"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="flex gap-4">
            <Link href="/" className="text-sm text-slate-600 hover:text-slate-900">
              View site
            </Link>
            <a
              href="/api/auth/signout"
              className="text-sm text-slate-600 hover:text-slate-900"
            >
              Sign out
            </a>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-6 py-8">{children}</main>
    </div>
  )
}
