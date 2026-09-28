import React from 'react';
import { X, Radio, HardDrive, ShieldCheck, MapPin, Cpu, Clock, RefreshCw } from 'lucide-react';

export default function TagDetailModal({ tag, onClose, onAdvanceStage }) {
  if (!tag) return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0, 0, 0, 0.75)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 100,
      padding: '16px'
    }}>
      <div className="glass-panel" style={{
        width: '100%',
        maxWidth: '560px',
        padding: '24px',
        position: 'relative',
        border: '1px solid var(--border-active)',
        boxShadow: 'var(--glow-cyan)'
      }}>
        
        {/* Modal Close Button */}
        <button 
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: 'rgba(255, 255, 255, 0.05)',
            border: 'none',
            color: 'var(--text-secondary)',
            borderRadius: '50%',
            width: '32px',
            height: '32px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <X size={18} />
        </button>

        {/* Modal Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
          <div style={{
            width: '44px',
            height: '44px',
            borderRadius: '12px',
            background: 'rgba(0, 242, 254, 0.15)',
            border: '1px solid rgba(0, 242, 254, 0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Radio size={24} color="var(--accent-cyan)" />
          </div>
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>{tag.name}</h3>
            <span className="badge badge-cyan" style={{ fontSize: '0.7rem' }}>{tag.sku}</span>
          </div>
        </div>

        {/* Transponder Core Info Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '20px' }}>
          
          <div style={{ background: 'rgba(15, 23, 42, 0.8)', padding: '12px', borderRadius: '8px' }}>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>EPC Transponder Code</div>
            <div className="font-mono" style={{ fontSize: '0.8rem', color: 'var(--accent-cyan)', fontWeight: 700, wordBreak: 'break-all', marginTop: '2px' }}>
              {tag.epc}
            </div>
          </div>

          <div style={{ background: 'rgba(15, 23, 42, 0.8)', padding: '12px', borderRadius: '8px' }}>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>TID Factory Silicon ID</div>
            <div className="font-mono" style={{ fontSize: '0.78rem', color: 'var(--accent-purple)', wordBreak: 'break-all', marginTop: '2px' }}>
              {tag.tid || 'E20034120173000000A41290'}
            </div>
          </div>

          <div style={{ background: 'rgba(15, 23, 42, 0.8)', padding: '12px', borderRadius: '8px' }}>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Current Process Stage</div>
            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--accent-emerald)', marginTop: '2px' }}>
              {tag.stage}
            </div>
          </div>

          <div style={{ background: 'rgba(15, 23, 42, 0.8)', padding: '12px', borderRadius: '8px' }}>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Zone Location</div>
            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', marginTop: '2px' }}>
              {tag.zone}
            </div>
          </div>

        </div>

        {/* Technical RFID Metrics */}
        <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
            <span style={{ color: 'var(--text-muted)' }}>Signal Strength (RSSI):</span>
            <span className="font-mono" style={{ color: 'var(--accent-emerald)', fontWeight: 700 }}>{tag.rssi} dBm</span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
            <span style={{ color: 'var(--text-muted)' }}>Total Reads:</span>
            <span className="font-mono" style={{ color: 'var(--text-primary)' }}>{tag.reads} counts</span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
            <span style={{ color: 'var(--text-muted)' }}>User Memory Payload:</span>
            <span className="font-mono" style={{ color: 'var(--accent-amber)', fontSize: '0.75rem' }}>{tag.userMem || '0000000000000000'}</span>
          </div>
        </div>

        {/* Modal Actions */}
        <div style={{ marginTop: '24px', display: 'flex', gap: '12px' }}>
          <button className="btn-secondary" onClick={onClose} style={{ flex: 1, justifyContent: 'center' }}>
            Close Inspector
          </button>
        </div>

      </div>
    </div>
  );
}
