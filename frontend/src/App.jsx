import React, { useState } from 'react';
import { CheckCircle2, ShieldCheck, Terminal, ArrowRight } from 'lucide-react';

const initialStages = [
  { id: 'source', name: 'Source / Git', status: 'SUCCESS', time: '1s' },
  { id: 'build', name: 'Build & Setup', status: 'SUCCESS', time: '14s' },
  { id: 'test', name: 'Unit Testing', status: 'SUCCESS', time: '3s' },
  { id: 'docker', name: 'Docker Creation', status: 'SUCCESS', time: '22s' },
  { id: 'scan', name: 'Security Scan', status: 'SUCCESS', time: '18s' },
  { id: 'deploy', name: 'Deployment', status: 'SUCCESS', time: '4s' }
];

export default function App() {
  const [selectedStage, setSelectedStage] = useState(initialStages[4]);

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '40px 20px' }}>
      <header style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '26px', margin: '0 0 8px 0', color: '#f1f5f9' }}>
          CI/CD Pipeline Visualizer Dashboard
        </h1>
        <p style={{ margin: 0, color: '#94a3b8', fontSize: '14px' }}>
          Real-time pipeline analysis for your DevOps workflow.
        </p>
      </header>

      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', overflowX: 'auto', paddingBottom: '24px' }}>
        {initialStages.map((stage, idx) => (
          <React.Fragment key={stage.id}>
            <div 
              onClick={() => setSelectedStage(stage)}
              style={{
                background: selectedStage.id === stage.id ? '#1e293b' : '#0f172a',
                border: selectedStage.id === stage.id ? '2px solid #38bdf8' : '1px solid #334155',
                borderRadius: '8px',
                padding: '16px',
                minWidth: '150px',
                cursor: 'pointer',
                textAlign: 'center'
              }}
            >
              <div style={{ fontSize: '13px', fontWeight: 'bold', color: '#e2e8f0', marginBottom: '8px' }}>
                {stage.name}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontSize: '12px', color: '#22c55e' }}>
                <CheckCircle2 size={15} /> {stage.status}
              </div>
              <div style={{ fontSize: '11px', color: '#64748b', marginTop: '6px' }}>{stage.time}</div>
            </div>
            {idx < initialStages.length - 1 && <ArrowRight size={18} color="#475569" />}
          </React.Fragment>
        ))}
      </div>

      <div style={{ marginTop: '24px', background: '#1e293b', borderRadius: '8px', border: '1px solid #334155', padding: '24px' }}>
        <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid #334155', paddingBottom: '16px' }}>
          <Terminal size={18} color="#38bdf8" /> Stage Details: {selectedStage.name}
        </h3>
        
        {selectedStage.id === 'scan' ? (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#38bdf8', marginBottom: '12px' }}>
              <ShieldCheck size={20} />
              <span style={{ fontWeight: '600' }}>Trivy Container Vulnerability Scan Report</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginTop: '16px' }}>
              <div style={{ background: '#0f172a', padding: '12px', borderRadius: '6px', textAlign: 'center' }}>
                <div style={{ color: '#ef4444', fontSize: '18px', fontWeight: 'bold' }}>0</div>
                <div style={{ fontSize: '11px', color: '#94a3b8' }}>CRITICAL</div>
              </div>
              <div style={{ background: '#0f172a', padding: '12px', borderRadius: '6px', textAlign: 'center' }}>
                <div style={{ color: '#eab308', fontSize: '18px', fontWeight: 'bold' }}>1</div>
                <div style={{ fontSize: '11px', color: '#94a3b8' }}>MEDIUM</div>
              </div>
            </div>
          </div>
        ) : (
          <pre style={{ background: '#0f172a', padding: '16px', borderRadius: '6px', color: '#a5f3fc', fontSize: '13px', margin: 0 }}>
            {`[INFO] Executing runner commands for ${selectedStage.name}...\n[SUCCESS] Stage finished cleanly with code 0.`}
          </pre>
        )}
      </div>
    </div>
  );
}
