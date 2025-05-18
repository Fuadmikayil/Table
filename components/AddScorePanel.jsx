'use client'

import { useState } from 'react'

export default function AddScorePanel({ onNewDate }) {
  const [show, setShow] = useState(false)
  const [date, setDate] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!date) return alert('Tarih seçin')
    onNewDate(date)
    setShow(false)
    setDate('')
  }

  return (
    <div>
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded"
        onClick={() => setShow(prev => !prev)}
      >
        Add Score
      </button>

      {show && (
        <form onSubmit={handleSubmit} className="mt-4 flex space-x-2 items-center">
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border px-2 py-1 rounded"
          />
          <button type="submit" className="bg-green-600 text-white px-3 py-1 rounded">
            Submit
          </button>
          <button
            type="button"
            onClick={() => setShow(false)}
            className="px-3 py-1 rounded border"
          >
            Cancel
          </button>
        </form>
      )}
    </div>
  )
}
