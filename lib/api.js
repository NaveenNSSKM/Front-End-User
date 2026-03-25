import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// ── Axios instance ─────────────────────────────────────────
const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

// Auto-attach Bearer token from sessionStorage on every request
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = sessionStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// ── Auth APIs ──────────────────────────────────────────────

/**
 * POST /api/auth/register
 * @param {{ name: string, email: string, password: string }} data
 * @returns {{ token, name, email, role }}
 */
export const registerAPI = (data) => api.post('/auth/register', data);

/**
 * POST /api/auth/login
 * @param {{ email: string, password: string }} data
 * @returns {{ token, name, email, role }}
 */
export const loginAPI = (data) => api.post('/auth/login', data);

/**
 * GET /api/auth/me  (Protected)
 * @returns {{ data: { name, email, role } }}
 */
export const getMeAPI = () => api.get('/auth/me');

// ── Post APIs ──────────────────────────────────────────────

/**
 * GET /api/posts  (Protected)
 * Returns only the logged-in user's posts
 * @returns {{ data: Post[] }}
 */
export const getPostsAPI = () => api.get('/posts');

/**
 * POST /api/posts  (Protected)
 * @param {{ title: string, description: string, content: string }} data
 * @returns {{ data: Post }}
 */
export const createPostAPI = (data) => api.post('/posts', data);

export default api;
