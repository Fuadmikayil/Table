'use client'

import { useState } from 'react'
import { Edit3, Trash2 } from 'lucide-react'
import supabase from '@/lib/supabase'
import StudentForm from './StudentForm'

export default function AdminStudent({ student, onDeleted, onEdited }) {
  const [editing, setEditing] = useState(false)

  const handleDelete = async () => {
    const confirmDelete = confirm('Öğrenciyi silmek istediğine emin misin?')
    if (!confirmDelete) return

    const { error } = await supabase
      .from('students')
      .delete()
      .eq('id', student.id)

    if (error) {
      alert('Silme hatası: ' + error.message)
    } else {
      onDeleted(student.id)
    }
  }

  return (
    <div className="flex items-center space-x-4 p-4 bg-white rounded shadow">
      {editing ? (
        <StudentForm
          initialData={student}
          onDone={() => {
            setEditing(false)
            onEdited()
          }}
        />
      ) : (
        <>
          <span className="flex-1">{student.full_name}</span>
          <button onClick={() => setEditing(true)} className="p-2 hover:bg-gray-100 rounded">
            <Edit3 size={16} />
          </button>
          <button onClick={handleDelete} className="p-2 hover:bg-gray-100 rounded">
            <Trash2 size={16} />
          </button>
        </>
      )}
    </div>
  )
}
