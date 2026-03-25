'use client';

import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/navigation';
import AuthContext from '@/context/AuthContext';
import { getPostsAPI } from '@/lib/api';
import Navbar from '@/components/dashboard/Navbar';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import EntryForm from '@/components/dashboard/EntryForm';
import PostList from '@/components/dashboard/PostList';

export default function DashboardPage() {
  const { user, loading } = useContext(AuthContext);
  const router = useRouter();

  const [posts, setPosts] = useState([]);
  const [postsLoading, setPostsLoading] = useState(false);
  const [postsError, setPostsError] = useState('');

  // ── Auth guard ───────────────────────────────────────────
  useEffect(() => {
    if (!loading && !user) {
      router.replace('/login');
    }
  }, [user, loading, router]);

  // ── GET /api/posts — fetch user's posts ──────────────────
  useEffect(() => {
    if (user) {
      fetchPosts();
    }
  }, [user]);

  const fetchPosts = async () => {
    setPostsLoading(true);
    setPostsError('');
    try {
      const res = await getPostsAPI();
      setPosts(res.data.data);
    } catch (error) {
      setPostsError(error.response?.data?.error || 'Failed to load entries.');
    } finally {
      setPostsLoading(false);
    }
  };

  // Called by EntryForm after POST /api/posts succeeds
  const handlePostCreated = (newPost) => {
    setPosts((prev) => [newPost, ...prev]);
  };

  // ── Loading state ────────────────────────────────────────
  if (loading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          background: 'var(--background)',
        }}
      >
        <p style={{ color: 'white', fontSize: '1.2rem' }}>Loading your dashboard...</p>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div>
      <Navbar />

      <main className="container" style={{ paddingBottom: '4rem' }}>
        <DashboardHeader userName={user.name} />

        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr)', gap: '2rem' }}>
          {/* POST /api/posts integration */}
          <EntryForm onPostCreated={handlePostCreated} />

          {/* GET /api/posts integration */}
          <PostList
            posts={posts}
            loading={postsLoading}
            error={postsError}
            onRetry={fetchPosts}
          />
        </div>
      </main>
    </div>
  );
}
