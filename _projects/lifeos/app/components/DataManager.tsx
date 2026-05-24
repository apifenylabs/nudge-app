'use client';

import { useState } from 'react';
import { loadFromLocalStorage, saveToLocalStorage, syncAllToSupabase, type LifeOSData, type DayEntry, getTrackerLabel } from '../lib/storage';
import { TRACKERS } from '../data/trackers';
import { BUILTIN_PLUGINS, type PluginDef } from '../data/plugins';

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

  const handleExportCSV = () => {
    const data = loadFromLocalStorage();
    const days = Object.entries(data.days ?? {}).sort(([a], [b]) => a.localeCompare(b));
    if (days.length === 0) {
      alert('No data to export.');
      return;
    }

    // Build headers: date + core trackers + all plugin fields
    const coreHeaders = ['Date', ...TRACKERS.map((t) => t.label), 'Notes'];
    const pluginFieldMap: Record<string, { pluginName: string; field: { id: string; label: string } }[]> = {};
    BUILTIN_PLUGINS.forEach((p) => {
      const pluginKeys: string[] = [];
      for (const day of days) {
        const dayPlugins = (day[1] as any)?.[`_plugin_${p.id}`];
        if (dayPlugins) {
          Object.keys(dayPlugins).forEach((fid) => {
            if (!pluginKeys.includes(fid)) pluginKeys.push(fid);
          });
        }
      }
      if (pluginKeys.length > 0) {
        pluginKeys.forEach((fid) => {
          const field = p.fields.find((f) => f.id === fid);
          const key = `${p.id}_${fid}`;
          if (!pluginFieldMap[key]) {
            pluginFieldMap[key] = [];
          }
          pluginFieldMap[key].push({ pluginName: p.name, field: field || { id: fid, label: fid } });
        });
      }
    });

    const pluginHeaders = Object.entries(pluginFieldMap).map(([key, entries]) => {
      return entries[0] ? `${entries[0].pluginName}: ${entries[0].field.label}` : key;
    });
    const headers = [...coreHeaders, ...pluginHeaders];

    // Build rows
    const rows = days.map(([date, entry]) => {
      const coreVals = [
        date,
        ...TRACKERS.map((t) => (entry[t.id as keyof DayEntry] ?? t.def).toString()),
        `"${(entry.notes || '').replace(/"/g, '""')}"`,
      ];
      const pluginVals = Object.keys(pluginFieldMap).map((key) => {
        const [pid, fid] = key.split('_') as [string, string];
        // Need to find the actual plugin id from the key
        const actualKey = Object.keys(pluginFieldMap).find((k) => k === key);
        if (!actualKey) return '';
        // Extract pid by trying all BUILTIN_PLUGINS ids
        for (const p of BUILTIN_PLUGINS) {
          const val = (entry as any)?.[`_plugin_${p.id}`]?.[fid];
          if (val !== undefined) {
            return typeof val === 'string' ? `"${val.replace(/"/g, '""')}"` : String(val);
          }
        }
        return '';
      });
      return [...coreVals, ...pluginVals].join(',');
    });

    const csv = [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `lifeos-export-${new Date().toISOString().split('T')[0]}.csv`;
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
            onClick={handleExportCSV}
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
            📊 Export CSV (Spreadsheet)
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
