import { api } from "./api";

export const UserAPI = {
  getAllUsers: async () => {
    const response = await api.get("/users");
    console.log({ response: response.data });
    return response.data;
  },

  login: async (email, password) => {
    const response = await api.post("/login", { email, password });
    localStorage.setItem("token", response.data.token);
    api.defaults.headers["Authorization"] = `Bearer ${response.data.token}`;
  },

  logout: () => {
    localStorage.removeItem("token");
    api.defaults.headers["Authorization"] = `Bearer undefined`;
  },
  getUser: async () => {
    return api.get("/user").then((response) => {
      return response.data;
    });
  },
};
