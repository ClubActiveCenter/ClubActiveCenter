import { useState } from "react";

interface FilterValues {
  search: string;
  category: string;
  stock: string;
  minPrice: string;
  maxPrice: string;
}

interface Filters {
  search: string;
  category: string;
  minPrice: number;
  maxPrice: number;
  page: number;
  limit: number;
}

const categories = [
  "Todos", "Tenis", "Fútbol", "Ciclismo", "Gimnasio", "Movilidad", "Boxeo",
  "Running", "Baloncesto", "Ping Pong", "Accesorios", "Yoga", "Pádel", "Ropa",
  "Rugby", "Voleibol", "Natación", "Suplementos", "Ropa Deportiva", "Skate",
  "Vóley", "Squash", "Bádminton"
];

export default function ProductFilter({ onFilter }: { onFilter: (filters: Filters) => void }) {
  const [filters, setFilters] = useState<FilterValues>({
    search: "",
    category: "Todos",
    stock: "",
    minPrice: "",
    maxPrice: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const updatedFilters = { ...filters, [name]: value };
    setFilters(updatedFilters);

    onFilter({
      ...updatedFilters,
      minPrice: Number(updatedFilters.minPrice) || 0, 
      maxPrice: Number(updatedFilters.maxPrice) || 1000, 
      page: 1, 
      limit: 8, 
    });
  };

  return (
    <div className="flex flex-wrap justify-center items-center gap-4 p-4 bg-gray-800 text-white rounded-lg shadow-md w-full">
      {/* Buscar por nombre */}
      <input
        type="text"
        name="search"
        value={filters.search}
        onChange={handleChange}
        placeholder="Buscar producto..."
        className="p-2 w-48 rounded bg-gray-700 text-white border border-gray-600 text-center"
      />

      {/* Categoría */}
      <select
        name="category"
        value={filters.category}
        onChange={handleChange}
        className="p-2 w-40 rounded bg-gray-700 text-white border border-gray-600"
      >
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      {/* Precio mínimo */}
      <input
        type="number"
        name="minPrice"
        value={filters.minPrice}
        onChange={handleChange}
        placeholder="Min $"
        className="p-2 w-32 rounded bg-gray-700 text-white border border-gray-600 text-center"
      />

      {/* Precio máximo */}
      <input
        type="number"
        name="maxPrice"
        value={filters.maxPrice}
        onChange={handleChange}
        placeholder="Max $"
        className="p-2 w-32 rounded bg-gray-700 text-white border border-gray-600 text-center"
      />
    </div>
  );
}