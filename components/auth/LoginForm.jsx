'use client';

import { useState, useContext, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import AuthContext from '@/context/AuthContext';
import { LogIn } from 'lucide-react';
import AuthCard from '@/components/ui/AuthCard';
import FormGroup from '@/components/ui/FormGroup';
import ErrorMessage from '@/components/ui/ErrorMessage';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login, user } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.replace('/dashboard');
    }
  }, [user, router]);

  if (user) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    const res = await login(email, password);
    if (!res.success) {
      setError(res.error);
      setIsSubmitting(false);
    }
  };

  return (
    <AuthCard
      icon={<LogIn size={32} color="#6366f1" />}
      title="Welcome Back"
      subtitle="Sign in to access your personalized dashboard"
    >
      <ErrorMessage message={error} />

      <form onSubmit={handleSubmit}>
        <FormGroup label="Email Address" htmlFor="login-email">
          <input
            type="email"
            id="login-email"
            className="form-input"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </FormGroup>
        <FormGroup label="Password" htmlFor="login-password">
          <input
            type="password"
            id="login-password"
            className="form-input"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </FormGroup>
        <button type="submit" className="btn" disabled={isSubmitting}>
          {isSubmitting ? 'Signing in...' : 'Sign In'}
        </button>
      </form>

      <p className="auth-link">
        Don&apos;t have an account? <Link href="/register">Sign up</Link>
      </p>
    </AuthCard>
  );
};

export default LoginForm;
