import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3000"; // Backend URL

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Adicionar um interceptor para incluir o token de autenticação (se houver)
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken"); // Assumindo que o token é armazenado no localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Funções de Autenticação
export const authService = {
  register: (userData: any) => api.post("/api/auth/register", userData),
  login: (credentials: any) => api.post("/api/auth/login", credentials),
  // outras rotas de auth se necessário
};

// Funções de Usuário (Admin)
export const userService = {
  getUsers: () => api.get("/api/users"),
  getUserById: (id: string) => api.get(`/api/users/${id}`),
  updateUser: (id: string, userData: any) => api.put(`/api/users/${id}`, userData),
  deleteUser: (id: string) => api.delete(`/api/users/${id}`),
};

// Funções de Pedidos
export const orderService = {
  createOrder: (orderData: any) => api.post("/api/orders", orderData),
  getOrders: () => api.get("/api/orders"),
  getOrderById: (id: string) => api.get(`/api/orders/${id}`),
  updateOrderStatus: (id: string, status: string) =>
    api.patch(`/api/orders/${id}/status`, { status }),
  assignOrderResponsible: (id: string, responsible: string) =>
    api.patch(`/api/orders/${id}/responsible`, { responsible }),
  // outras rotas de orders
};

export default api;
