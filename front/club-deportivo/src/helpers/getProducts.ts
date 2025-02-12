import { IProducts, ProductState } from "@/interface/IProducts";
import axios from "axios";

// Asegurar que use la URL de producción si está disponible
const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

interface IProductData {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  img: string;
  productStatus: string;
}

export const getProducts = async (filters: { 
  search: string; 
  category: string;
  minPrice: number; 
  maxPrice: number; 
  page: number; 
  limit?: number; 
}): Promise<{ products: IProducts[], totalPages: number }> => {
  try {
    // Log para verificar la URL de la API
    console.log("API URL being used:", API_URL);

    const response = await axios.get(`${API_URL}/product`, {
      params: {
        page: filters.page,
        limit: filters.limit ?? 10,  // Prioriza la paginación
        name: filters.search || undefined,
        category: filters.category !== "Todos" ? filters.category : undefined,
        minPrice: filters.minPrice || undefined,
        maxPrice: filters.maxPrice || undefined,
      },
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      }
    });

    // Mapear productos a la interfaz esperada
    const products: IProducts[] = response.data.products.map((productData: IProductData) => ({
      id: productData.id,
      name: productData.name,
      description: productData.description,
      price: productData.price,
      stock: productData.stock,
      image: productData.img || '',
      State: productData.productStatus === "available" ? ProductState.Disponible : ProductState.SinStock
    }));

    return {
      products,
      totalPages: response.data.totalPages || 1
    };

  } catch (error) {
    console.error("Error fetching products:", {
      url: API_URL,
      error: error,
      envVars: {
        NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
        nodeEnv: process.env.NODE_ENV
      }
    });

    return { products: [], totalPages: 1 };
  }
};
