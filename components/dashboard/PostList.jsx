import PostCard from '@/components/dashboard/PostCard';

export default function PostList({ posts, loading, error, onRetry }) {
  return (
    <div style={{ marginTop: '2rem' }}>
      <h2
        style={{
          marginBottom: '1.5rem',
          borderBottom: '1px solid var(--border)',
          paddingBottom: '0.5rem',
        }}
      >
        Your Entries {!loading && `(${posts.length})`}
      </h2>

      {/* Loading state */}
      {loading && (
        <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
          Loading entries...
        </div>
      )}

      {/* Error state */}
      {!loading && error && (
        <div
          style={{
            textAlign: 'center',
            padding: '2rem',
            color: 'var(--error)',
            background: 'rgba(239, 68, 68, 0.05)',
            borderRadius: '12px',
            border: '1px solid rgba(239, 68, 68, 0.15)',
          }}
        >
          <p style={{ marginBottom: '1rem' }}>{error}</p>
          <button
            className="btn"
            onClick={onRetry}
            style={{ width: 'auto', padding: '0.5rem 1.5rem' }}
          >
            Retry
          </button>
        </div>
      )}

      {/* Empty state */}
      {!loading && !error && posts.length === 0 && (
        <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
          No entries yet. Create one above!
        </div>
      )}

      {/* Posts grid */}
      {!loading && !error && posts.length > 0 && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '1.5rem',
          }}
        >
          {posts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
