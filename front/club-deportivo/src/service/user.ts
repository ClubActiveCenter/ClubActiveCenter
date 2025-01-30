import axios from "axios";
import { IUser } from "../interface/IUser";

const BACK_URL = process.env.BACK_URL || "http://localhost:3001";

// Función para obtener el usuario por ID
export const getUserById = async (userId: string): Promise<IUser | null> => {
  const token = localStorage.getItem("token");

  if (!token) {
    // Si no hay token, retornamos null y mostramos un mensaje adecuado
    console.error("No token found, user might not be logged in.");
    return null;
  }

  try {
    const headers = { Authorization: `Bearer ${token}` };
    const response = await axios.get<IUser>(`${BACK_URL}/user/${userId}`, {
      headers,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error("Error fetching user data:", error.response.data);
    } else {
      console.error("Unexpected error:", error);
    }
    return null;
  }
};
