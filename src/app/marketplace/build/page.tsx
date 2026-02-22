'use client'

import { useState } from 'react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Link from 'next/link'

const INTEGRATION_TYPES = [
  { value: 'alerts-notifications', label: 'Alerts & Notifications', desc: 'Push alerts to Slack, Teams, email, etc.' },
  { value: 'data-analytics', label: 'Data & Analytics', desc: 'BI tools, dashboards, Excel, Tableau' },
  { value: 'crm-sales', label: 'CRM & Sales', desc: 'Salesforce, HubSpot, deal risk scoring' },
  { value: 'automation', label: 'Automation', desc: 'Zapier, n8n, custom workflows' },
  { value: 'custom', label: 'Custom Integration', desc: 'Other use case' },
]

const PARTNERSHIP_INTERESTS = [
  'List app in Marketplace',
  'Co-marketing opportunities',
  'Technical support & certification',
  'Early API access',
  'Revenue share',
]

const CONTACT_EMAIL = 'info@francescatabor.com'

export default function BuildAppPage() {
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    // Company
    companyName: '',
    companyWebsite: '',
    workEmail: '',
    country: '',
    // App
    appName: '',
    appDescription: '',
    integrationType: '',
    targetUsers: '',
    // Partnership
    partnershipInterests: [] as string[],
    whyInterested: '',
    existingProduct: '',
    timeline: '',
    // Opt-in
    optInMarketing: false,
  })

  const inputClass =
    'w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 bg-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-accent-blue/30 focus:border-accent-blue transition-all'

  const labelClass = 'block text-sm font-medium text-slate-700 mb-2'

  const handleCheckboxChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      partnershipInterests: prev.partnershipInterests.includes(value)
        ? prev.partnershipInterests.filter((x) => x !== value)
        : [...prev.partnershipInterests, value],
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const body = [
      '=== Stratosphere App Builder Application ===',
      '',
      '--- Company ---',
      `Company Name: ${formData.companyName}`,
      `Website: ${formData.companyWebsite}`,
      `Work Email: ${formData.workEmail}`,
      `Country: ${formData.country}`,
      '',
      '--- App ---',
      `App Name: ${formData.appName}`,
      `Description: ${formData.appDescription}`,
      `Integration Type: ${formData.integrationType}`,
      `Target Users: ${formData.targetUsers}`,
      '',
      '--- Partnership ---',
      `Interests: ${formData.partnershipInterests.join(', ')}`,
      `Why interested: ${formData.whyInterested}`,
      `Existing product: ${formData.existingProduct}`,
      `Timeline: ${formData.timeline}`,
      '',
      `Marketing opt-in: ${formData.optInMarketing ? 'Yes' : 'No'}`,
    ].join('\n')

    const mailtoUrl = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
      'Stratosphere App Builder Application: ' + formData.appName || 'New Application'
    )}&body=${encodeURIComponent(body)}`
    window.location.href = mailtoUrl
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <main className="bg-white min-h-screen">
        <Navigation />
        <section className="pt-32 pb-20 px-6 min-h-[60vh] flex items-center">
          <div className="max-w-xl mx-auto text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center text-3xl mx-auto mb-6">
              ✓
            </div>
            <h1 className="font-semibold text-slate-900 text-3xl mb-4">Application submitted</h1>
            <p className="text-slate-600 mb-6">
              Your default mail client should have opened with a pre-filled application. Please send
              the email to complete your submission.
            </p>
            <p className="text-sm text-slate-500 mb-8">
              We&apos;ll review your application and get back to you within 5–7 business days.
            </p>
            <Link
              href="/marketplace"
              className="inline-block px-6 py-3 rounded-xl font-medium bg-slate-900 text-white hover:bg-slate-800 transition-all"
            >
              Back to Marketplace
            </Link>
          </div>
        </section>
        <Footer />
      </main>
    )
  }

  return (
    <main className="bg-white min-h-screen">
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-12 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="font-semibold text-slate-900 text-4xl md:text-5xl mb-4">
            Build an App
          </h1>
          <p className="text-lg text-slate-600">
            Apply to build integrations that extend Stratosphere. List your app in our marketplace,
            reach institutional users, and get technical support.
          </p>
        </div>
      </section>

      {/* Process steps */}
      <section className="pb-12 px-6">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between">
            {['Apply', 'Review', 'Build', 'Launch'].map((step, i) => (
              <div key={step} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      i === 0 ? 'bg-slate-900 text-white' : 'bg-slate-200 text-slate-500'
                    }`}
                  >
                    {i + 1}
                  </div>
                  <span className="text-xs text-slate-500 mt-1">{step}</span>
                </div>
                {i < 3 && <div className="flex-1 h-0.5 bg-slate-200 mx-2 min-w-[20px]" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="py-12 px-6 border-t border-slate-200">
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-12">
          {/* Company info */}
          <div>
            <h2 className="font-semibold text-slate-900 text-xl mb-6">Company information</h2>
            <div className="space-y-6">
              <div>
                <label htmlFor="companyName" className={labelClass}>
                  Company or developer name *
                </label>
                <input
                  id="companyName"
                  type="text"
                  required
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  placeholder="Acme Inc"
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="companyWebsite" className={labelClass}>
                  Company website
                </label>
                <input
                  id="companyWebsite"
                  type="url"
                  value={formData.companyWebsite}
                  onChange={(e) => setFormData({ ...formData, companyWebsite: e.target.value })}
                  placeholder="https://acme.com"
                  className={inputClass}
                />
              </div>
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="workEmail" className={labelClass}>
                    Work email *
                  </label>
                  <input
                    id="workEmail"
                    type="email"
                    required
                    value={formData.workEmail}
                    onChange={(e) => setFormData({ ...formData, workEmail: e.target.value })}
                    placeholder="you@company.com"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="country" className={labelClass}>
                    Country / Region
                  </label>
                  <input
                    id="country"
                    type="text"
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    placeholder="United States"
                    className={inputClass}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* App info */}
          <div>
            <h2 className="font-semibold text-slate-900 text-xl mb-6">App details</h2>
            <div className="space-y-6">
              <div>
                <label htmlFor="appName" className={labelClass}>
                  App name *
                </label>
                <input
                  id="appName"
                  type="text"
                  required
                  value={formData.appName}
                  onChange={(e) => setFormData({ ...formData, appName: e.target.value })}
                  placeholder="e.g. Slack Intelligence"
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="appDescription" className={labelClass}>
                  What does your app do? *
                </label>
                <textarea
                  id="appDescription"
                  required
                  rows={4}
                  value={formData.appDescription}
                  onChange={(e) => setFormData({ ...formData, appDescription: e.target.value })}
                  placeholder="Describe your integration and the value it provides to Stratosphere users..."
                  className={inputClass + ' resize-y'}
                />
              </div>
              <div>
                <label className={labelClass}>Integration type</label>
                <div className="space-y-3">
                  {INTEGRATION_TYPES.map((type) => (
                    <label
                      key={type.value}
                      className="flex items-start gap-3 p-4 rounded-xl border border-slate-200 hover:border-slate-300 cursor-pointer transition-colors"
                    >
                      <input
                        type="radio"
                        name="integrationType"
                        value={type.value}
                        checked={formData.integrationType === type.value}
                        onChange={(e) =>
                          setFormData({ ...formData, integrationType: e.target.value })
                        }
                        className="mt-1"
                      />
                      <div>
                        <span className="font-medium text-slate-900">{type.label}</span>
                        <p className="text-sm text-slate-500">{type.desc}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label htmlFor="targetUsers" className={labelClass}>
                  Who is your target user?
                </label>
                <input
                  id="targetUsers"
                  type="text"
                  value={formData.targetUsers}
                  onChange={(e) => setFormData({ ...formData, targetUsers: e.target.value })}
                  placeholder="e.g. Risk analysts, Supply chain managers, C-suite"
                  className={inputClass}
                />
              </div>
            </div>
          </div>

          {/* Partnership */}
          <div>
            <h2 className="font-semibold text-slate-900 text-xl mb-6">Partnership</h2>
            <div className="space-y-6">
              <div>
                <label className={labelClass}>What are you interested in? (select all that apply)</label>
                <div className="space-y-2">
                  {PARTNERSHIP_INTERESTS.map((interest) => (
                    <label
                      key={interest}
                      className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 hover:border-slate-300 cursor-pointer transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={formData.partnershipInterests.includes(interest)}
                        onChange={() => handleCheckboxChange(interest)}
                        className="rounded"
                      />
                      <span className="text-slate-700">{interest}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label htmlFor="whyInterested" className={labelClass}>
                  Why are you interested in building on Stratosphere?
                </label>
                <textarea
                  id="whyInterested"
                  rows={3}
                  value={formData.whyInterested}
                  onChange={(e) => setFormData({ ...formData, whyInterested: e.target.value })}
                  placeholder="Tell us about your goals and how Stratosphere fits into your strategy..."
                  className={inputClass + ' resize-y'}
                />
              </div>
              <div>
                <label htmlFor="existingProduct" className={labelClass}>
                  Do you have an existing product this will extend?
                </label>
                <input
                  id="existingProduct"
                  type="text"
                  value={formData.existingProduct}
                  onChange={(e) => setFormData({ ...formData, existingProduct: e.target.value })}
                  placeholder="e.g. Our BI platform, CRM tool..."
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="timeline" className={labelClass}>
                  Expected launch timeline
                </label>
                <input
                  id="timeline"
                  type="text"
                  value={formData.timeline}
                  onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                  placeholder="e.g. Q2 2025, 3 months"
                  className={inputClass}
                />
              </div>
            </div>
          </div>

          {/* Opt-in */}
          <div className="border-t border-slate-200 pt-8">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.optInMarketing}
                onChange={(e) =>
                  setFormData({ ...formData, optInMarketing: e.target.checked })
                }
                className="mt-1 rounded"
              />
              <span className="text-sm text-slate-600">
                Get emails from Stratosphere about API updates, marketplace news, and developer
                events. You can unsubscribe at any time.
              </span>
            </label>
          </div>

          {/* Submit */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              type="submit"
              className="px-8 py-4 rounded-xl font-medium bg-slate-900 text-white hover:bg-slate-800 transition-all duration-200"
            >
              Submit Application
            </button>
            <Link
              href="/marketplace"
              className="px-8 py-4 rounded-xl font-medium border border-slate-200 text-slate-700 hover:border-slate-300 transition-all duration-200 text-center"
            >
              Cancel
            </Link>
          </div>

          <p className="text-xs text-slate-500">
            Submissions are sent via email. Your default mail client will open with a pre-filled
            application. Questions? Reach out at{' '}
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-accent-blue hover:underline">
              {CONTACT_EMAIL}
            </a>
          </p>
        </form>
      </section>

      <Footer />
    </main>
  )
}
