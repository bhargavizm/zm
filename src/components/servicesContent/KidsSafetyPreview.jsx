'use client'

import { useEffect, useState } from 'react'

export default function KidsSafetyPreview() {
  const [data, setData] = useState(null)

  useEffect(() => {
    const saved = localStorage.getItem('kidFormData')
    if (saved) {
      setData(JSON.parse(saved))
    }
  }, [])

  if (!data) return <p className="text-center mt-10">Loading...</p>

  return (
    <div className="max-w-xl mx-auto p-4 space-y-4 bg-white shadow rounded mt-10">
      <h2 className="text-xl font-bold text-center">Preview: Kid Safety Info</h2>

      {data.image && <img src={`/uploads/${data.image}`} alt="Child Profile" className="w-32 h-32 object-cover rounded-full mx-auto" />}
      <p><strong>Child Name:</strong> {data.childName}</p>
      <p><strong>Date of Birth:</strong> {data.dob}</p>
      <p><strong>Grade:</strong> {data.grade}</p>
      <p><strong>School:</strong> {data.schoolName}</p>
      <p><strong>School Address:</strong> {data.schoolAddress}</p>
      <p><strong>Parent Name:</strong> {data.parentName}</p>
      <p><strong>Contact:</strong> {data.contactNumber}</p>
      <p><strong>Alternate Contact:</strong> {data.alternateNumber}</p>
      <p><strong>Home Address:</strong> {data.homeAddress}</p>
      <p><strong>Map Link:</strong> <a href={data.mapLink} target="_blank" className="text-blue-600 underline">{data.mapLink}</a></p>
    </div>
  )
}
