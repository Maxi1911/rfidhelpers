import React, { useState } from 'react';
import { HardDrive, Lock, Unlock, Cpu, Key, FileCode, CheckCircle2, Sparkles, AlertCircle, Plus, Copy } from 'lucide-react';

export default function EpcEncoder({ onAddTag }) {
  const [assetName, setAssetName] = useState('');
  const [sku, setSku] = useState('SKU-NEW-880');
  const [category, setCategory] = useState('Electronics');
  const [epcHex, setEpcHex] = useState('E2806894000040182C9F8A99');
  const [userMemData, setUserMemData] = useState('43616C696272617465643A204F4B0000');
  const [accessPassword, setAccessPassword] = useState('00000000');
  const [isLocked, setIsLocked] = useState(false);
  const [notification, setNotification] = useState(null);

  // Generate random GS1 EPC Gen2 hex string
  const handleGenerateRandomEpc = () => {
    const hexChars = '0123456789ABCDEF';
    let result = 'E280'; // GS1 Header
    for (let i = 0; i < 20; i++) {
      result += hexChars.charAt(Math.floor(Math.random() * hexChars.length));
    }
    setEpcHex(result);
  };

  const handleEncodeSubmit = (e) => {
    e.preventDefault();
    if (!assetName.trim()) {
      setNotification({ type: 'error', text: 'Please specify an asset name before encoding.' });
      return;
    }

    const newTag = {
      id: `tag-${Date.now()}`,
      epc: epcHex,
      tid: `E200${Math.floor(Math.random() * 10000000000000000)}`,
      name: assetName,
      sku: sku,
      category: category,
      stage: '1. Encoded',
      zone: 'RFID Encoding Lab',
      rssi: -30,
      antenna: 'Antenna #1 (Portal Gate)',
      reads: 1,
      lastRead: new Date().toLocaleTimeString(),
      userMem: userMemData,
      status: 'Verified',
      batchNo: `BATCH-2026-${Math.floor(Math.random() * 90 + 10)}`,
      temp: '22.0 °C'
    };

    onAddTag(newTag);
    setNotification({ type: 'success', text: `Tag "${assetName}" successfully encoded to EPC: ${epcHex}` });
    setAssetName('');
    handleGenerateRandomEpc();
    setTimeout(() => setNotification(null), 4000);
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '24px' }}>
      
      {/* Left Column: Encoding Input & Memory Bank Spec Form */}
      <div className="glass-panel" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
          <HardDrive size={22} color="var(--accent-cyan)" />
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800 }}>EPC Gen2 Memory Bank Programmer</h3>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Write & Lock RFID Transponder Memory Banks</p>
          </div>
        </div>

        {notification && (
          <div style={{
            padding: '12px 16px',
            borderRadius: '8px',
            marginBottom: '20px',
            fontSize: '0.85rem',
            background: notification.type === 'success' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(244, 63, 94, 0.15)',
            border: `1px solid ${notification.type === 'success' ? 'rgba(16, 185, 129, 0.4)' : 'rgba(244, 63, 94, 0.4)'}`,
            color: notification.type === 'success' ? '#34d399' : '#fb7185',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <CheckCircle2 size={16} />
            {notification.text}
          </div>
        )}

        <form onSubmit={handleEncodeSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          <div>
            <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '6px', fontWeight: 600 }}>
              Asset / Item Name *
            </label>
            <input 
              type="text" 
              className="custom-input" 
              placeholder="e.g. High-Voltage Transformer Pack B"
              value={assetName}
              onChange={(e) => setAssetName(e.target.value)}
              required
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '6px', fontWeight: 600 }}>
                Stock Keeping Unit (SKU)
              </label>
              <input 
                type="text" 
                className="custom-input font-mono" 
                value={sku}
                onChange={(e) => setSku(e.target.value)}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '6px', fontWeight: 600 }}>
                Asset Category
              </label>
              <select className="custom-input" value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="Electronics">Electronics</option>
                <option value="Heavy Machinery">Heavy Machinery</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Textile & Linen">Textile & Linen</option>
              </select>
            </div>
          </div>

          {/* EPC Memory Bank 01 Hex Input */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <label style={{ fontSize: '0.8rem', color: 'var(--accent-cyan)', fontWeight: 700 }}>
                EPC Memory Bank [Bank 01] (24 Hex Chars)
              </label>
              <button 
                type="button"
                onClick={handleGenerateRandomEpc}
                style={{ background: 'none', border: 'none', color: 'var(--accent-cyan)', fontSize: '0.75rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
              >
                <Sparkles size={12} /> Auto-Generate
              </button>
            </div>
            <input 
              type="text" 
              className="custom-input font-mono" 
              style={{ color: 'var(--accent-cyan)', letterSpacing: '0.08em', fontWeight: 700 }}
              value={epcHex}
              onChange={(e) => setEpcHex(e.target.value.toUpperCase())}
              maxLength={24}
            />
          </div>

          {/* User Memory Bank 11 Input */}
          <div>
            <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '6px', fontWeight: 600 }}>
              User Memory Payload [Bank 11] (HEX String)
            </label>
            <input 
              type="text" 
              className="custom-input font-mono" 
              value={userMemData}
              onChange={(e) => setUserMemData(e.target.value.toUpperCase())}
            />
          </div>

          {/* Tag Security Lock Settings */}
          <div style={{ background: 'rgba(15, 23, 42, 0.8)', padding: '14px', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', fontWeight: 700 }}>
                <Key size={14} color="var(--accent-amber)" /> Access Password Protection
              </div>
              <button
                type="button"
                onClick={() => setIsLocked(!isLocked)}
                style={{
                  background: isLocked ? 'rgba(244, 63, 94, 0.15)' : 'rgba(16, 185, 129, 0.15)',
                  border: `1px solid ${isLocked ? 'rgba(244, 63, 94, 0.4)' : 'rgba(16, 185, 129, 0.4)'}`,
                  color: isLocked ? '#fb7185' : '#34d399',
                  borderRadius: '16px',
                  padding: '4px 10px',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                {isLocked ? <Lock size={12} /> : <Unlock size={12} />}
                {isLocked ? 'Locked (PERM)' : 'Unlocked (READ/WRITE)'}
              </button>
            </div>

            <input 
              type="text" 
              className="custom-input font-mono" 
              placeholder="32-bit Access Password Hex (e.g. 00000000)"
              value={accessPassword}
              onChange={(e) => setAccessPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="btn-primary" style={{ marginTop: '8px', justifyContent: 'center', padding: '12px' }}>
            <Plus size={16} /> Encode & Write Transponder
          </button>

        </form>
      </div>

      {/* Right Column: Live Memory Bank Layout Map */}
      <div className="glass-panel" style={{ padding: '24px' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '6px' }}>EPC Gen2 Transponder Memory Map</h3>
        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '20px' }}>
          Standard ISO/IEC 18000-63 4-Bank Architecture
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          
          {/* Bank 00: Reserved */}
          <div style={{ background: 'rgba(15, 23, 42, 0.8)', border: '1px solid var(--border-color)', borderRadius: '10px', padding: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.825rem', fontWeight: 700, color: 'var(--accent-amber)', marginBottom: '4px' }}>
              <span>Bank 00 (Reserved Memory)</span>
              <span>32-Bit Access / 32-Bit Kill Passwords</span>
            </div>
            <div className="font-mono" style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
              Kill Pass: 0x00000000 • Access Pass: 0x{accessPassword || '00000000'}
            </div>
          </div>

          {/* Bank 01: EPC */}
          <div style={{ background: 'rgba(0, 242, 254, 0.08)', border: '1px solid var(--border-active)', borderRadius: '10px', padding: '14px', boxShadow: 'var(--glow-cyan)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.825rem', fontWeight: 700, color: 'var(--accent-cyan)', marginBottom: '4px' }}>
              <span>Bank 01 (EPC Memory Bank)</span>
              <span>16-bit CRC + 16-bit PC + EPC Data</span>
            </div>
            <div className="font-mono" style={{ fontSize: '0.9rem', color: '#ffffff', fontWeight: 700, letterSpacing: '0.08em', wordBreak: 'break-all' }}>
              {epcHex || 'E2806894000040182C9F8A99'}
            </div>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '4px', display: 'block' }}>
              GS1 Header: E280 | Serial Payload: {epcHex.substring(4)}
            </span>
          </div>

          {/* Bank 10: TID */}
          <div style={{ background: 'rgba(15, 23, 42, 0.8)', border: '1px solid var(--border-color)', borderRadius: '10px', padding: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.825rem', fontWeight: 700, color: 'var(--accent-purple)', marginBottom: '4px' }}>
              <span>Bank 10 (Tag Identifier TID)</span>
              <span>Factory Hard-coded Locked</span>
            </div>
            <div className="font-mono" style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', wordBreak: 'break-all' }}>
              E20034120173000000A41299 [Silicon Chip ID: Impinj Monza R6]
            </div>
          </div>

          {/* Bank 11: User Memory */}
          <div style={{ background: 'rgba(15, 23, 42, 0.8)', border: '1px solid var(--border-color)', borderRadius: '10px', padding: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.825rem', fontWeight: 700, color: 'var(--accent-emerald)', marginBottom: '4px' }}>
              <span>Bank 11 (User Memory Payload)</span>
              <span>Read/Write Custom Data</span>
            </div>
            <div className="font-mono" style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', wordBreak: 'break-all' }}>
              {userMemData || '0000000000000000'}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
