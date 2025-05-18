'use client'

import { useState } from 'react'
import supabase from '@/lib/supabase'

// All score options as strings (TEXT column type)
const scoreOptions = ['q/b', ...Array.from({ length: 10 }, (_, i) => (i + 1).toString())]

export default function ScoreCell({ studentId, date, allScores, refreshScores }) {
  const existing = allScores?.find(
    (s) => s.student_id === studentId && s.recorded_at === date
  )

  const [score, setScore] = useState(existing?.score ?? '')
  const [editing, setEditing] = useState(false)

  const handleSave = async () => {
    const payload = {
      student_id: studentId,
      recorded_at: date,
      score,
    }

    const { error } = await supabase
      .from('student_scores')
      .upsert(payload, { onConflict: ['student_id', 'recorded_at'] })

    if (!error) {
      setEditing(false)
      if (typeof refreshScores === 'function') {
        refreshScores()
      }
    } else {
      alert('Error saving score: ' + error.message)
    }
  }

  return (
    <td className="border p-2 text-center">
      {editing ? (
        <div className="flex items-center space-x-1 justify-center">
          <select
            value={score}
            onChange={(e) => setScore(e.target.value)}
            className="border px-1 py-0.5 rounded"
          >
            <option value="">Select</option>
            {scoreOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          <button onClick={handleSave} className="text-green-600">✔</button>
          <button onClick={() => setEditing(false)} className="text-red-600">✖</button>
        </div>
      ) : (
        <span onClick={() => setEditing(true)} className="cursor-pointer">
          {score !== '' ? score : '—'}
        </span>
      )}
    </td>
  )
}
