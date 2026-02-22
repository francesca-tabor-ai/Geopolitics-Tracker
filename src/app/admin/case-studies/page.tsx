'use client'

import { useEffect, useState } from 'react'

type CaseStudy = {
  id: string
  company: string
  industry: string
  headline: string
  result: string
  excerpt: string
  sortOrder: number
}

export default function AdminCaseStudiesPage() {
  const [items, setItems] = useState<CaseStudy[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<CaseStudy | null>(null)
  const [form, setForm] = useState<Partial<CaseStudy>>({})

  const fetchItems = async () => {
    const res = await fetch('/api/admin/case-studies')
    const data = await res.json()
    if (res.ok) setItems(data)
    setLoading(false)
  }

  useEffect(() => {
    fetchItems()
  }, [])

  const handleCreate = () => {
    setEditing({ id: '', company: '', industry: '', headline: '', result: '', excerpt: '', sortOrder: items.length })
    setForm({ company: '', industry: '', headline: '', result: '', excerpt: '', sortOrder: items.length })
  }

  const handleEdit = (item: CaseStudy) => {
    setSaveError('')
    setEditing(item)
    setForm(item)
  }

  const [saveError, setSaveError] = useState('')

  const handleSave = async () => {
    if (!editing) return
    setSaveError('')
    const url = editing.id ? `/api/admin/case-studies/${editing.id}` : '/api/admin/case-studies'
    const method = editing.id ? 'PUT' : 'POST'
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    const data = await res.json()
    if (res.ok) {
      setEditing(null)
      fetchItems()
    } else {
      setSaveError(data.error ?? 'Failed to save')
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this case study?')) return
    const res = await fetch(`/api/admin/case-studies/${id}`, { method: 'DELETE' })
    if (res.ok) fetchItems()
  }

  if (loading) return <p className="text-slate-600">Loading...</p>

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-slate-900">Case Studies</h1>
        <button
          onClick={handleCreate}
          className="px-4 py-2 rounded-lg bg-slate-900 text-white text-sm font-medium hover:bg-slate-800"
        >
          Add Case Study
        </button>
      </div>

      {editing && (
        <div className="mb-6 p-6 bg-white rounded-xl border border-slate-200">
          <h2 className="font-medium text-slate-900 mb-4">{editing.id ? 'Edit' : 'New'} Case Study</h2>
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
            <input
              placeholder="Company"
              value={form.company ?? ''}
              onChange={(e) => setForm({ ...form, company: e.target.value })}
              className="px-3 py-2 rounded-lg border border-slate-200"
            />
            <input
              placeholder="Industry"
              value={form.industry ?? ''}
              onChange={(e) => setForm({ ...form, industry: e.target.value })}
              className="px-3 py-2 rounded-lg border border-slate-200"
            />
            <input
              placeholder="Headline"
              value={form.headline ?? ''}
              onChange={(e) => setForm({ ...form, headline: e.target.value })}
              className="px-3 py-2 rounded-lg border border-slate-200 md:col-span-2"
            />
            <input
              placeholder="Result"
              value={form.result ?? ''}
              onChange={(e) => setForm({ ...form, result: e.target.value })}
              className="px-3 py-2 rounded-lg border border-slate-200 md:col-span-2"
            />
            <textarea
              placeholder="Excerpt"
              value={form.excerpt ?? ''}
              onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
              rows={3}
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
              <th className="text-left px-4 py-3 text-sm font-medium text-slate-700">Company</th>
              <th className="text-left px-4 py-3 text-sm font-medium text-slate-700">Industry</th>
              <th className="text-left px-4 py-3 text-sm font-medium text-slate-700">Headline</th>
              <th className="w-24 px-4 py-3 text-sm font-medium text-slate-700"></th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="border-b border-slate-100">
                <td className="px-4 py-3 text-slate-900">{item.company}</td>
                <td className="px-4 py-3 text-slate-600">{item.industry}</td>
                <td className="px-4 py-3 text-slate-600 max-w-xs truncate">{item.headline}</td>
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
