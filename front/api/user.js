import { api } from "./api";

export const UserAPI = {
  getAllUsers: async () => {
    const users = await api.get("/users");
    console.log({ response: users });
    return users;
  },
  login: async (email, password) => {
    const response = await api.post("/login", { email, password });
    localStorage.setItem("token", response.token);
    api.defaults.headers["Authorization"] = `Bearer ${response.token}`;
  },

  logout: () => {
    localStorage.removeItem("token");
    api.defaults.headers["Authorization"] = `Bearer undefined`;
  },
  getUser: async () => {
    return api.get("/user").then((user) => {
      return user;
    });
  },
};
