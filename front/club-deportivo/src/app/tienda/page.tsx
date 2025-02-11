"use client";

import { useEffect, useState } from "react";
import { getProducts } from "@/helpers/getProducts";
import { IProducts } from "@/interface/IProducts";
import Card from "@/components/Card/Card";
import ProductFilter from "@/components/Filter/FilterProduct";

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
      const { products, totalPages } = await getProducts(filters);
      setProducts(products);
      setTotalPages(totalPages);
      setLoading(false);
    };

    fetchProducts();
  }, [filters]);

  const handleFilter = (newFilters: Filters) => {
    setFilters({ ...filters, ...newFilters, page: 1 });
  };

  const handlePageChange = (newPage: number) => {
    setFilters((prevFilters) => ({ ...prevFilters, page: newPage }));
  };

  return (
    <div className="bg-black text-white">
      <header className="text-center py-8">
        <h1 className="text-3xl md:text-[3rem] font-sans font-bold drop-shadow-lg">
          Tienda de Productos
        </h1>
        <p className="text-gray-400 mt-4 text-xl">
          Encuentra los mejores productos aquí. ¡Compra ahora!
        </p>
      </header>

      {/* 🔹 Filtros */}
      <div className="w-full flex justify-center p-4">
        <ProductFilter onFilter={handleFilter} />
      </div>

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
        <span className="px-4 py-2 text-lg">{filters.page} / {totalPages}</span>
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

