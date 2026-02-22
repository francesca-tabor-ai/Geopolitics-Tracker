'use client'

import { useEffect, useState } from 'react'

type Submission = {
  id: string
  requestType: string
  name: string
  email: string
  message: string
  createdAt: string
}

export default function AdminContactPage() {
  const [items, setItems] = useState<Submission[]>([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState<Submission | null>(null)

  const fetchItems = async () => {
    const res = await fetch('/api/admin/contact-submissions')
    const data = await res.json()
    if (res.ok) setItems(data)
    setLoading(false)
  }

  useEffect(() => {
    fetchItems()
  }, [])

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this submission?')) return
    const res = await fetch(`/api/admin/contact-submissions/${id}`, { method: 'DELETE' })
    if (res.ok) {
      setSelected(null)
      fetchItems()
    }
  }

  if (loading) return <p className="text-slate-600">Loading...</p>

  return (
    <div>
      <h1 className="text-2xl font-semibold text-slate-900 mb-6">Contact Submissions</h1>

      <div className="flex gap-6">
        <div className="flex-1 bg-white rounded-xl border border-slate-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="text-left px-4 py-3 text-sm font-medium text-slate-700">Date</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-slate-700">Type</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-slate-700">Name</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-slate-700">Email</th>
                <th className="w-20 px-4 py-3 text-sm font-medium text-slate-700"></th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr
                  key={item.id}
                  className={`border-b border-slate-100 cursor-pointer ${selected?.id === item.id ? 'bg-slate-50' : ''}`}
                  onClick={() => setSelected(item)}
                >
                  <td className="px-4 py-3 text-slate-600 text-sm">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 text-slate-600">{item.requestType}</td>
                  <td className="px-4 py-3 text-slate-900">{item.name}</td>
                  <td className="px-4 py-3 text-slate-600">{item.email}</td>
                  <td className="px-4 py-3">
                    <button
                      onClick={(e) => { e.stopPropagation(); handleDelete(item.id) }}
                      className="text-red-600 text-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {selected && (
          <div className="w-96 bg-white rounded-xl border border-slate-200 p-6">
            <h3 className="font-medium text-slate-900 mb-4">Submission details</h3>
            <dl className="space-y-2 text-sm">
              <div>
                <dt className="text-slate-500">Type</dt>
                <dd className="text-slate-900">{selected.requestType}</dd>
              </div>
              <div>
                <dt className="text-slate-500">Name</dt>
                <dd className="text-slate-900">{selected.name}</dd>
              </div>
              <div>
                <dt className="text-slate-500">Email</dt>
                <dd className="text-slate-900">{selected.email}</dd>
              </div>
              <div>
                <dt className="text-slate-500">Date</dt>
                <dd className="text-slate-900">{new Date(selected.createdAt).toLocaleString()}</dd>
              </div>
              <div>
                <dt className="text-slate-500">Message</dt>
                <dd className="text-slate-900 mt-2 whitespace-pre-wrap">{selected.message}</dd>
              </div>
            </dl>
          </div>
        )}
      </div>
    </div>
  )
}
