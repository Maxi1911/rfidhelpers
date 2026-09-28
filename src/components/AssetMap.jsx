import React, { useState } from 'react';
import { ANTENNA_NODES } from '../data/mockData';
import { MapPin, Radio, Wifi, Shield, ArrowUpRight, Search } from 'lucide-react';

export default function AssetMap({ tags, onSelectTag }) {
  const [selectedZone, setSelectedZone] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const zones = [
    { id: 'z1', name: 'Receiving Dock 2', antenna: 'Antenna #1 (Portal Gate)', color: '#3b82f6' },
    { id: 'z2', name: 'Inspection Station 1', antenna: 'Antenna #2 (Conveyor)', color: '#a855f7' },
    { id: 'z3', name: 'Storage Bay B2', antenna: 'Antenna #3 (Bay B)', color: '#f59e0b' },
    { id: 'z4', name: 'Gate Portal Dock 1', antenna: 'Antenna #4 (Dock Gate)', color: '#10b981' },
  ];

  const filteredTags = tags.filter(t => {
    const matchesZone = selectedZone === 'All' || t.zone === selectedZone || t.antenna.includes(selectedZone);
    const matchesSearch = searchQuery === '' || 
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      t.epc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.sku.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesZone && matchesSearch;
  });

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '24px' }}>
      
      {/* Left Column: Interactive Warehouse Zone Map Visualizer */}
      <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 800 }}>Warehouse RFID Antenna Zone Map</h3>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Real-time location heat & fixed antenna beam coverage</p>
        </div>

        {/* 2x2 Zone Grid Diagram */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '14px',
          minHeight: '340px',
          background: 'rgba(8, 12, 20, 0.9)',
          padding: '16px',
          borderRadius: '12px',
          border: '1px solid var(--border-color)'
        }}>
          {zones.map((zone) => {
            const zoneTagCount = tags.filter(t => t.zone === zone.name || t.antenna === zone.antenna).length;
            const isSelected = selectedZone === zone.name;

            return (
              <div 
                key={zone.id}
                onClick={() => setSelectedZone(isSelected ? 'All' : zone.name)}
                style={{
                  background: isSelected ? `${zone.color}20` : 'rgba(15, 23, 42, 0.8)',
                  border: `1px solid ${isSelected ? zone.color : 'rgba(255, 255, 255, 0.1)'}`,
                  borderRadius: '10px',
                  padding: '16px',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  transition: 'all 0.25s',
                  boxShadow: isSelected ? `0 0 15px ${zone.color}40` : 'none'
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span className="badge" style={{ background: `${zone.color}20`, color: zone.color, border: `1px solid ${zone.color}40`, fontSize: '0.68rem' }}>
                      {zone.antenna}
                    </span>
                    <Radio size={16} color={zone.color} className="animate-pulse-ring" />
                  </div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 800, marginTop: '10px', color: 'var(--text-primary)' }}>
                    {zone.name}
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '16px' }}>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Active Tags</div>
                  <div className="font-mono" style={{ fontSize: '1.4rem', fontWeight: 800, color: zone.color }}>
                    {zoneTagCount}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Antenna Hardware Specs */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)' }}>Registered Antenna Readers:</div>
          {ANTENNA_NODES.map(ant => (
            <div key={ant.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', padding: '6px 10px', background: 'rgba(15, 23, 42, 0.6)', borderRadius: '6px' }}>
              <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{ant.name}</span>
              <span className="font-mono" style={{ color: 'var(--accent-cyan)' }}>{ant.power} • {ant.frequency}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right Column: Zone Asset Inventory Table */}
      <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800 }}>Zone Tag Inventory</h3>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Selected Zone: <strong style={{ color: 'var(--accent-cyan)' }}>{selectedZone}</strong></p>
          </div>

          <div style={{ position: 'relative', minWidth: '180px' }}>
            <input 
              type="text" 
              className="custom-input" 
              style={{ paddingLeft: '30px', fontSize: '0.78rem' }}
              placeholder="Search EPC / SKU..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search size={14} color="var(--text-muted)" style={{ position: 'absolute', left: '10px', top: '10px' }} />
          </div>
        </div>

        {/* Asset Cards List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', overflowY: 'auto', maxHeight: '480px' }}>
          {filteredTags.length === 0 ? (
            <div style={{ padding: '30px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
              No RFID tags found matching search or zone criteria.
            </div>
          ) : (
            filteredTags.map(tag => (
              <div 
                key={tag.id}
                onClick={() => onSelectTag(tag)}
                style={{
                  background: 'rgba(15, 23, 42, 0.8)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '10px',
                  padding: '12px 14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '10px',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)' }}>{tag.name}</div>
                  <div className="font-mono" style={{ fontSize: '0.72rem', color: 'var(--accent-cyan)', marginTop: '2px' }}>
                    EPC: {tag.epc}
                  </div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                    Zone: <span style={{ color: 'var(--text-secondary)' }}>{tag.zone}</span> • Temp: <span className="font-mono">{tag.temp || '23 °C'}</span>
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <span className="badge badge-emerald font-mono" style={{ fontSize: '0.7rem' }}>{tag.rssi} dBm</span>
                  <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', marginTop: '4px' }}>{tag.lastRead}</div>
                </div>
              </div>
            ))
          )}
        </div>

      </div>

    </div>
  );
}
