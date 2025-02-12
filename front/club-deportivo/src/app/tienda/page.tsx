/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useState } from "react";
import { useAdmin } from "@/context/AdminContext";
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
  const { products, getAllProducts, totalPages, currentPage } = useAdmin();
  const [loading, setLoading] = useState(false);

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
      try {
        const { products, totalPages } = await getProducts(filters);
        getAllProducts(products);
        setFilters((prev) => ({ ...prev, totalPages }));
      } catch (error) {
        console.error("Error fetching products:", error);
      }
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

  const generatePageNumbers = () => {
    const pageNumbers = [];
    
    for (let i = 1; i <= Math.min(3, totalPages); i++) {
      pageNumbers.push(i);
    }

    if (totalPages > 3 && currentPage > 3) {
      pageNumbers.push(-1);
    }

    if (totalPages > 3) {
      const startPage = Math.max(4, currentPage - 1);
      const endPage = Math.min(totalPages, currentPage + 1);

      for (let i = startPage; i <= endPage; i++) {
        if (!pageNumbers.includes(i)) {
          pageNumbers.push(i);
        }
      }
    }

    if (totalPages > 3 && !pageNumbers.includes(totalPages)) {
      if (currentPage < totalPages - 2) {
        pageNumbers.push(-1);
      }
      pageNumbers.push(totalPages);
    }

    return pageNumbers;
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
              <p className="text-center col-span-full text-gray-400">
                No se encontraron productos
              </p>
            )}
          </div>
        )}
      </div>

      {/* 🔹 Paginación */}
      <div className="flex justify-center items-center space-x-2 mt-8 bg-black py-4">
        <button 
          onClick={() => handlePageChange(filters.page - 1)}
          disabled={filters.page === 1}
          className="px-3 py-1 bg-gray-800 text-gray-400 rounded disabled:opacity-50"
        >
          &lt;
        </button>

        {generatePageNumbers().map((pageNum) => (
          pageNum === -1 ? (
            <span key="ellipsis" className="px-3 py-1 text-gray-400">...</span>
          ) : (
            <button
              key={pageNum}
              onClick={() => handlePageChange(pageNum)}
              className={`px-4 py-2 rounded ${
                pageNum === filters.page 
                  ? "bg-blue-600 text-white" 
                  : "bg-gray-800 text-gray-400 hover:bg-gray-700"
              }`}
            >
              {pageNum}
            </button>
          )
        ))}

        <button 
          onClick={() => handlePageChange(filters.page + 1)}
          disabled={filters.page >= totalPages}
          className="px-3 py-1 bg-gray-800 text-gray-400 rounded disabled:opacity-50"
        >
          &gt;
        </button>
      </div>
    </div>
  );
}

