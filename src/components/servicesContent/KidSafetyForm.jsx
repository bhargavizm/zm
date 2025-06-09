'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function KidSafetyForm() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    childName: '',
    dob: '',
    image: null,
    grade: '',
    schoolName: '',
    schoolAddress: '',
    parentName: '',
    contactNumber: '',
    alternateNumber: '',
    homeAddress: '',
    mapLink: '',
    password: ''
  })

  const handleChange = (e) => {
    const { name, value, files } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const previewData = { ...formData, image: formData.image?.name || '' }
    localStorage.setItem('kidFormData', JSON.stringify(previewData))
    router.push('/kidsSafetyPre')

  }

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-4 space-y-4 bg-white shadow rounded mt-10">
      <h2 className="text-xl font-bold text-center">QR Code Generator for Kids Safety</h2>

      <input name="childName" placeholder="Child Name" onChange={handleChange} className="w-full p-2 border rounded" />
      <input name="dob" type="date" onChange={handleChange}  className="w-full p-2 border rounded" />
      <input name="image" type="file" accept="image/*" onChange={handleChange} className="w-full p-2 border rounded" />
      <input name="grade" placeholder="Grade / Class of Child" onChange={handleChange} className="w-full p-2 border rounded" />
      <input name="schoolName" placeholder="School Name" onChange={handleChange} className="w-full p-2 border rounded" />
      <input name="schoolAddress" placeholder="School Address" onChange={handleChange} className="w-full p-2 border rounded" />
      <input name="parentName" placeholder="Parent Name" onChange={handleChange} className="w-full p-2 border rounded" />
      <input name="contactNumber" placeholder="Contact Number" onChange={handleChange} className="w-full p-2 border rounded" />
      <input name="alternateNumber" placeholder="Alternate Contact Number" onChange={handleChange} className="w-full p-2 border rounded" />
      <input name="homeAddress" placeholder="Home Address" onChange={handleChange} className="w-full p-2 border rounded" />
      <input name="mapLink" placeholder="Home Map Link (Optional)" onChange={handleChange} className="w-full p-2 border rounded" />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} className="w-full p-2 border rounded" />

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded w-full">Submit</button>
    </form>
  )
}
