import axios from "axios";

/* ================= BASE URL ================= */
const API_URL =
  process.env.REACT_APP_API_URL || "http://localhost:5000/api";

/* ================= AXIOS INSTANCE ================= */
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

/* ================= REQUEST INTERCEPTOR ================= */
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

/* ================= RESPONSE INTERCEPTOR ================= */
/**
 * IMPORTANT:
 * All API calls return `response.data`
 */
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(
      error.response?.data || { message: error.message }
    );
  }
);

/* ================= PARAM CLEANER ================= */
const cleanParams = (params = {}) => {
  const cleaned = {};
  Object.entries(params).forEach(([key, value]) => {
    if (value !== "" && value !== null && value !== undefined) {
      cleaned[key] = value;
    }
  });
  return cleaned;
};

/* ================= AUTH API ================= */
export const authAPI = {
  register: (data) => api.post("/auth/register", data),
  login: (data) => api.post("/auth/login", data),
  getMe: () => api.get("/auth/me"),
  updateProfile: (data) => api.put("/auth/update-profile", data),
  changePassword: (data) => api.put("/auth/change-password", data),
  forgotPassword: (data) => api.post("/auth/forgot-password", data),
  resetPassword: (token, data) =>
    api.post(`/auth/reset-password/${token}`, data),
};

/* ================= ARTICLES API ================= */
export const articlesAPI = {
  /** PAGE-BASED (SEO, URL pagination) */
  getAll: (params = {}) =>
    api.get("/articles", { params: cleanParams(params) }),

  /** CURSOR-BASED (FAST, BIG DATA) */
  getByCursor: ({ cursor, limit = 9, ...filters }) =>
    api.get("/articles", {
      params: cleanParams({
        cursor,
        limit,
        ...filters,
      }),
    }),

  /** SINGLE ARTICLE */
  getBySlug: (slug) => api.get(`/articles/${slug}`),

  /** HOME PAGE */
  getLatest: (limit = 10) =>
    api.get("/articles/latest", { params: { limit } }),

  getTrending: (limit = 5) =>
    api.get("/articles/trending", { params: { limit } }),

  /** CRUD */
  create: (data) => api.post("/articles", data),
  update: (id, data) => api.put(`/articles/${id}`, data),
  delete: (id) => api.delete(`/articles/${id}`),

  /** INTERACTIONS */
  like: (id) => api.post(`/articles/${id}/like`),
};

/* ================= MCQS API ================= */
export const mcqsAPI = {
  getAll: (params = {}) =>
    api.get("/mcqs", { params: cleanParams(params) }),

  getDailyQuiz: (params = {}) =>
    api.get("/mcqs/daily-quiz", { params: cleanParams(params) }),

  submit: (payload) => api.post("/mcqs/submit", payload),

  getCategories: () => api.get("/mcqs/categories"),
  getStats: () => api.get("/mcqs/stats"),

  create: (data) => api.post("/mcqs", data),
  update: (id, data) => api.put(`/mcqs/${id}`, data),
  delete: (id) => api.delete(`/mcqs/${id}`),
};

/* ================= USERS API ================= */
export const usersAPI = {
  saveArticle: (articleId) =>
    api.post(`/users/save-article/${articleId}`),

  unsaveArticle: (articleId) =>
    api.delete(`/users/save-article/${articleId}`),

  getSavedArticles: () => api.get("/users/saved-articles"),

  getQuizHistory: () => api.get("/users/quiz-history"),

  getProfile: () => api.get("/users/profile"),
  updateProfile: (data) => api.put("/users/profile", data),

  getActivity: (params = {}) =>
    api.get("/users/activity", { params: cleanParams(params) }),
};

/* ================= NEWSLETTER API ================= */
export const newsletterAPI = {
  subscribe: (data) => api.post("/newsletter/subscribe", data),
  unsubscribe: (data) => api.post("/newsletter/unsubscribe", data),
  getStatus: (email) => api.get(`/newsletter/status/${email}`),
};

/* ================= ADMIN API ================= */
export const adminAPI = {
  getDashboardStats: () => api.get("/admin/dashboard-stats"),

  getUsers: (params = {}) =>
    api.get("/admin/users", { params: cleanParams(params) }),
  getUser: (id) => api.get(`/admin/users/${id}`),
  updateUser: (id, data) => api.put(`/admin/users/${id}`, data),
  deleteUser: (id) => api.delete(`/admin/users/${id}`),

  getArticles: (params = {}) =>
    api.get("/admin/articles", { params: cleanParams(params) }),

  updateArticleStatus: (id, status) =>
    api.put(`/admin/articles/${id}/status`, { status }),

  getMcqs: (params = {}) =>
    api.get("/admin/mcqs", { params: cleanParams(params) }),

  getAnalytics: (params = {}) =>
    api.get("/admin/analytics", { params: cleanParams(params) }),
};

/* ================= COMMON API ================= */
export const commonAPI = {
  getFeaturedContent: () => api.get("/common/featured"),
  getSiteStats: () => api.get("/common/stats"),
  getExamCategories: () => api.get("/common/exams"),
  getRecentUpdates: () => api.get("/common/recent-updates"),
  contact: (data) => api.post("/common/contact", data),
};

/* ================= EXPORT DEFAULT ================= */
export default api;
