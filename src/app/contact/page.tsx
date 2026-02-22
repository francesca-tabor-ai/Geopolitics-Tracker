'use client'

import { useState } from 'react'
import Navigation from '@/components/Navigation'
import Link from 'next/link'

const REQUEST_TYPES = [
  { value: 'customer-support', label: 'Customer Support', subject: 'Customer Support Request' },
  { value: 'bug-report', label: 'Bug Report', subject: 'Bug Report' },
  { value: 'general', label: 'General Inquiry', subject: 'General Inquiry' },
] as const

const CONTACT_EMAIL = 'info@francescatabor.com'

export default function ContactPage() {
  const [requestType, setRequestType] = useState<string>('customer-support')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const typeConfig = REQUEST_TYPES.find((t) => t.value === requestType)
    const subject = typeConfig?.subject ?? 'Contact Request'
    const body = [
      `Request type: ${typeConfig?.label ?? requestType}`,
      `From: ${name} (${email})`,
      '',
      '--- Message ---',
      message,
    ].join('\n')

    const mailtoUrl = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    window.location.href = mailtoUrl
    setSubmitted(true)
  }

  return (
    <main className="bg-white min-h-screen">
      <Navigation />

      <section className="pt-32 pb-20 px-6">
        <div className="max-w-2xl mx-auto">
          <div className="mb-12">
            <h1 className="font-semibold text-slate-900 text-4xl md:text-5xl mb-4">
              Contact Us
            </h1>
            <p className="text-lg text-slate-600">
              Have a question, need support, or found a bug? We&apos;ll get back to you as soon as possible.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="request-type" className="block text-sm font-medium text-slate-700 mb-2">
                Request Type
              </label>
              <select
                id="request-type"
                value={requestType}
                onChange={(e) => setRequestType(e.target.value)}
                className="
                  w-full px-4 py-3 rounded-xl border border-slate-200
                  text-slate-900 bg-white
                  focus:outline-none focus:ring-2 focus:ring-accent-blue/30 focus:border-accent-blue
                  transition-all
                "
              >
                {REQUEST_TYPES.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="Your name"
                  className="
                    w-full px-4 py-3 rounded-xl border border-slate-200
                    text-slate-900 placeholder:text-slate-400
                    focus:outline-none focus:ring-2 focus:ring-accent-blue/30 focus:border-accent-blue
                    transition-all
                  "
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="you@example.com"
                  className="
                    w-full px-4 py-3 rounded-xl border border-slate-200
                    text-slate-900 placeholder:text-slate-400
                    focus:outline-none focus:ring-2 focus:ring-accent-blue/30 focus:border-accent-blue
                    transition-all
                  "
                />
              </div>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">
                Message
              </label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                rows={6}
                placeholder={
                  requestType === 'bug-report'
                    ? 'Describe the bug, steps to reproduce, and any error messages...'
                    : 'How can we help you?'
                }
                className="
                  w-full px-4 py-3 rounded-xl border border-slate-200
                  text-slate-900 placeholder:text-slate-400
                  focus:outline-none focus:ring-2 focus:ring-accent-blue/30 focus:border-accent-blue
                  transition-all resize-y min-h-[120px]
                "
              />
            </div>

            <p className="text-sm text-slate-500">
              Submissions are sent via email to <strong>{CONTACT_EMAIL}</strong>. Your default mail client will open with a pre-filled message.
            </p>

            {submitted ? (
              <div className="p-4 rounded-xl bg-slate-100 text-slate-700 text-sm">
                Your mail client should have opened. If it didn&apos;t, you can email us directly at{' '}
                <a href={`mailto:${CONTACT_EMAIL}`} className="text-accent-blue hover:underline font-medium">
                  {CONTACT_EMAIL}
                </a>
              </div>
            ) : null}

            <button
              type="submit"
              className="
                w-full sm:w-auto px-8 py-4 rounded-xl font-medium
                bg-slate-900 text-white hover:bg-slate-800
                transition-all duration-200
              "
            >
              Send Message
            </button>
          </form>
        </div>
      </section>

      <footer className="py-12 px-6 border-t border-slate-200">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <Link href="/" className="font-semibold text-slate-900">Stratosphere</Link>
          <div className="flex gap-8 text-sm text-slate-500">
            <Link href="/pricing" className="hover:text-slate-900 transition-colors">Pricing</Link>
            <Link href="/case-studies" className="hover:text-slate-900 transition-colors">Case Studies</Link>
            <Link href="/contact" className="hover:text-slate-900 transition-colors">Contact</Link>
            <a href="#" className="hover:text-slate-900 transition-colors">Privacy</a>
            <a href="#" className="hover:text-slate-900 transition-colors">Terms</a>
          </div>
        </div>
      </footer>
    </main>
  )
}
