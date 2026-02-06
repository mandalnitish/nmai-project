import axios from "axios";

/* =====================================================
   BASE URL (ENV + PROD SAFE)
   ===================================================== */

/**
 * LOCAL  → http://localhost:5000/api
 * PROD   → https://nmai-project.onrender.com/api
 *
 * IMPORTANT:
 * - NEVER use relative URLs in production
 * - This works for Vercel, GitHub Pages, Netlify
 */
const API_BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://nmai-project.onrender.com/api"
    : "http://localhost:5000/api";

/* =====================================================
   AXIOS INSTANCE
   ===================================================== */
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

/* =====================================================
   REQUEST INTERCEPTOR (AUTH TOKEN)
   ===================================================== */
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/* =====================================================
   RESPONSE INTERCEPTOR (401 SAFE REDIRECT)
   ===================================================== */
api.interceptors.response.use(
  (response) => response.data, // 🔥 ALWAYS RETURN DATA ONLY
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");

      // SPA safe redirect
      if (process.env.NODE_ENV === "production") {
        window.location.href = "/login";
      } else {
        window.location.href = "/login";
      }
    }

    return Promise.reject(
      error.response?.data || { message: error.message }
    );
  }
);

/* =====================================================
   PARAM CLEANER (VERY IMPORTANT)
   ===================================================== */
const cleanParams = (params = {}) => {
  const cleaned = {};
  Object.entries(params).forEach(([key, value]) => {
    if (value !== "" && value !== null && value !== undefined) {
      cleaned[key] = value;
    }
  });
  return cleaned;
};

/* =====================================================
   AUTH API
   ===================================================== */
export const authAPI = {
  register: (data) => api.post("/auth/register", data),
  login: (data) => api.post("/auth/login", data),
  getMe: () => api.get("/auth/me"),
  updateProfile: (data) => api.put("/auth/update-profile", data),
  changePassword: (data) => api.put("/auth/change-password", data),
};

/* =====================================================
   ARTICLES API (✔ MATCHES BACKEND RESPONSE)
   ===================================================== */
export const articlesAPI = {
  getAll: (params = {}) =>
    api.get("/articles", { params: cleanParams(params) }),
  // returns: { success, articles, pagination }

  getLatest: (limit = 10) =>
    api.get("/articles/latest", { params: { limit } }),

  getTrending: (limit = 5) =>
    api.get("/articles/trending", { params: { limit } }),

  getBySlug: (slug) => api.get(`/articles/${slug}`),

  like: (id) => api.post(`/articles/${id}/like`),

  create: (data) => api.post("/articles", data),
  update: (id, data) => api.put(`/articles/${id}`, data),
  delete: (id) => api.delete(`/articles/${id}`),
};

/* =====================================================
   MCQs API
   ===================================================== */
export const mcqsAPI = {
  getAll: (params = {}) =>
    api.get("/mcqs", { params: cleanParams(params) }),

  getDailyQuiz: (params = {}) =>
    api.get("/mcqs/daily-quiz", { params: cleanParams(params) }),

  submit: (payload) => api.post("/mcqs/submit", payload),
};

/* =====================================================
   USERS API
   ===================================================== */
export const usersAPI = {
  getProfile: () => api.get("/users/profile"),
  updateProfile: (data) => api.put("/users/profile", data),

  saveArticle: (id) => api.post(`/users/save-article/${id}`),
  unsaveArticle: (id) => api.delete(`/users/save-article/${id}`),

  getSavedArticles: () => api.get("/users/saved-articles"),
};

/* =====================================================
   ADMIN API
   ===================================================== */
export const adminAPI = {
  getDashboardStats: () => api.get("/admin/dashboard-stats"),

  getUsers: (params = {}) =>
    api.get("/admin/users", { params: cleanParams(params) }),

  updateUser: (id, data) =>
    api.put(`/admin/users/${id}`, data),

  deleteUser: (id) =>
    api.delete(`/admin/users/${id}`),
};

/* =====================================================
   DEFAULT EXPORT
   ===================================================== */
export default api;
