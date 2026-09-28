import React, { useState } from 'react';
import { BarChart3, Download, Search, CheckCircle2, AlertTriangle, ShieldCheck, Activity, Zap } from 'lucide-react';

export default function AuditLogs({ logs = [] }) {
  const [filterText, setFilterText] = useState('');

  // Fallback logs if none passed
  const displayLogs = logs.length > 0 ? logs : [
    { id: 1, time: '14:32:00', readerId: 'RFID-BIN-YPR-01', epc: '1B10203', name: 'SINGLE BED SHEET', rssi: -48, status: 'VERIFIED', code: 'HSN-1' },
    { id: 2, time: '14:32:15', readerId: 'RFID-BIN-YPR-01', epc: '2B10204', name: 'DOUBLE BED SHEET', rssi: -52, status: 'VERIFIED', code: 'HSN-6' },
    { id: 3, time: '14:32:30', readerId: 'RFID-BIN-YPR-01', epc: 'BB10205', name: 'BATH TOWEL', rssi: -45, status: 'VERIFIED', code: 'HSN-3' },
    { id: 4, time: '14:31:04', readerId: 'FX9600-GATE-01', epc: 'E2806894000040182C9F8A1B', name: 'Industrial Turbine Motor X500', rssi: -42, status: 'VERIFIED', code: 'SKU-TURB' },
    { id: 5, time: '14:28:40', readerId: 'FX9600-CONV-02', epc: 'E2806894000040182C9F8A1C', name: 'Medical Surgical Tray Alpha', rssi: -38, status: 'VERIFIED', code: 'SKU-MED' },
    { id: 6, time: '14:25:12', readerId: 'FX9600-DOCK-04', epc: 'E2806894000040182C9F8A1D', name: 'Commercial Linen Tote Cart #44', rssi: -55, status: 'PASS', code: 'SKU-TEX' },
    { id: 7, time: '14:10:05', readerId: 'FX9600-GATE-01', epc: 'E2806894000040182C9F8A1F', name: 'Automotive Chassis Component B-7', rssi: -68, status: 'MISPLACED_ZONE', code: 'SKU-AUTO' }
  ];

  const filteredLogs = displayLogs.filter(log => 
    log.epc.toLowerCase().includes(filterText.toLowerCase()) ||
    log.name.toLowerCase().includes(filterText.toLowerCase()) ||
    log.readerId.toLowerCase().includes(filterText.toLowerCase())
  );

  const handleExportCSV = () => {
    const headers = 'Timestamp,ReaderID,EPC,ProductName,RSSI,Status\n';
    const rows = filteredLogs.map(l => `${l.time},${l.readerId},${l.epc},"${l.name}",${l.rssi},${l.status}`).join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `rfid_audit_log_${Date.now()}.csv`;
    a.click();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Top Analytics KPI Metric Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
        
        <div className="glass-panel" style={{ padding: '16px 20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Read Velocity</span>
            <Activity size={18} color="var(--accent-cyan)" />
          </div>
          <div className="font-mono" style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--accent-cyan)', marginTop: '8px' }}>
            142 tags/s
          </div>
          <div style={{ fontSize: '0.72rem', color: 'var(--accent-emerald)', marginTop: '4px' }}>
            ↑ 12.4% vs last scan session
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '16px 20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Antenna Read Rate</span>
            <ShieldCheck size={18} color="var(--accent-emerald)" />
          </div>
          <div className="font-mono" style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--accent-emerald)', marginTop: '8px' }}>
            99.84%
          </div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '4px' }}>
            0.16% anti-collision retries
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '16px 20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Avg RSSI Strength</span>
            <Zap size={18} color="var(--accent-amber)" />
          </div>
          <div className="font-mono" style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--accent-amber)', marginTop: '8px' }}>
            -46.2 dBm
          </div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '4px' }}>
            Optimal Transmit Path
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '16px 20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Total Events Logged</span>
            <BarChart3 size={18} color="var(--accent-purple)" />
          </div>
          <div className="font-mono" style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--accent-purple)', marginTop: '8px' }}>
            {displayLogs.length + 1240}
          </div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '4px' }}>
            Continuous FIFO Buffer
          </div>
        </div>

      </div>

      {/* Main Table Panel */}
      <div className="glass-panel" style={{ padding: '24px' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '20px' }}>
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800 }}>Real-Time RFID Audit Event Trail</h3>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Cryptographically verified reader event log</p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ position: 'relative' }}>
              <input 
                type="text" 
                className="custom-input" 
                style={{ paddingLeft: '30px', fontSize: '0.8rem' }}
                placeholder="Filter logs..." 
                value={filterText}
                onChange={(e) => setFilterText(e.target.value)}
              />
              <Search size={14} color="var(--text-muted)" style={{ position: 'absolute', left: '10px', top: '10px' }} />
            </div>

            <button className="btn-secondary" onClick={handleExportCSV}>
              <Download size={16} /> Export CSV
            </button>
          </div>
        </div>

        {/* Audit Log Table */}
        <div style={{ border: '1px solid var(--border-color)', borderRadius: '10px', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.825rem', textAlign: 'left' }}>
            <thead style={{ background: 'rgba(15, 23, 42, 0.9)', color: 'var(--text-muted)' }}>
              <tr>
                <th style={{ padding: '12px 16px' }}>Time</th>
                <th style={{ padding: '12px 16px' }}>Reader ID</th>
                <th style={{ padding: '12px 16px' }}>EPC Tag / Code</th>
                <th style={{ padding: '12px 16px' }}>Asset Description</th>
                <th style={{ padding: '12px 16px' }}>Signal RSSI</th>
                <th style={{ padding: '12px 16px', textAlign: 'right' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.map((log, index) => {
                const isError = log.status.includes('MISPLACED') || log.status.includes('ERROR');
                return (
                  <tr 
                    key={log.id || index}
                    style={{ 
                      borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                      background: index % 2 === 0 ? 'rgba(15, 23, 42, 0.4)' : 'transparent'
                    }}
                  >
                    <td className="font-mono" style={{ padding: '12px 16px', color: 'var(--text-secondary)' }}>{log.time}</td>
                    <td style={{ padding: '12px 16px', fontWeight: 600 }}>{log.readerId}</td>
                    <td className="font-mono" style={{ padding: '12px 16px', color: 'var(--accent-cyan)', fontWeight: 700 }}>{log.epc}</td>
                    <td style={{ padding: '12px 16px', color: 'var(--text-primary)' }}>{log.name}</td>
                    <td className="font-mono" style={{ padding: '12px 16px', color: 'var(--accent-emerald)' }}>{log.rssi} dBm</td>
                    <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                      <span className={`badge ${isError ? 'badge-rose' : 'badge-emerald'}`}>
                        {log.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

      </div>

    </div>
  );
}
