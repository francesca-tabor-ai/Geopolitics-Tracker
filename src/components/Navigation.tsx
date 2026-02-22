'use client'

import Link from 'next/link'

const navItems = [
  { label: 'Pricing', href: '/pricing' },
  { label: 'Case Studies', href: '/case-studies' },
  { label: 'Contact', href: '/contact' },
  { label: 'Intelligence', href: '#' },
  { label: 'Reports', href: '#' },
]

export default function Navigation() {
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
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="#"
            className="nav-link text-sm text-slate-600 hover:text-slate-900 px-2 py-1 -mx-2 -my-1 rounded"
          >
            Sign in
          </Link>
          <Link
            href="#"
            className="btn-primary px-4 py-2 text-sm font-medium rounded-xl bg-slate-900 text-white hover:bg-slate-800 hover:shadow-soft"
          >
            Get Access
          </Link>
        </div>
      </div>
    </nav>
  )
}
