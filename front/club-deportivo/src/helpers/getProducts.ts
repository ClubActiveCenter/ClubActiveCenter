import { IProducts, ProductState } from "@/interface/IProducts";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
// aaasssssdddddd 

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
    const response = await axios.get(`${API_URL}/product`, {
      params: {
        page: filters.page,
        limit: filters.limit ?? 8, 
        name: filters.search || undefined, 
        category: filters.category !== "Todos" ? filters.category : undefined, 
        minPrice: filters.minPrice || undefined, 
        maxPrice: filters.maxPrice || undefined 
      }
    });

    const products: IProducts[] = response.data.products.map((productData: IProductData) => ({
      id: productData.id,
      name: productData.name,
      description: productData.description,
      price: productData.price,
      stock: productData.stock,
      image: productData.img || '', 
      State: productData.productStatus === 'available' ? ProductState.Disponible : ProductState.SinStock
    }));

    return {
      products,
      totalPages: response.data.totalPages || 1 
    };

  } catch (error) {
    console.error("Error fetching products:", error);
    return { products: [], totalPages: 1 }; 
  }
};