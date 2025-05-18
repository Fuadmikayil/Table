
// components/StudentForm.jsx
'use client'

import { useState, useEffect } from 'react'
import supabase from '@/lib/supabase'

export default function StudentForm({ initialData = null, onDone }) {
  const isEdit = !!initialData
  const [fullName, setFullName] = useState('')

  useEffect(() => {
    if (initialData) {
      setFullName(initialData.full_name)
    }
  }, [initialData])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const payload = { full_name: fullName }

    const { error } = isEdit
      ? await supabase.from('students').update(payload).eq('id', initialData.id)
      : await supabase.from('students').insert(payload)

    if (error) return alert('Hata: ' + error.message)

    setFullName('')
    onDone()
  }

  return (
    <form onSubmit={handleSubmit} className="flex space-x-2">
      <input
        type="text"
        placeholder="Ad Soyad"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        required
        className="border px-2 py-1 rounded"
      />
      <button
        type="submit"
        className={`px-4 py-1 rounded text-white ${
          isEdit ? 'bg-blue-600 hover:bg-blue-700' : 'bg-green-600 hover:bg-green-700'
        }`}
      >
        {isEdit ? 'Güncelle' : 'Ekle'}
      </button>
    </form>
  )
}