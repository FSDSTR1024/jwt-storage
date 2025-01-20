# Clase: Creación de un API Wrapper con Axios

## Objetivos

1. Comprender qué es un API Wrapper y por qué utilizarlo.
2. Aprender a configurar Axios para crear una instancia personalizada.
3. Implementar un Authorization Token desde el `localStorage`.
4. Manejar errores y solicitudes con interceptores.

---

## 1. ¿Qué es un API Wrapper?

- Un **API Wrapper** es una capa de abstracción que encapsula las llamadas a una API, proporcionando:
  - Reutilización de código.
  - Centralización de la lógica de solicitudes.
  - Simplificación del manejo de errores.
- Beneficios:
  - Fácil mantenimiento.
  - Mejora la legibilidad del código.

---

## 2. Instalación y configuración básica de Axios

1. Instala Axios en tu proyecto:

   ```bash
   npm install axios
   ```

2. Importa Axios:
   ```js
   import axios from "axios";
   ```

## 3. Crear una instancia personalizada de Axios

La instancia permite configurar parámetros predeterminados para todas las solicitudes.

Ejemplo:

```js
import axios from "axios";

const api = axios.create({
  baseURL: "https://api.example.com",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
```

## 4. Añadir el Authorization Token desde el localStorage

El Authorization Token se obtiene del localStorage y se agrega al encabezado de la solicitud.

```js
import axios from "axios";

const api = axios.create({
  baseURL: "https://api.example.com",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});
```

## 5. Manejar errores y solicitudes con interceptores

```js
api.interceptors.response.use(
  (response) => {
    // Devuelve la respuesta si todo está correcto
    return response;
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
```

## 6. Ejemplo de uso

```js
import api from "./api";

export const getUsers = async () => {
  try {
    const response = await api.get("/users");
    return response.data;
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    throw error;
  }
};

export const createUser = async (userData) => {
  try {
    const response = await api.post("/users", userData);
    return response.data;
  } catch (error) {
    console.error("Error al crear usuario:", error);
    throw error;
  }
};
```
