'use client'

import { useRef } from 'react'
import Image from 'next/image'
import html2canvas from 'html2canvas'

export default function ReservationPreview({ formData, onBackToForm }) {
  const reservationCardRef = useRef(null)

  const saveAsImage = () => {
    if (reservationCardRef.current) {
      html2canvas(reservationCardRef.current, { backgroundColor: null, scale: 2 }).then(canvas => {
        const link = document.createElement('a')
        link.download = `reserva-${formData.clientName.replace(/\s+/g, '-')}.jpg`
        link.href = canvas.toDataURL('image/jpeg', 0.9)
        link.click()
      })
    }
  }

  return (
    <div className="preview-container max-w-3xl mx-auto">
      <div ref={reservationCardRef} className="bg-purple-900 rounded-lg overflow-hidden text-white relative">
        {/* Reservation card content goes here, similar to the original HTML */}
        {/* Example: */}
        <div className="relative p-8 space-y-6">
          <div className="flex items-center space-x-4">
            <Image src="/IMG/logo.jpg" alt="Logo" width={64} height={64} className="rounded-full" />
            <div>
              <h2 className="text-2xl font-bold">Reserva del Ruiz</h2>
              <p className="text-purple-200">El Glamping de un millón de estrellas</p>
            </div>
          </div>
          {/* Add more reservation details here */}
        </div>
      </div>

      <div className="mt-6 flex space-x-4 justify-center">
        <button
          onClick={onBackToForm}
          className="bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
        >
          Volver al Formulario
        </button>
        <button
          onClick={saveAsImage}
          className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        >
          Guardar Reserva
        </button>
      </div>
    </div>
  )
}

