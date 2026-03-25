import { Calendar, AlignLeft } from 'lucide-react';

export default function PostCard({ post }) {
  return (
    <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
      <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'white' }}>
        {post.title}
      </h3>

      <div
        style={{
          color: 'var(--text-muted)',
          fontSize: '0.9rem',
          marginBottom: '1rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.25rem',
        }}
      >
        <Calendar size={14} />
        {new Date(post.createdAt).toLocaleDateString()} at{' '}
        {new Date(post.createdAt).toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        })}
      </div>

      <p style={{ fontWeight: '500', marginBottom: '0.75rem', color: '#cbd5e1' }}>
        {post.description}
      </p>

      <div
        style={{
          marginTop: 'auto',
          background: 'rgba(0,0,0,0.2)',
          padding: '1rem',
          borderRadius: '8px',
          fontSize: '0.95rem',
          display: 'flex',
          gap: '0.5rem',
        }}
      >
        <AlignLeft
          size={16}
          color="var(--primary)"
          style={{ flexShrink: 0, marginTop: '2px' }}
        />
        <span style={{ color: 'var(--text-muted)', whiteSpace: 'pre-wrap' }}>
          {post.content}
        </span>
      </div>
    </div>
  );
}
