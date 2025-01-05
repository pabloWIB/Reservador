'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

export default function ReservationForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    clientName: '',
    phone: '',
    planType: '',
    planPrice: 0,
    checkIn: '',
    checkOut: '',
    additionalBeds: 0,
    datos: '',
    additional: '',
    additionalCost: 0,
    totalAmount: 0,
    paidAmount: 0,
    remainingBalance: 0,
  })

  const [imagePreview, setImagePreview] = useState(null)

  useEffect(() => {
    updateTotals()
  }, [formData.planType, formData.additionalCost, formData.paidAmount])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => setImagePreview(e.target.result)
      reader.readAsDataURL(file)
    }
  }

  const updateTotals = () => {
    const planPrice = parseInt(formData.planType.split('|')[1]) || 0
    const additionalCost = parseInt(formData.additionalCost) || 0
    const paidAmount = parseInt(formData.paidAmount) || 0

    const totalAmount = planPrice + additionalCost
    const remainingBalance = totalAmount - paidAmount

    setFormData(prevState => ({
      ...prevState,
      totalAmount,
      remainingBalance
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <div className="form-container active max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-purple-900">Nueva Reserva</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Form fields go here, similar to the original HTML but using React state */}
        {/* Example: */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Nombre del Cliente</label>
            <input
              type="text"
              name="clientName"
              value={formData.clientName}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            />
          </div>
          {/* Add other form fields similarly */}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Comprobante de Pago</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
          />
          {imagePreview && (
            <div className="mt-2">
              <Image src={imagePreview} alt="Vista previa del comprobante" width={200} height={200} className="rounded-lg shadow-sm" />
            </div>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
        >
          Generar Reserva
        </button>
      </form>
    </div>
  )
}

