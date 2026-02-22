'use client'

import { useEffect, useState } from 'react'

type User = {
  id: string
  email: string
  name: string | null
  role: string
  createdAt: string
}

export default function AdminUsersPage() {
  const [items, setItems] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<User | null>(null)
  const [form, setForm] = useState<Partial<User>>({})

  const fetchItems = async () => {
    const res = await fetch('/api/admin/users')
    const data = await res.json()
    if (res.ok) setItems(data)
    setLoading(false)
  }

  useEffect(() => {
    fetchItems()
  }, [])

  const handleEdit = (item: User) => {
    setEditing(item)
    setForm({ name: item.name, role: item.role })
  }

  const handleSave = async () => {
    if (!editing) return
    const res = await fetch(`/api/admin/users/${editing.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    if (res.ok) {
      setEditing(null)
      fetchItems()
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this user?')) return
    const res = await fetch(`/api/admin/users/${id}`, { method: 'DELETE' })
    const data = await res.json()
    if (!res.ok) {
      alert(data.error ?? 'Failed')
      return
    }
    setEditing(null)
    fetchItems()
  }

  if (loading) return <p className="text-slate-600">Loading...</p>

  return (
    <div>
      <h1 className="text-2xl font-semibold text-slate-900 mb-6">Users</h1>

      {editing && (
        <div className="mb-6 p-6 bg-white rounded-xl border border-slate-200">
          <h2 className="font-medium text-slate-900 mb-4">Edit User</h2>
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
            <div>
              <label className="block text-sm text-slate-600 mb-1">Email</label>
              <p className="text-slate-900">{editing.email}</p>
            </div>
            <input
              placeholder="Name"
              value={form.name ?? ''}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="px-3 py-2 rounded-lg border border-slate-200"
            />
            <div>
              <label className="block text-sm text-slate-600 mb-1">Role</label>
              <select
                value={form.role ?? 'USER'}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
                className="px-3 py-2 rounded-lg border border-slate-200"
              >
                <option value="USER">User</option>
                <option value="ADMIN">Admin</option>
              </select>
            </div>
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
              <th className="text-left px-4 py-3 text-sm font-medium text-slate-700">Email</th>
              <th className="text-left px-4 py-3 text-sm font-medium text-slate-700">Name</th>
              <th className="text-left px-4 py-3 text-sm font-medium text-slate-700">Role</th>
              <th className="text-left px-4 py-3 text-sm font-medium text-slate-700">Created</th>
              <th className="w-24 px-4 py-3 text-sm font-medium text-slate-700"></th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="border-b border-slate-100">
                <td className="px-4 py-3 text-slate-900">{item.email}</td>
                <td className="px-4 py-3 text-slate-600">{item.name ?? '-'}</td>
                <td className="px-4 py-3 text-slate-600">{item.role}</td>
                <td className="px-4 py-3 text-slate-600 text-sm">
                  {new Date(item.createdAt).toLocaleDateString()}
                </td>
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
