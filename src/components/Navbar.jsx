import React from 'react';
import { Wrench, Sun, Moon } from 'lucide-react';

export default function Navbar({ themeMode, setThemeMode }) {
  const isDark = themeMode === 'dark';

  return (
    <header style={{ 
      borderBottom: `1px solid ${isDark ? 'var(--border-color)' : '#e2e8f0'}`, 
      background: isDark ? 'rgba(8, 12, 20, 0.95)' : '#ffffff', 
      boxShadow: isDark ? 'none' : '0 1px 3px rgba(0, 0, 0, 0.05)',
      position: 'sticky', 
      top: 0, 
      zIndex: 50,
      transition: 'all 0.3s ease'
    }}>
      <div style={{ padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
        
        {/* Brand Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{
            width: '44px',
            height: '44px',
            borderRadius: '12px',
            background: isDark ? 'linear-gradient(135deg, rgba(0, 242, 254, 0.2), rgba(139, 92, 246, 0.2))' : 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
            border: `1px solid ${isDark ? 'var(--border-active)' : '#bfdbfe'}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: isDark ? 'var(--glow-cyan)' : '0 2px 8px rgba(37, 99, 235, 0.15)'
          }}>
            <Wrench size={24} color={isDark ? 'var(--accent-cyan)' : '#2563eb'} />
          </div>
          <div>
            <h1 style={{ 
              fontSize: '1.3rem', 
              fontWeight: 800, 
              letterSpacing: '-0.02em', 
              color: isDark ? '#ffffff' : '#0f172a' 
            }}>
              Linengrass ERP Helpers Suite
            </h1>
            <p style={{ fontSize: '0.78rem', color: isDark ? 'var(--text-muted)' : '#64748b', marginTop: '2px' }}>
              Operational Payload Generators & Operational Workflow Tools
            </p>
          </div>
        </div>

        {/* Theme Mode Toggle Button */}
        <button
          onClick={() => setThemeMode(isDark ? 'light' : 'dark')}
          style={{
            background: isDark ? 'rgba(30, 41, 59, 0.8)' : '#f1f5f9',
            border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.15)' : '#cbd5e1'}`,
            color: isDark ? '#f8fafc' : '#0f172a',
            padding: '8px 16px',
            borderRadius: '30px',
            fontSize: '0.85rem',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: isDark ? '0 0 15px rgba(0, 242, 254, 0.15)' : '0 2px 8px rgba(0, 0, 0, 0.05)',
            transition: 'all 0.25s ease'
          }}
        >
          {isDark ? (
            <>
              <Sun size={16} color="#fbbf24" />
              <span>Light Mode</span>
            </>
          ) : (
            <>
              <Moon size={16} color="#6366f1" />
              <span>Dark Mode</span>
            </>
          )}
        </button>

      </div>
    </header>
  );
}
