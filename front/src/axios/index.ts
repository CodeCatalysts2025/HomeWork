import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3001",
  headers: {
    "Content-Type": "application/json",
  },
});

export const userApi = {
  createUser: async (user: { username: string }) => {
    const response = await api.post("/user", { user });
    return response.data;
  },

  getUsers: async () => {
    const response = await api.get("/user");
    return response.data;
  },

  getUserById: async (id: string) => {
    const response = await api.get(`/user/${id}`);
    return response.data;
  },
};
