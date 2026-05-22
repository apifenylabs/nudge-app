'use client';

import { useState } from 'react';
import { loadFromLocalStorage, saveToLocalStorage, syncAllToSupabase, type LifeOSData, type DayEntry } from '../lib/storage';

export default function DataManager() {
  const [showExport, setShowExport] = useState(false);

  const handleExport = () => {
    const data = loadFromLocalStorage();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `lifeos-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        try {
          const parsed = JSON.parse(ev.target?.result as string);
          const existing = loadFromLocalStorage();
          const merged: LifeOSData = { days: { ...existing.days, ...parsed.days } };
          saveToLocalStorage(merged);
          alert(`Imported ${Object.keys(parsed.days ?? {}).length} days. Refreshing...`);
          window.location.reload();
        } catch {
          alert('Invalid backup file. Please select a valid LifeOS backup.');
        }
      };
      reader.readAsText(file);
    };
    input.click();
  };

  const handleReset = () => {
    if (confirm('Delete ALL LifeOS data? This cannot be undone.')) {
      if (confirm('Are you sure? All your tracked data will be permanently deleted.')) {
        saveToLocalStorage({ days: {} });
        localStorage.removeItem('lifeos');
        alert('All data cleared. Refreshing...');
        window.location.reload();
      }
    }
  };

  return (
    <div className="card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ margin: 0 }}>💾 Data</h2>
        <button
          onClick={() => setShowExport(!showExport)}
          style={{
            background: 'none',
            border: 'none',
            color: '#22c55e',
            fontSize: 12,
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          {showExport ? 'Hide' : 'Manage'}
        </button>
      </div>

      {showExport && (
        <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 8 }}>
          <button
            onClick={handleExport}
            style={{
              padding: '10px 16px',
              borderRadius: 10,
              border: '1px solid #22c55e',
              background: 'white',
              color: '#22c55e',
              fontSize: 13,
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all .15s',
            }}
          >
            📥 Export Backup (.json)
          </button>
          <button
            onClick={handleImport}
            style={{
              padding: '10px 16px',
              borderRadius: 10,
              border: '1px solid #22c55e',
              background: 'white',
              color: '#22c55e',
              fontSize: 13,
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            📤 Import Backup (.json)
          </button>
          <button
            onClick={handleReset}
            style={{
              padding: '10px 16px',
              borderRadius: 10,
              border: '1px solid #ef4444',
              background: 'white',
              color: '#ef4444',
              fontSize: 13,
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            🗑️ Reset All Data
          </button>
        </div>
      )}
    </div>
  );
}
