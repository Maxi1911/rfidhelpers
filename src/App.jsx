import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HelpersPage from './helpers/HelpersPage';

export default function App() {
  const [themeMode, setThemeMode] = useState(() => {
    return localStorage.getItem('themeMode') || 'light';
  });

  useEffect(() => {
    const DEFAULT_AUTH_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJtYXhpQGdtYWlsLmNvbSIsInVzZXJJZCI6MTAyMDIyLCJyb2xlIjoiQURNSU4iLCJ1c2VyVHlwZSI6IlRFQU0iLCJpYXQiOjE3ODQ3NTI4ODMsImV4cCI6MTc4OTkzNjg4M30.TUPpXrwjvsVER5kmqzOmX95af_ZsSGrARczX-ouVzQQ';
    const envToken = import.meta.env.VITE_AUTH_TOKEN;
    const envCompanyId = import.meta.env.VITE_COMPANY_ID || '100000';
    const envDcid = import.meta.env.VITE_DCID || '100000';

    if (envCompanyId) localStorage.setItem('companyId', envCompanyId);
    if (envDcid) localStorage.setItem('dcid', envDcid);
    if (envToken || !localStorage.getItem('token')) {
      localStorage.setItem('token', envToken || DEFAULT_AUTH_TOKEN);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('themeMode', themeMode);
    if (themeMode === 'dark') {
      document.body.style.backgroundColor = '#060913';
      document.body.style.color = '#f8fafc';
    } else {
      document.body.style.backgroundColor = '#f8fafc';
      document.body.style.color = '#0f172a';
    }
  }, [themeMode]);

  const isDark = themeMode === 'dark';

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column', 
      background: isDark ? 'var(--bg-dark)' : '#f8fafc',
      transition: 'all 0.3s ease'
    }}>
      
      {/* ERP Header with Light/Dark Mode Toggle */}
      <Navbar themeMode={themeMode} setThemeMode={setThemeMode} />

      {/* Main Container - ERP Helpers Suite */}
      <main style={{ flex: 1, padding: '24px', maxWidth: '1440px', margin: '0 auto', width: '100%' }}>
        <div 
          className="glass-panel" 
          style={{ 
            padding: '4px', 
            background: isDark ? 'rgba(15, 23, 42, 0.75)' : '#ffffff', 
            borderRadius: '14px', 
            border: `1px solid ${isDark ? 'var(--border-active)' : '#e2e8f0'}`, 
            boxShadow: isDark ? 'var(--glow-cyan)' : '0 4px 20px rgba(0, 0, 0, 0.04)',
            transition: 'all 0.3s ease'
          }}
        >
          <HelpersPage themeMode={themeMode} />
        </div>
      </main>

      {/* Footer */}
      <footer style={{ 
        borderTop: `1px solid ${isDark ? 'var(--border-color)' : '#e2e8f0'}`, 
        padding: '16px 24px', 
        textAlign: 'center', 
        fontSize: '0.75rem', 
        color: isDark ? 'var(--text-muted)' : '#64748b', 
        background: isDark ? 'rgba(8, 12, 20, 0.95)' : '#ffffff',
        transition: 'all 0.3s ease'
      }}>
        Linengrass Laundry ERP • Operational Helpers Suite • Location: <code style={{ color: isDark ? 'var(--accent-cyan)' : '#2563eb' }}>/scratch/rfid-process</code>
      </footer>

    </div>
  );
}
