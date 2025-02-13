'use client';

import { useState } from 'react';
import axios from 'axios';
import Map from '@/components/Map';
import ContactForm from '@/components/ContactForm/ContactForm';

export default function ContactPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const BACK_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

  const handleFormSubmit = async (formData: { name: string; phone: string; email: string; message: string }) => {
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await axios.post(`${BACK_URL}/sendGrid/contacForm`, formData, {
        headers: { "Content-Type": "application/json" },
      });

      console.log('Respuesta del servidor:', response.data);
      setSuccessMessage("¡Formulario enviado con éxito!");
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.error('Error al enviar formulario:', error.response);
        setError(error.response.data.message || "Hubo un error al enviar el formulario.");
      } else {
        console.error('Error de red o desconocido:', error);
        setError("Hubo un error al enviar el formulario. Intenta nuevamente.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header Section */}
      <div className="bg-black text-white py-16 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contáctanos</h1>
          <p className="text-xl max-w-2xl mx-auto mb-8">
            Estamos aquí para responder tus preguntas y ayudarte a comenzar tu viaje fitness
          </p>
        </div>
      </div>

      {/* Contact Form Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="space-y-8 text-center">
          <h2 className="text-3xl font-semibold text-white"></h2>
          <ContactForm onSubmit={handleFormSubmit} />
          {isLoading && <p className="text-white">Enviando...</p>}
          {error && <p className="text-red-500">{error}</p>}
          {successMessage && <p className="text-green-500">{successMessage}</p>}
        </div>
      </div>

      {/* Footer - Contact Information Section */}
      <div className="bg-gray-800 py-12 mt-16">
        <div className="container mx-auto text-center text-white space-y-4">
          <h3 className="text-2xl font-semibold"></h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <h4 className="text-xl font-semibold mb-2">Dirección</h4>
              <p>Av. Principal #123</p>
              <p>Ciudad de México, CDMX</p>
            </div>

            <div>
              <h4 className="text-xl font-semibold mb-2">Teléfono</h4>
              <p>+52 (55) 1234-5678</p>
            </div>

            <div>
              <h4 className="text-xl font-semibold mb-2">Email</h4>
              <p>info@clubactivecenter.com</p>
            </div>

            <div>
              <h4 className="text-xl font-semibold mb-2">Horario</h4>
              <p>Lunes a Viernes: 6:00 AM - 10:00 PM</p>
              <p>Sábados y Domingos: 8:00 AM - 8:00 PM</p>
            </div>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-semibold mb-6 text-white">Ubicación</h2>
        <div className="h-[500px] rounded-lg overflow-hidden">
          <Map
            center={{ lat: 19.4326, lng: -99.1332 }}
            zoom={15}
            markers={[{
              lat: 19.4326,
              lng: -99.1332,
              title: "Club Active Center"
            }]}/>
        </div>
      </div>
    </div>
  );
}
