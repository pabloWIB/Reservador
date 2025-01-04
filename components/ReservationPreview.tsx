'use client'

import { useRef } from 'react'
import Image from 'next/image'
import html2canvas from 'html2canvas'

export default function ReservationPreview({ formData, onBackToForm }) {
  const reservationCardRef = useRef(null)

  const saveAsImage = () => {
    if (reservationCardRef.current) {
      const scale = 2;
      const width = 1000; // Ancho fijo para PC y móvil
      html2canvas(reservationCardRef.current, { 
        backgroundColor: null, 
        scale: scale,
        width: width,
        windowWidth: width,
        logging: false,
        useCORS: true
      }).then(canvas => {
        const link = document.createElement('a')
        link.download = `reserva-${formData.clientName ? formData.clientName.replace(/\s+/g, '-') : 'unnamed'}.jpg`
        link.href = canvas.toDataURL('image/jpeg', 0.9)
        link.click()
      }).catch(error => {
        console.error('Error generating image:', error)
        alert('Hubo un error al generar la imagen. Por favor, inténtelo de nuevo.')
      })
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleString('es-CO', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const calculateNights = () => {
    const checkIn = new Date(formData.checkIn)
    const checkOut = new Date(formData.checkOut)
    return Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24))
  }

  return (
    <div className="preview-container max-w-3xl mx-auto">
      <div ref={reservationCardRef} className="bg-purple-900 rounded-lg overflow-hidden text-white relative">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10">
          <Image
            src="/placeholder.svg?height=900&width=1600"
            alt="Glamping"
            layout="fill"
            objectFit="cover"
          />
        </div>

        <div className="relative p-8 space-y-6">
          <div className="flex items-center space-x-4">
            <Image
              src="/placeholder.svg?height=64&width=64"
              alt="Logo"
              width={64}
              height={64}
              className="rounded-full"
            />
            <div>
              <h2 className="text-2xl font-bold">Reserva del Ruiz</h2>
              <p className="text-purple-200">El Glamping de un millón de estrellas</p>
            </div>
          </div>

          <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm space-y-4">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-purple-200">Cliente</p>
                <p className="font-semibold">{formData.clientName}</p>
              </div>
              <div>
                <p className="text-purple-200">Teléfono</p>
                <p className="font-semibold">{formData.phone}</p>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-purple-200">Plan Seleccionado</p>
              <p className="font-semibold">{formData.planType.split('|')[0]}</p>
              <p className="text-sm text-purple-200">Valor por noche: ${(parseInt(formData.planType.split('|')[1]) || 0).toLocaleString()}</p>
              <p className="text-sm text-purple-200">Noches: {calculateNights()}</p>
              <p className="text-sm text-purple-200">Valor total del plan: ${((parseInt(formData.planType.split('|')[1]) || 0) * calculateNights()).toLocaleString()}</p>
            </div>

            {formData.additional && (
              <div className="mb-4">
                <p className="text-purple-200">Servicios Adicionales</p>
                <p className="font-semibold">{formData.additional}</p>
                <p className="text-sm text-purple-200">Valor adicionales: ${(formData.additionalCost || 0).toLocaleString()}</p>
              </div>
            )}

            <div className="mb-4">
              <p className="text-purple-200">Estado del Pago</p>
              <p className="font-semibold">Total a pagar: ${(formData.totalAmount || 0).toLocaleString()}</p>
              <p className="font-semibold">Pagado: ${(formData.paidAmount || 0).toLocaleString()}</p>
              <p className="font-semibold">Pendiente: ${(formData.remainingBalance || 0).toLocaleString()}</p>
            </div>

            <div className="mb-4">
              <p className="text-purple-200">Fecha y Hora de Estancia</p>
              <p className="font-semibold">
                Check-in: {formatDate(formData.checkIn)}
              </p>
              <p className="font-semibold">
                Check-out: {formatDate(formData.checkOut)}
              </p>
            </div>

            {formData.datos && (
              <div className="mt-4">
                <p className="text-purple-200">Información de los Huéspedes</p>
                <pre className="font-normal whitespace-pre-wrap break-words">{formData.datos}</pre>
              </div>
            )}

            {formData.notes && (
              <div className="mt-4">
                <p className="text-purple-200">Notas</p>
                <p className="font-normal">{formData.notes}</p>
              </div>
            )}

          </div>

          <div className="text-center pt-4 space-y-2">
            <p className="text-xl italic">¡Gracias por elegirnos!</p>
            <p className="text-sm text-purple-200">Reserva del Ruiz - El Glamping de un millón de estrellas</p>
            <p className="text-sm text-purple-200">
              Contacto:<br />
              WhatsApp: +57 3152779642<br />
              Instagram: @reservadelruiz
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-4 justify-center">
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

