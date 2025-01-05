'use client'

import { useState, useEffect } from 'react'

export default function ReservationForm({ onSubmit, initialData }) {
  const [formData, setFormData] = useState(initialData)

  useEffect(() => {
    updateTotals()
  }, [formData.planType, formData.additionalCost, formData.paidAmount, formData.checkIn, formData.checkOut])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prevState => ({
      ...prevState,
      [name]: name === 'additionalCost' || name === 'paidAmount' ? (value === '' ? '' : Number(value)) : value
    }))
  }

  const updateTotals = () => {
    const planPrice = parseInt(formData.planType.split('|')[1]) || 0
    const additionalCost = parseInt(formData.additionalCost) || 0
    const paidAmount = parseInt(formData.paidAmount) || 0

    const checkIn = new Date(formData.checkIn)
    const checkOut = new Date(formData.checkOut)
    const nights = Math.max(1, Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24)))

    const totalAmount = (planPrice * nights) + additionalCost
    const remainingBalance = totalAmount - paidAmount

    setFormData(prevState => ({
      ...prevState,
      totalAmount: isNaN(totalAmount) ? 0 : totalAmount,
      remainingBalance: isNaN(remainingBalance) ? 0 : remainingBalance
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const requiredFields = ['clientName', 'phone', 'planType', 'checkIn', 'checkOut']
    const isValid = requiredFields.every(field => {
      if (!formData[field]) {
        alert(`Por favor complete el campo ${field}`)
        return false
      }
      return true
    })

    if (!isValid) return

    onSubmit(formData)
  }

  return (
    <div className="form-container active max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-purple-900">Nueva Reserva</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Nombre del Cliente</label>
            <input
              type="text"
              name="clientName"
              value={formData.clientName}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 text-gray-900 bg-white"
              placeholder="Ingrese el nombre del cliente"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Teléfono</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 text-gray-900 bg-white"
              placeholder="Ingrese el teléfono"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Tipo de Plan</label>
          <select
            name="planType"
            value={formData.planType}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 text-gray-900 bg-white"
          >
            <option value="">Seleccione un plan</option>
            <option value="Plan pareja semana|320000">Plan pareja semana - $320.000</option>
            <option value="Plan pareja fin de semana|380000">Plan pareja fin de semana - $380.000</option>
            <option value="Plan pareja pasadía|250000">Plan pareja pasadía - $250.000</option>
            <option value="Plan familiar 4 Personas|450000">Plan familiar 4 Personas - $450.000</option>
            <option value="Plan individual|250000">Plan individual - $250.000</option>
            <option value="Plan familiar pasadía 4 personas|350000">Plan familiar pasadía 4 personas - $350.000</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Fecha y Hora de Entrada</label>
            <input
              type="datetime-local"
              name="checkIn"
              value={formData.checkIn}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 text-gray-900 bg-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Fecha y Hora de Salida</label>
            <input
              type="datetime-local"
              name="checkOut"
              value={formData.checkOut}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 text-gray-900 bg-white"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Datos</label>
          <textarea
            name="datos"
            value={formData.datos}
            onChange={handleChange}
            rows={6}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 text-gray-900 bg-white"
            placeholder="Ingrese los datos de los huéspedes aquí..."
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Adicionales</label>
          <textarea
            name="additional"
            value={formData.additional}
            onChange={handleChange}
            rows={2}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 text-gray-900 bg-white"
            placeholder="Ingrese servicios adicionales..."
          ></textarea>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Notas</label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows={2}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 text-gray-900 bg-white"
            placeholder="Ingrese notas adicionales..."
          ></textarea>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Valor Adicionales</label>
            <input
              type="number"
              name="additionalCost"
              value={formData.additionalCost || ''}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 text-gray-900 bg-white"
              placeholder="Ingrese el valor adicional"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Total a Pagar</label>
            <input
              type="number"
              name="totalAmount"
              value={formData.totalAmount || ''}
              readOnly
              className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50 shadow-sm text-gray-900 bg-white"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Valor Pagado</label>
            <input
              type="number"
              name="paidAmount"
              value={formData.paidAmount || ''}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 text-gray-900 bg-white"
              placeholder="Ingrese el valor pagado"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Saldo Pendiente</label>
            <input
              type="number"
              name="remainingBalance"
              value={formData.remainingBalance || ''}
              readOnly
              className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50 shadow-sm text-gray-900 bg-white"
            />
          </div>
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

