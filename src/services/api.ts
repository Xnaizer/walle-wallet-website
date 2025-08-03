import axios from "axios";

// Create axios instance with default config
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000/api",
  //   timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Get token from localStorage or wherever you store it
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle common errors
    if (error.response?.status === 401) {
      // Unauthorized - redirect to login or refresh token
      localStorage.removeItem("token");
      window.location.href = "/login";
    }

    if (error.response?.status === 403) {
      // Forbidden
      console.error("Access forbidden");
    }

    if (error.response?.status >= 500) {
      // Server error
      console.error("Server error:", error.response.data);
    }

    return Promise.reject(error);
  }
);

export default api;
