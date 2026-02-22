'use client'

import { useEffect, useState } from 'react'

type PricingTier = {
  id: string
  name: string
  description: string
  monthlyPrice: number | null
  annualPrice: number | null
  isCustom: boolean
  popular: boolean
  cta: string
  href: string
  limits: string
  features: string
  sortOrder: number
}

export default function AdminPricingPage() {
  const [items, setItems] = useState<PricingTier[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<PricingTier | null>(null)
  const [form, setForm] = useState<Partial<PricingTier>>({})

  const fetchItems = async () => {
    const res = await fetch('/api/admin/pricing-tiers')
    const data = await res.json()
    if (res.ok) setItems(data)
    setLoading(false)
  }

  useEffect(() => {
    fetchItems()
  }, [])

  const handleCreate = () => {
    setEditing({
      id: '',
      name: '',
      description: '',
      monthlyPrice: 0,
      annualPrice: 0,
      isCustom: false,
      popular: false,
      cta: 'Start free trial',
      href: '#',
      limits: '',
      features: '[]',
      sortOrder: items.length,
    })
    setForm({
      name: '',
      description: '',
      monthlyPrice: 0,
      annualPrice: 0,
      isCustom: false,
      popular: false,
      cta: 'Start free trial',
      href: '#',
      limits: '',
      features: JSON.stringify([]),
      sortOrder: items.length,
    })
  }

  const handleEdit = (item: PricingTier) => {
    setEditing(item)
    setForm({ ...item })
  }

  const handleSave = async () => {
    if (!editing) return
    const payload = {
      ...form,
      features: typeof form.features === 'string' ? form.features : JSON.stringify(form.features ?? []),
    }
    const url = editing.id ? `/api/admin/pricing-tiers/${editing.id}` : '/api/admin/pricing-tiers'
    const method = editing.id ? 'PUT' : 'POST'
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    if (res.ok) {
      setEditing(null)
      fetchItems()
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this pricing tier?')) return
    const res = await fetch(`/api/admin/pricing-tiers/${id}`, { method: 'DELETE' })
    if (res.ok) fetchItems()
  }

  if (loading) return <p className="text-slate-600">Loading...</p>

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-slate-900">Pricing Tiers</h1>
        <button
          onClick={handleCreate}
          className="px-4 py-2 rounded-lg bg-slate-900 text-white text-sm font-medium hover:bg-slate-800"
        >
          Add Tier
        </button>
      </div>

      {editing && (
        <div className="mb-6 p-6 bg-white rounded-xl border border-slate-200">
          <h2 className="font-medium text-slate-900 mb-4">{editing.id ? 'Edit' : 'New'} Tier</h2>
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
            <input
              placeholder="Name"
              value={form.name ?? ''}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="px-3 py-2 rounded-lg border border-slate-200"
            />
            <input
              placeholder="Description"
              value={form.description ?? ''}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="px-3 py-2 rounded-lg border border-slate-200"
            />
            <input
              type="number"
              placeholder="Monthly price"
              value={form.monthlyPrice ?? ''}
              onChange={(e) => setForm({ ...form, monthlyPrice: e.target.value ? parseInt(e.target.value) : null })}
              className="px-3 py-2 rounded-lg border border-slate-200"
            />
            <input
              type="number"
              placeholder="Annual price"
              value={form.annualPrice ?? ''}
              onChange={(e) => setForm({ ...form, annualPrice: e.target.value ? parseInt(e.target.value) : null })}
              className="px-3 py-2 rounded-lg border border-slate-200"
            />
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={form.isCustom ?? false}
                onChange={(e) => setForm({ ...form, isCustom: e.target.checked })}
              />
              Custom pricing
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={form.popular ?? false}
                onChange={(e) => setForm({ ...form, popular: e.target.checked })}
              />
              Popular
            </label>
            <input
              placeholder="CTA"
              value={form.cta ?? ''}
              onChange={(e) => setForm({ ...form, cta: e.target.value })}
              className="px-3 py-2 rounded-lg border border-slate-200"
            />
            <input
              placeholder="Limits"
              value={form.limits ?? ''}
              onChange={(e) => setForm({ ...form, limits: e.target.value })}
              className="px-3 py-2 rounded-lg border border-slate-200"
            />
            <textarea
              placeholder='Features (JSON array, e.g. ["Feature 1","Feature 2"])'
              value={form.features ?? '[]'}
              onChange={(e) => setForm({ ...form, features: e.target.value })}
              rows={4}
              className="px-3 py-2 rounded-lg border border-slate-200 md:col-span-2"
            />
          </div>
          <div className="flex gap-2 mt-4">
            <button onClick={handleSave} className="px-4 py-2 rounded-lg bg-slate-900 text-white text-sm">
              Save
            </button>
            <button onClick={() => setEditing(null)} className="px-4 py-2 rounded-lg border border-slate-200 text-sm">
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="text-left px-4 py-3 text-sm font-medium text-slate-700">Name</th>
              <th className="text-left px-4 py-3 text-sm font-medium text-slate-700">Price</th>
              <th className="text-left px-4 py-3 text-sm font-medium text-slate-700">Popular</th>
              <th className="w-24 px-4 py-3 text-sm font-medium text-slate-700"></th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="border-b border-slate-100">
                <td className="px-4 py-3 text-slate-900">{item.name}</td>
                <td className="px-4 py-3 text-slate-600">
                  {item.isCustom ? 'Custom' : `$${item.monthlyPrice}/mo`}
                </td>
                <td className="px-4 py-3 text-slate-600">{item.popular ? 'Yes' : '-'}</td>
                <td className="px-4 py-3">
                  <button onClick={() => handleEdit(item)} className="text-accent-blue text-sm mr-2">Edit</button>
                  <button onClick={() => handleDelete(item.id)} className="text-red-600 text-sm">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
