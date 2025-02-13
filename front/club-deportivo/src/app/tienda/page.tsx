"use client";

import { useEffect, useState } from "react";
import { getProducts } from "@/helpers/getProducts";
import { IProducts } from "@/interface/IProducts";
import Card from "@/components/Card/Card";
import ProductFilter from "@/components/Filters/FilterStore"; 

interface Filters {
  search: string;
  category: string;
  minPrice: number;
  maxPrice: number;
  page: number;
  limit: number;
}

export default function Tienda() {
  const [products, setProducts] = useState<IProducts[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState<string | null>(null); 

  const [filters, setFilters] = useState<Filters>({
    search: "",
    category: "Todos",
    minPrice: 0,
    maxPrice: 1000,
    page: 1,
    limit: 8, 
  });

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null); 

      try {
        console.log("Filtros actuales:", filters); 

        const { products, totalPages } = await getProducts(filters);

        
        console.log("Respuesta del backend:", { products, totalPages });

        setProducts(products); 
        setTotalPages(totalPages);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError('Hubo un error al obtener los productos'); 
      } finally {
        setLoading(false); 
      }
    };

    fetchProducts();
  }, [filters]); 

  const handleFilter = (newFilters: Filters) => {
    setFilters({ ...newFilters, page: 1 }); 
  };

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setFilters((prevFilters) => ({ ...prevFilters, page: newPage }));
    }
  };

  return (
    <div className="bg-black text-white">
      {/* Agregar el componente de filtro aquí */}
      <ProductFilter onFilter={handleFilter} /> 

      {/* 🔹 Mensaje de error */}
      {error && (
        <div className="text-center text-red-500 py-4">
          <p>{error}</p>
        </div>
      )}

      {/* 🔹 Productos */}
      <div className="bg-black w-full max-w-7xl mx-auto h-full">
        {loading ? (
          <p className="text-center text-gray-400">Cargando productos...</p>
        ) : (
          <div className="grid items-center gap-8 md:grid-cols-3 lg:grid-cols-4 overflow-hidden">
            {products.length > 0 ? (
              products.map((product) => <Card key={product.id} product={product} />)
            ) : (
              <p className="text-center col-span-full text-gray-400">No se encontraron productos</p>
            )}
          </div>
        )}
      </div>

      {/* 🔹 Paginación */}
      <div className="flex justify-center my-6">
        <button 
          disabled={filters.page === 1} 
          onClick={() => handlePageChange(filters.page - 1)} 
          className="px-4 py-2 mx-2 bg-gray-700 rounded disabled:opacity-50"
        >
          Anterior
        </button>
        <span className="px-4 py-2 text-lg">
          {filters.page} / {totalPages}
        </span>
        <button 
          disabled={filters.page >= totalPages} 
          onClick={() => handlePageChange(filters.page + 1)} 
          className="px-4 py-2 mx-2 bg-gray-700 rounded disabled:opacity-50"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}
