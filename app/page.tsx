'use client'

import { useState } from 'react'
import ReservationForm from '../components/ReservationForm'
import ReservationPreview from '../components/ReservationPreview'

export default function Home() {
  const [showPreview, setShowPreview] = useState(false)
  const [formData, setFormData] = useState({
    clientName: '',
    phone: '',
    planType: '',
    planPrice: 0,
    checkIn: '',
    checkOut: '',
    datos: '',
    additional: '',
    additionalCost: 0,
    totalAmount: 0,
    paidAmount: 0,
    remainingBalance: 0,
    notes: '',
  })

  const handleSubmit = (data) => {
    setFormData(data)
    setShowPreview(true)
  }

  const handleBackToForm = () => {
    setShowPreview(false)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-12">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 mt-8 text-center text-purple-900">
        Sistema de Reservas - Glamping
      </h1>
      <div className="w-full max-w-2xl">
        {!showPreview ? (
          <ReservationForm onSubmit={handleSubmit} initialData={formData} />
        ) : (
          <ReservationPreview formData={formData} onBackToForm={handleBackToForm} />
        )}
      </div>
    </div>
  )
}

