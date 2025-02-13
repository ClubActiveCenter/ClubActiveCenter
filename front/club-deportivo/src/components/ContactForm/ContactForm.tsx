"use client";
import { useState } from "react";

interface FormProps {
  onSubmit: (formData: { name: string; phone: string; email: string; message: string }) => void;
}

export default function ContactForm(props: FormProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    props.onSubmit(formData); 
  };

  return (
    <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg w-full max-w-md mx-auto">
      <h2 className="text-lg font-bold text-center mb-4">Déjanos tu mensaje</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Nombre"
          required
          className="p-3 w-full rounded bg-gray-700 text-white border border-gray-600 text-left focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
        />
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Teléfono"
          required
          className="p-3 w-full rounded bg-gray-700 text-white border border-gray-600 text-left focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Correo electrónico"
          required
          className="p-3 w-full rounded bg-gray-700 text-white border border-gray-600 text-left focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
        />
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Escribe tu mensaje..."
          required
          className="p-3 w-full rounded bg-gray-700 text-white border border-gray-600 text-left h-32 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
        ></textarea>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-500 transition"
        >
          Enviar
        </button>
      </form>
    </div>
  );
}
