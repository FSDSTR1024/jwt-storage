import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

api.interceptors.response.use(
  (response) => {
    // Devuelve la respuesta si todo está correcto
    return response.data;
  },
  (error) => {
    if (error.response) {
      // Maneja errores específicos de la API
      console.error("Error de API:", error.response.data.message);
    } else if (error.request) {
      // Maneja errores de red
      console.error("Error de red:", error.message);
    } else {
      console.error("Error desconocido:", error.message);
    }
    return Promise.reject(error); // Propaga el error si es necesario
  }
);

api.interceptors.request.use();
