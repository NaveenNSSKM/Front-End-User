'use client';

import { createContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { loginAPI, registerAPI, getMeAPI } from '@/lib/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // ── On mount: verify token with server ──────────────────
  useEffect(() => {
    const checkUserLoggedIn = async () => {
      const token = sessionStorage.getItem('token');

      // Optimistically set user from sessionStorage for instant UI
      if (token && sessionStorage.getItem('name')) {
        setUser({
          name: sessionStorage.getItem('name'),
          email: sessionStorage.getItem('email'),
          role: sessionStorage.getItem('role'),
        });
      }

      if (token) {
        try {
          // GET /api/auth/me — verify token is still valid
          const res = await getMeAPI();
          const freshUser = res.data.data;
          setUser(freshUser);
          sessionStorage.setItem('name', freshUser.name);
          sessionStorage.setItem('email', freshUser.email);
          sessionStorage.setItem('role', freshUser.role || 'user');
        } catch {
          // Token expired or invalid — clear session
          sessionStorage.clear();
          setUser(null);
        }
      }

      setLoading(false);
    };

    checkUserLoggedIn();
  }, []);

  // ── POST /api/auth/login ─────────────────────────────────
  const login = async (email, password) => {
    try {
      const res = await loginAPI({ email, password });
      const { token, name, email: userEmail, role } = res.data;

      sessionStorage.setItem('token', token);
      sessionStorage.setItem('name', name);
      sessionStorage.setItem('email', userEmail);
      sessionStorage.setItem('role', role || 'user');

      setUser(res.data);
      router.push('/dashboard');
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || 'Login failed. Please try again.',
      };
    }
  };

  // ── POST /api/auth/register ──────────────────────────────
  const register = async (name, email, password) => {
    try {
      const res = await registerAPI({ name, email, password });
      const { token, email: userEmail, role } = res.data;

      sessionStorage.setItem('token', token);
      sessionStorage.setItem('name', name);
      sessionStorage.setItem('email', userEmail);
      sessionStorage.setItem('role', role || 'user');

      setUser(res.data);
      router.push('/dashboard');
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || 'Registration failed. Please try again.',
      };
    }
  };

  // ── Logout ───────────────────────────────────────────────
  const logout = () => {
    sessionStorage.clear();
    setUser(null);
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
