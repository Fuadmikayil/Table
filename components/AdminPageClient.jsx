
// components/AdminPageClient.jsx
'use client'

import { useState } from 'react'
import StudentForm from './StudentForm'
import AdminStudent from './AdminStudent'
import ScoreTable from './ScoreTable'
import supabase from '@/lib/supabase'

export default function AdminPageClient({ initialStudents, initialScores }) {
  const [students, setStudents] = useState(initialStudents)
  const [scores, setScores] = useState(initialScores)

  const refreshStudents = async () => {
    const { data } = await supabase.from('students').select('*').order('full_name')
    if (data) setStudents(data)
  }

  const refreshScores = async () => {
    const { data } = await supabase.from('student_scores').select('*')
    if (data) setScores(data)
  }

  const handleLocalDelete = (id) => {
    setStudents((prev) => prev.filter((s) => s.id !== id))
  }

  return (
    <main className="container mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Tələbə</h1>
      <StudentForm onDone={refreshStudents} />
      <div className="space-y-4">
        {students.map((student) => (
          <AdminStudent
            key={student.id}
            student={student}
            onDeleted={handleLocalDelete}
            onEdited={refreshStudents}
          />
        ))}
      </div>

      <h2 className="text-xl font-semibold pt-10">Yoxlama Cədvəli</h2>
      <ScoreTable students={students} allScores={scores} refreshScores={refreshScores} />
    </main>
  )
}