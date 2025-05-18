
// components/ScoreTable.jsx
'use client'
import { useState } from 'react'
import ScoreCell from './ScoreCell'
import AddScorePanel from './AddScorePanel'

export default function ScoreTable({ students, allScores, refreshScores }) {
  const [dates, setDates] = useState(() => {
    const unique = [...new Set(allScores.map(s => s.recorded_at))]
    return unique.sort()
  })

  const handleNewDate = (newDate) => {
    if (!dates.includes(newDate)) {
      setDates(prev => [...prev, newDate].sort())
    }
  }

  return (
    <div className="space-y-6">
      <AddScorePanel onNewDate={handleNewDate} />

      <table className="w-full table-auto border text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2 text-left">Full Name</th>
            {dates.map(date => (
              <th key={date} className="border p-2 text-center">
                {new Date(date).toLocaleDateString()}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <tr key={student.id}>
              <td className="border p-2">{student.full_name}</td>
              {dates.map(date => (
                <ScoreCell
                  key={`${student.id}-${date}`}
                  studentId={student.id}
                  date={date}
                  allScores={allScores}
                  refreshScores={refreshScores}
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}