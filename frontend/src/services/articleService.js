import axios from "axios";

/* ================= API BASE URL ================= */
// CRA requires REACT_APP_ prefix
const API_URL = process.env.REACT_APP_API_URL;

/* ================= AXIOS INSTANCE ================= */
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

/* ================= ARTICLE SERVICES ================= */

/**
 * Get all articles
 * GET /api/articles
 */
export const getAllArticles = async (params = {}) => {
  const response = await api.get("/api/articles", { params });
  return response.data;
};

/**
 * Get single article by slug
 * GET /api/articles/:slug
 */
export const getArticleBySlug = async (slug) => {
  const response = await api.get(`/api/articles/${slug}`);
  return response.data;
};

/**
 * Get articles by category
 * GET /api/articles?category=Economy
 */
export const getArticlesByCategory = async (category) => {
  const response = await api.get("/api/articles", {
    params: { category },
  });
  return response.data;
};

/**
 * Search articles
 * GET /api/articles?search=query
 */
export const searchArticles = async (query) => {
  const response = await api.get("/api/articles", {
    params: { search: query },
  });
  return response.data;
};

/**
 * Pagination support
 * GET /api/articles?page=1&limit=10
 */
export const getPaginatedArticles = async (page = 1, limit = 10) => {
  const response = await api.get("/api/articles", {
    params: { page, limit },
  });
  return response.data;
};

/* ================= EXPORT AXIOS INSTANCE ================= */
export default api;
