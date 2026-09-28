import React, { useState } from 'react';
import { Radio, Wifi, ShieldCheck, Zap, Volume2, VolumeX, AlertTriangle, Eye, ArrowRight, Play, CheckCircle2 } from 'lucide-react';

export default function PortalScanner({ tags, onSimulateScan, onSelectTag }) {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [scanningFreq, setScanningFreq] = useState('UHF 915 MHz');
  const [powerDbm, setPowerDbm] = useState(30);
  const [filterCategory, setFilterCategory] = useState('All');

  const filteredTags = filterCategory === 'All' 
    ? tags 
    : tags.filter(t => t.category === filterCategory);

  const activeAntenna = "Antenna #1 (Portal Gate)";

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '24px' }}>
      
      {/* Left Column: Visual RFID Portal Sweeper & Reader Console */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        
        {/* RFID Gate Portal Visualizer */}
        <div className="glass-panel" style={{ padding: '24px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Radio size={18} color="var(--accent-cyan)" />
              <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>RFID Portal Gate Reader</h3>
            </div>
            <span className="badge badge-emerald" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#34d399' }}></span>
              BEAM ACTIVE
            </span>
          </div>

          {/* Animated Tunnel Scanner Graphic */}
          <div style={{
            height: '240px',
            borderRadius: '12px',
            background: 'radial-gradient(circle at center, rgba(0, 242, 254, 0.12) 0%, rgba(8, 12, 20, 0.95) 75%)',
            border: '1px dashed rgba(0, 242, 254, 0.3)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            boxShadow: 'inset 0 0 30px rgba(0, 242, 254, 0.1)'
          }}>
            {/* Animated Scanning Line */}
            <div style={{
              position: 'absolute',
              left: 0,
              right: 0,
              height: '2px',
              background: 'linear-gradient(90deg, transparent, #00f2fe, transparent)',
              boxShadow: '0 0 15px #00f2fe',
              animation: 'scanline 2.5s ease-in-out infinite alternate'
            }}></div>

            {/* Radar Pulse Concentric Circles */}
            <div style={{
              position: 'absolute',
              width: '160px',
              height: '160px',
              borderRadius: '50%',
              border: '1px solid rgba(0, 242, 254, 0.25)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <div style={{
                width: '100px',
                height: '100px',
                borderRadius: '50%',
                border: '1px dashed rgba(139, 92, 246, 0.3)',
                animation: 'radar-sweep 6s linear infinite'
              }}></div>
            </div>

            {/* Center Portal Core Icon */}
            <div style={{
              zIndex: 10,
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '8px'
            }}>
              <Wifi size={44} color="var(--accent-cyan)" className="animate-pulse-ring" />
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                {scanningFreq} • {powerDbm} dBm Tx
              </div>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Auto-Detecting ISO 18000-6C Transponders
              </p>
            </div>
          </div>

          {/* Action Trigger Buttons */}
          <div style={{ marginTop: '20px', display: 'flex', gap: '12px' }}>
            <button 
              className="btn-primary" 
              onClick={() => onSimulateScan()}
              style={{ flex: 1, justifyContent: 'center' }}
            >
              <Play size={16} /> Simulate Portal Tag Pass
            </button>
            <button 
              className="btn-secondary"
              onClick={() => setSoundEnabled(!soundEnabled)}
              title="Toggle Audio Feedback"
            >
              {soundEnabled ? <Volume2 size={16} color="var(--accent-cyan)" /> : <VolumeX size={16} color="var(--text-muted)" />}
            </button>
          </div>
        </div>

        {/* Reader Hardware Tuning & Power Control Panel */}
        <div className="glass-panel" style={{ padding: '20px' }}>
          <h4 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Zap size={16} color="var(--accent-amber)" /> Reader RF Power & Protocol Parameters
          </h4>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '6px' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Transmit Power (dBm)</span>
                <span className="font-mono" style={{ color: 'var(--accent-cyan)', fontWeight: 700 }}>{powerDbm} dBm (1.0 W EIRP)</span>
              </div>
              <input 
                type="range" 
                min="10" 
                max="33" 
                value={powerDbm} 
                onChange={(e) => setPowerDbm(Number(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--accent-cyan)', cursor: 'pointer' }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Frequency Standard</label>
                <select 
                  className="custom-input" 
                  value={scanningFreq} 
                  onChange={(e) => setScanningFreq(e.target.value)}
                >
                  <option value="UHF 915 MHz">UHF 915 MHz (US FCC)</option>
                  <option value="UHF 865 MHz">UHF 865 MHz (EU ETSI)</option>
                  <option value="HF 13.56 MHz">HF 13.56 MHz (ISO 14443)</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Category Filter</label>
                <select 
                  className="custom-input" 
                  value={filterCategory} 
                  onChange={(e) => setFilterCategory(e.target.value)}
                >
                  <option value="All">All Categories</option>
                  <option value="Heavy Machinery">Heavy Machinery</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Textile & Linen">Textile & Linen</option>
                  <option value="Electronics">Electronics</option>
                </select>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Right Column: Live Detected RFID Tags Grid */}
      <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Live Detected RFID Transponders</h3>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Real-time EPC response stream from Portal 01</p>
          </div>
          <span className="badge badge-purple" style={{ fontSize: '0.8rem' }}>
            {filteredTags.length} Active Tags
          </span>
        </div>

        {/* RFID Tags Cards Stream */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', overflowY: 'auto', maxHeight: '560px', paddingRight: '4px' }}>
          {filteredTags.map((tag) => {
            const isStrongSignal = tag.rssi > -45;
            return (
              <div 
                key={tag.id}
                onClick={() => onSelectTag(tag)}
                style={{
                  background: 'rgba(15, 23, 42, 0.8)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '10px',
                  padding: '14px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '12px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  position: 'relative'
                }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--accent-cyan)'}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--border-color)'}
              >
                {/* Left Tag Identity Info */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '8px',
                    background: isStrongSignal ? 'rgba(16, 185, 129, 0.15)' : 'rgba(245, 158, 11, 0.15)',
                    border: `1px solid ${isStrongSignal ? 'rgba(16, 185, 129, 0.3)' : 'rgba(245, 158, 11, 0.3)'}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <Radio size={20} color={isStrongSignal ? 'var(--accent-emerald)' : 'var(--accent-amber)'} />
                  </div>

                  <div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      {tag.name}
                      <span className="badge badge-cyan" style={{ fontSize: '0.65rem', padding: '2px 6px' }}>{tag.sku}</span>
                    </div>
                    
                    {/* Hex EPC display */}
                    <div className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--accent-cyan)', letterSpacing: '0.04em', marginTop: '2px' }}>
                      EPC: {tag.epc}
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '6px', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                      <span>Stage: <strong style={{ color: 'var(--text-secondary)' }}>{tag.stage}</strong></span>
                      <span>•</span>
                      <span>Antenna: <strong style={{ color: 'var(--text-secondary)' }}>{tag.antenna}</strong></span>
                    </div>
                  </div>
                </div>

                {/* Right Signal & Actions */}
                <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}>
                  <div className="font-mono" style={{ fontSize: '0.85rem', fontWeight: 700, color: isStrongSignal ? 'var(--accent-emerald)' : 'var(--accent-amber)' }}>
                    {tag.rssi} dBm
                  </div>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                    {tag.reads} reads
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px', fontSize: '0.72rem', color: 'var(--accent-cyan)' }}>
                    <span>Inspect</span>
                    <ArrowRight size={12} />
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>

    </div>
  );
}
