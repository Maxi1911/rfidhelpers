import React, { useState } from 'react';
import { PROCESS_STAGES } from '../data/mockData';
import { CheckCircle2, ChevronRight, HardDrive, PackageCheck, SearchCheck, Warehouse, Truck, ArrowRight, ShieldAlert, Sparkles } from 'lucide-react';

const ICON_MAP = {
  HardDrive: HardDrive,
  PackageCheck: PackageCheck,
  SearchCheck: SearchCheck,
  Warehouse: Warehouse,
  Truck: Truck
};

export default function ProcessPipeline({ tags, onAdvanceStage, onSelectTag }) {
  const [selectedStageFilter, setSelectedStageFilter] = useState('All');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Pipeline Summary Bar */}
      <div className="glass-panel" style={{ padding: '20px 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 800 }}>End-to-End RFID Asset Workflow Pipeline</h2>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Automated track-and-trace tracking from encoding station to outbound shipping gate.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Filter Pipeline:</span>
            <button
              onClick={() => setSelectedStageFilter('All')}
              className={`badge ${selectedStageFilter === 'All' ? 'badge-cyan' : 'badge-amber'}`}
              style={{ cursor: 'pointer' }}
            >
              All ({tags.length})
            </button>
          </div>
        </div>

        {/* Workflow Horizontal Step Indicators */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px', marginTop: '20px' }}>
          {PROCESS_STAGES.map((stage, idx) => {
            const Icon = ICON_MAP[stage.icon] || HardDrive;
            const count = tags.filter(t => t.stage === stage.name).length;

            return (
              <div 
                key={stage.id}
                style={{
                  background: 'rgba(15, 23, 42, 0.7)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '10px',
                  padding: '12px 14px',
                  position: 'relative'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <div style={{
                    width: '30px',
                    height: '30px',
                    borderRadius: '8px',
                    background: `${stage.color}15`,
                    border: `1px solid ${stage.color}40`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Icon size={16} color={stage.color} />
                  </div>
                  <span className="font-mono" style={{ fontSize: '1rem', fontWeight: 800, color: stage.color }}>
                    {count}
                  </span>
                </div>

                <div style={{ fontSize: '0.825rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                  {stage.name}
                </div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                  {stage.description}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Kanban Board Columns for 5 Stages */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
        {PROCESS_STAGES.map((stage, idx) => {
          const stageTags = tags.filter(t => t.stage === stage.name);
          const nextStageName = PROCESS_STAGES[idx + 1]?.name;

          return (
            <div 
              key={stage.id}
              className="glass-panel"
              style={{
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                minHeight: '480px',
                background: 'rgba(15, 23, 42, 0.65)'
              }}
            >
              {/* Column Header */}
              <div style={{
                display: 'flex',
                justify: 'space-between',
                alignItems: 'center',
                paddingBottom: '12px',
                borderBottom: '1px solid var(--border-color)'
              }}>
                <div style={{ fontSize: '0.875rem', fontWeight: 700, color: stage.color }}>
                  {stage.name}
                </div>
                <span className="badge badge-cyan" style={{ fontSize: '0.7rem' }}>
                  {stageTags.length}
                </span>
              </div>

              {/* Tag Cards List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', flex: 1, overflowY: 'auto' }}>
                {stageTags.length === 0 ? (
                  <div style={{
                    padding: '24px 12px',
                    textAlign: 'center',
                    color: 'var(--text-muted)',
                    fontSize: '0.75rem',
                    border: '1px dashed var(--border-color)',
                    borderRadius: '8px'
                  }}>
                    No assets in this stage
                  </div>
                ) : (
                  stageTags.map(tag => (
                    <div 
                      key={tag.id}
                      style={{
                        background: 'rgba(30, 41, 59, 0.6)',
                        border: '1px solid var(--border-color)',
                        borderRadius: '10px',
                        padding: '12px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '8px',
                        transition: 'all 0.2s'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div 
                          onClick={() => onSelectTag(tag)}
                          style={{ cursor: 'pointer', flex: 1 }}
                        >
                          <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                            {tag.name}
                          </div>
                          <div className="font-mono" style={{ fontSize: '0.7rem', color: 'var(--accent-cyan)', marginTop: '2px' }}>
                            {tag.epc.substring(0, 16)}...
                          </div>
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                        <span>Zone: <strong style={{ color: 'var(--text-secondary)' }}>{tag.zone}</strong></span>
                        <span className="font-mono" style={{ color: 'var(--accent-emerald)' }}>{tag.rssi} dBm</span>
                      </div>

                      {/* Advance Stage Button */}
                      {nextStageName && (
                        <button
                          onClick={() => onAdvanceStage(tag.id, nextStageName)}
                          style={{
                            background: 'rgba(0, 242, 254, 0.1)',
                            border: '1px solid rgba(0, 242, 254, 0.3)',
                            color: 'var(--accent-cyan)',
                            borderRadius: '6px',
                            padding: '6px 10px',
                            fontSize: '0.72rem',
                            fontWeight: 700,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '4px',
                            marginTop: '4px',
                            transition: 'all 0.2s'
                          }}
                        >
                          <span>Move to Next Stage</span>
                          <ArrowRight size={12} />
                        </button>
                      )}
                    </div>
                  ))
                )}
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}
