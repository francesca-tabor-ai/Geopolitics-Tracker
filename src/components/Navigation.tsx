'use client'

import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'

const navItems = [
  { label: 'Pricing', href: '/pricing' },
  { label: 'Case Studies', href: '/case-studies' },
  { label: 'API Docs', href: '/api-docs' },
  { label: 'Marketplace', href: '/marketplace' },
  { label: 'Contact', href: '/contact' },
]

export default function Navigation() {
  const { data: session, status } = useSession()
  const isAdmin = (session?.user as { role?: string })?.role === 'ADMIN'

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="font-semibold text-lg tracking-tight text-slate-900">
          Stratosphere
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="nav-link text-sm text-slate-600 hover:text-slate-900 px-2 py-1 -mx-2 -my-1 rounded"
            >
              {item.label}
            </Link>
          ))}
          {isAdmin && (
            <Link
              href="/admin"
              className="nav-link text-sm text-accent-blue font-medium hover:text-accent-blue/80 px-2 py-1 -mx-2 -my-1 rounded"
            >
              Admin
            </Link>
          )}
        </div>

        <div className="flex items-center gap-4">
          {status === 'loading' ? (
            <span className="text-sm text-slate-400">Loading...</span>
          ) : session ? (
            <>
              <span className="text-sm text-slate-600 hidden sm:inline truncate max-w-[120px]">
                {session.user?.name || session.user?.email}
              </span>
              {isAdmin && (
                <Link
                  href="/admin"
                  className="btn-primary px-4 py-2 text-sm font-medium rounded-xl bg-accent-blue text-white hover:bg-accent-blue/90"
                >
                  Admin
                </Link>
              )}
              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className="nav-link text-sm text-slate-600 hover:text-slate-900 px-2 py-1 -mx-2 -my-1 rounded"
              >
                Sign out
              </button>
            </>
          ) : (
            <>
              <Link
                href="/auth/signin"
                className="nav-link text-sm text-slate-600 hover:text-slate-900 px-2 py-1 -mx-2 -my-1 rounded"
              >
                Sign in
              </Link>
              <Link
                href="/auth/signup"
                className="btn-primary px-4 py-2 text-sm font-medium rounded-xl bg-slate-900 text-white hover:bg-slate-800 hover:shadow-soft"
              >
                Get Access
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
