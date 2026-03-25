'use client';

import { useState } from 'react';
import { createPostAPI } from '@/lib/api';
import { LayoutList } from 'lucide-react';
import FormGroup from '@/components/ui/FormGroup';

export default function EntryForm({ onPostCreated }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' }); // type: 'success' | 'error'

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage({ text: '', type: '' });

    try {
      // POST /api/posts
      const res = await createPostAPI({ title, description, content });
      const newPost = res.data.data;

      onPostCreated(newPost);

      // Clear fields after success
      setTitle('');
      setDescription('');
      setContent('');
      setMessage({ text: 'Entry submitted successfully!', type: 'success' });
    } catch (error) {
      const errMsg = error.response?.data?.error || 'Failed to submit entry.';
      setMessage({ text: errMsg, type: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const isSuccess = message.type === 'success';

  return (
    <div className="card" style={{ maxWidth: '600px', margin: '0 auto', width: '100%' }}>
      <h2 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <LayoutList size={24} color="var(--primary)" />
        Add New Entry
      </h2>

      {message.text && (
        <div
          style={{
            padding: '0.75rem',
            borderRadius: '8px',
            marginBottom: '1rem',
            background: isSuccess ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)',
            color: isSuccess ? '#4ade80' : 'var(--error)',
            border: `1px solid ${isSuccess ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)'}`,
          }}
        >
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <FormGroup label="Title" htmlFor="entry-title">
          <input
            type="text"
            id="entry-title"
            className="form-input"
            placeholder="Enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </FormGroup>

        <FormGroup label="Description" htmlFor="entry-description">
          <input
            type="text"
            id="entry-description"
            className="form-input"
            placeholder="Brief description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </FormGroup>

        <FormGroup label="Content" htmlFor="entry-content">
          <textarea
            id="entry-content"
            className="form-input"
            placeholder="Detailed content"
            rows={4}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            style={{ resize: 'vertical' }}
          />
        </FormGroup>

        <button type="submit" className="btn" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit Entry'}
        </button>
      </form>
    </div>
  );
}
