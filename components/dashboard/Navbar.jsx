'use client';

import { useContext } from 'react';
import AuthContext from '@/context/AuthContext';
import { LogOut } from 'lucide-react';

export default function Navbar() {
  const { logout } = useContext(AuthContext);

  return (
    <nav className="navbar">
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div className="nav-brand">
          Auth<span>Dash</span>
        </div>
        <button
          className="btn btn-outline"
          onClick={logout}
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </nav>
  );
}
