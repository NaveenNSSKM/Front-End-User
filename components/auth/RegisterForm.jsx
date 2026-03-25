'use client';

import { useState, useContext, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import AuthContext from '@/context/AuthContext';
import { UserPlus } from 'lucide-react';
import AuthCard from '@/components/ui/AuthCard';
import FormGroup from '@/components/ui/FormGroup';
import ErrorMessage from '@/components/ui/ErrorMessage';

const RegisterForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, user } = useContext(AuthContext);
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

    const res = await register(name, email, password);
    if (!res.success) {
      setError(res.error);
      setIsSubmitting(false);
    }
  };

  return (
    <AuthCard
      icon={<UserPlus size={32} color="#6366f1" />}
      title="Create an Account"
      subtitle="Join us to access your personalized dashboard"
    >
      <ErrorMessage message={error} />

      <form onSubmit={handleSubmit}>
        <FormGroup label="Full Name" htmlFor="register-name">
          <input
            type="text"
            id="register-name"
            className="form-input"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </FormGroup>
        <FormGroup label="Email Address" htmlFor="register-email">
          <input
            type="email"
            id="register-email"
            className="form-input"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </FormGroup>
        <FormGroup label="Password" htmlFor="register-password">
          <input
            type="password"
            id="register-password"
            className="form-input"
            placeholder="Create a password (min 6 chars)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength="6"
          />
        </FormGroup>
        <button type="submit" className="btn" disabled={isSubmitting}>
          {isSubmitting ? 'Creating account...' : 'Create Account'}
        </button>
      </form>

      <p className="auth-link">
        Already have an account? <Link href="/login">Sign in</Link>
      </p>
    </AuthCard>
  );
};

export default RegisterForm;
