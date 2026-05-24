'use client';

import { useState, useEffect, useMemo } from 'react';
import {
  BUILTIN_PLUGINS,
  loadActivePlugins,
  saveActivePlugins,
  loadPluginOrder,
  savePluginOrder,
  type PluginDef,
  type PluginField,
  getActivePluginDefs,
} from '../data/plugins';

interface PluginManagerProps {
  onPluginsChange?: () => void;
}

const CATEGORIES = ['habit', 'goal', 'reflection', 'health_extra', 'social_extra', 'work_extra', 'learning', 'finance', 'mindfulness', 'content_creation', 'career', 'environment', 'habits_extra', 'nutrition', 'creativity', 'finance_invest', 'family_parenting'] as const;
const CATEGORY_LABELS: Record<string, { label: string; emoji: string }> = {
  habit: { label: 'Daily Habits', emoji: '✅' },
  goal: { label: 'Goals & Progress', emoji: '🏆' },
  reflection: { label: 'Reflection', emoji: '🙏' },
  health_extra: { label: 'Health Extras', emoji: '🩺' },
  social_extra: { label: 'Social Extras', emoji: '💬' },
  work_extra: { label: 'Work Extras', emoji: '🎯' },
  learning: { label: 'Learning & Growth', emoji: '📚' },
  finance: { label: 'Daily Finance', emoji: '💰' },
  mindfulness: { label: 'Mindfulness & Energy', emoji: '🧘' },
  content_creation: { label: 'Content & Writing', emoji: '✍️' },
  career: { label: 'Career & Growth', emoji: '💼' },
  environment: { label: 'Workspace & Env', emoji: '🖥️' },
  habits_extra: { label: 'Extra Habits', emoji: '📖' },
  nutrition: { label: 'Nutrition & Diet', emoji: '🥗' },
  creativity: { label: 'Creative Expression', emoji: '🎨' },
  finance_invest: { label: 'Finance & Investments', emoji: '📈' },
  family_parenting: { label: 'Family & Parenting', emoji: '👨‍👩‍👧‍👦' },
};

export default function PluginManager({ onPluginsChange }: PluginManagerProps) {
  const [activePluginIds, setActivePluginIds] = useState<string[]>([]);
  const [showPanel, setShowPanel] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | 'all'>('all');
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  useEffect(() => {
    setActivePluginIds(loadActivePlugins());
  }, []);

  const togglePlugin = (id: string) => {
    const next = activePluginIds.includes(id)
      ? activePluginIds.filter((p) => p !== id)
      : [...activePluginIds, id];
    setActivePluginIds(next);
    saveActivePlugins(next);
    onPluginsChange?.();
  };

  // Filtered + searched plugins
  const filteredPlugins = useMemo(() => {
    let result = [...BUILTIN_PLUGINS];
    
    // Category filter
    if (activeCategory !== 'all') {
      result = result.filter((p) => p.category === activeCategory);
    }
    
    // Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.emoji.includes(q) ||
          p.fields.some((f) => f.label.toLowerCase().includes(q))
      );
    }
    
    return result;
  }, [activeCategory, searchQuery]);

  // Plugin counts per category for badges
  const categoryCounts = useMemo(() => {
    const counts: Record<string, { total: number; active: number }> = {
      all: { total: BUILTIN_PLUGINS.length, active: activePluginIds.length },
    };
    CATEGORIES.forEach((cat) => {
      const total = BUILTIN_PLUGINS.filter((p) => p.category === cat).length;
      const active = BUILTIN_PLUGINS.filter((p) => p.category === cat && activePluginIds.includes(p.id)).length;
      counts[cat] = { total, active };
    });
    return counts;
  }, [activePluginIds]);

  // Active plugin names summary (in user-specified order)
  const activeSummary = useMemo(() => {
    const active = getActivePluginDefs();
    if (active.length === 0) return 'No plugins active';
    if (active.length <= 3) return active.map((p) => `${p.emoji} ${p.name}`).join(', ');
    return `${active.length} active plugins`;
  }, [activePluginIds]);

  // Detect categories that have suggested plugins
  const suggestedPlugins = useMemo(() => {
    return BUILTIN_PLUGINS.filter((p) => p.autoSuggest);
  }, []);

  if (!showPanel) {
    return (
      <div className="card" style={{ cursor: 'pointer' }} onClick={() => setShowPanel(true)}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: 6 }}>
            🧩 Plugins
            {activePluginIds.length > 0 && (
              <span style={{
                fontSize: 10,
                background: '#22c55e',
                color: 'white',
                borderRadius: 10,
                padding: '1px 7px',
                fontWeight: 700,
              }}>
                {activePluginIds.length}
              </span>
            )}
          </h2>
          <span style={{ fontSize: 12, color: '#22c55e', fontWeight: 600 }}>
            {activeSummary}
          </span>
        </div>
        {/* Quick status chips */}
        {activePluginIds.length > 0 && (
          <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginTop: 8 }}>
            {CATEGORIES.map((cat) => {
              const c = categoryCounts[cat];
              if (c.active === 0) return null;
              return (
                <span
                  key={cat}
                  style={{
                    fontSize: 10,
                    background: '#f0fdf4',
                    color: '#16a34a',
                    borderRadius: 12,
                    padding: '2px 8px',
                    fontWeight: 500,
                    border: '1px solid #bbf7d0',
                  }}
                >
                  {CATEGORY_LABELS[cat].emoji} {c.active}/{c.total}
                </span>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="card">
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <h2 style={{ margin: 0 }}>🧩 Plugin Manager</h2>
        <button
          onClick={() => setShowPanel(false)}
          style={{
            background: '#22c55e',
            border: 'none',
            color: 'white',
            fontSize: 12,
            fontWeight: 600,
            cursor: 'pointer',
            borderRadius: 8,
            padding: '6px 14px',
          }}
        >
          Done
        </button>
      </div>

      {/* Search */}
      <div style={{ marginBottom: 10 }}>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="🔍 Search plugins..."
          style={{
            width: '100%',
            border: '1px solid #e0e0e0',
            borderRadius: 10,
            padding: '8px 12px',
            fontSize: 13,
            outline: 'none',
          }}
          onFocus={(e) => (e.target.style.borderColor = '#22c55e')}
          onBlur={(e) => (e.target.style.borderColor = '#e0e0e0')}
        />
      </div>

      {/* Category filter tabs */}
      <div style={{
        display: 'flex',
        gap: 4,
        flexWrap: 'wrap',
        marginBottom: 12,
        borderBottom: '1px solid #f0f0f0',
        paddingBottom: 10,
      }}>
        {(['all', ...CATEGORIES] as const).map((cat) => {
          const c = categoryCounts[cat] || { total: 0, active: 0 };
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                fontSize: 11,
                padding: '4px 10px',
                borderRadius: 14,
                border: isActive ? '1px solid #22c55e' : '1px solid #e0e0e0',
                background: isActive ? '#f0fdf4' : 'transparent',
                color: isActive ? '#16a34a' : '#666',
                fontWeight: isActive ? 600 : 400,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
              }}
            >
              {cat === 'all' ? 'All' : `${CATEGORY_LABELS[cat].emoji} ${CATEGORY_LABELS[cat].label}`}
              <span style={{
                marginLeft: 4,
                fontSize: 9,
                background: isActive ? '#22c55e' : '#e0e0e0',
                color: isActive ? 'white' : '#888',
                borderRadius: 8,
                padding: '1px 5px',
              }}>
                {isActive ? c.active : c.total}
              </span>
            </button>
          );
        })}
      </div>

      {/* Suggested plugins banner (only when looking at 'all') */}
      {activeCategory === 'all' && suggestedPlugins.length > 0 && !searchQuery && (
        <div style={{
          background: 'linear-gradient(135deg, #f0fdf4, #ecfdf5)',
          borderRadius: 10,
          padding: '8px 12px',
          marginBottom: 12,
          border: '1px solid #bbf7d0',
        }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: '#16a34a', marginBottom: 4 }}>
            💡 Suggested for you
          </div>
          <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
            {suggestedPlugins.map((p) => {
              const alreadyActive = activePluginIds.includes(p.id);
              return (
                <button
                  key={p.id}
                  onClick={() => togglePlugin(p.id)}
                  style={{
                    fontSize: 11,
                    padding: '3px 8px',
                    borderRadius: 12,
                    border: alreadyActive ? '1px solid #22c55e' : '1px solid #d1d5db',
                    background: alreadyActive ? '#22c55e' : 'white',
                    color: alreadyActive ? 'white' : '#444',
                    fontWeight: 500,
                    cursor: 'pointer',
                    opacity: alreadyActive ? 1 : 0.8,
                  }}
                >
                  {alreadyActive ? '✓ ' : '+ '}{p.emoji} {p.name}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* No results */}
      {filteredPlugins.length === 0 && (
        <div style={{ textAlign: 'center', padding: '24px 0', color: '#999', fontSize: 13 }}>
          {searchQuery ? `No plugins match "${searchQuery}"` : 'No plugins in this category'}
        </div>
      )}

      {/* Plugin list with drag-to-reorder for active plugins */}
      {filteredPlugins.map((plugin, idx) => {
        const active = activePluginIds.includes(plugin.id);
        const categoryLabel = CATEGORY_LABELS[plugin.category]?.emoji || '';
        const isDragging = dragIndex === idx;
        const isDragOver = dragOverIndex === idx;
        
        return (
          <div
            key={plugin.id}
            onClick={() => {
              togglePlugin(plugin.id);
            }}
            draggable={active}
            onDragStart={(e) => {
              e.dataTransfer.effectAllowed = 'move';
              e.dataTransfer.setData('text/plain', plugin.id);
              setDragIndex(idx);
            }}
            onDragOver={(e) => {
              e.preventDefault();
              e.dataTransfer.dropEffect = 'move';
              setDragOverIndex(idx);
            }}
            onDragLeave={() => {
              setDragOverIndex((prev) => prev === idx ? null : prev);
            }}
            onDrop={(e) => {
              e.preventDefault();
              const draggedId = e.dataTransfer.getData('text/plain');
              if (draggedId && draggedId !== plugin.id && active) {
                // Reorder in activePluginIds preserving the drop position
                const currentOrder = loadPluginOrder();
                const allActive = getActivePluginDefs().map((p) => p.id);
                
                // Remove dragged item from current order
                const newOrder = allActive.filter((id) => id !== draggedId);
                // Insert at the drop target's position
                const targetIdx = newOrder.indexOf(plugin.id);
                newOrder.splice(targetIdx, 0, draggedId);
                
                savePluginOrder(newOrder);
                // Refresh display
                setActivePluginIds(loadActivePlugins());
                // Signal re-render to main page
                setTimeout(() => onPluginsChange?.(), 0);
              }
              setDragIndex(null);
              setDragOverIndex(null);
            }}
            onDragEnd={() => {
              setDragIndex(null);
              setDragOverIndex(null);
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '10px 12px',
              borderRadius: 10,
              marginBottom: 5,
              cursor: active ? 'grab' : 'pointer',
              background: isDragOver && active
                ? '#dcfce7'
                : active
                  ? '#f0fdf4'
                  : '#fafafa',
              border: isDragOver && active
                ? '2px dashed #22c55e'
                : active
                  ? '1px solid #22c55e'
                  : '1px solid #eee',
              transition: 'all .15s',
              opacity: isDragging ? 0.5 : 1,
            }}
          >
            {/* Drag handle (only for active plugins) */}
            {active && (
              <div style={{
                width: 18,
                height: 18,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 14,
                color: '#999',
                cursor: 'grab',
                flexShrink: 0,
                userSelect: 'none',
              }} title="Drag to reorder">
                ≡
              </div>
            )}

            {/* Checkbox */}
            <div style={{
              width: 22,
              height: 22,
              borderRadius: 6,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 12,
              fontWeight: 700,
              background: active ? '#22c55e' : '#e5e7eb',
              color: 'white',
              flexShrink: 0,
              transition: 'background .15s',
            }}>
              {active ? '✓' : ''}
            </div>

            {/* Plugin info */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <span style={{ fontSize: 13, fontWeight: 600 }}>
                  {plugin.emoji} {plugin.name}
                </span>
                {plugin.autoSuggest && (
                  <span style={{
                    fontSize: 9,
                    background: '#dbeafe',
                    color: '#2563eb',
                    borderRadius: 8,
                    padding: '1px 5px',
                    fontWeight: 600,
                  }}>
                    AI
                  </span>
                )}
                <span style={{
                  fontSize: 9,
                  color: '#999',
                  marginLeft: 'auto',
                }}>
                  {categoryLabel}
                </span>
              </div>
              <div style={{ fontSize: 11, color: '#888', marginTop: 1, lineHeight: 1.3 }}>
                {plugin.description}
              </div>
              <div style={{ fontSize: 10, color: '#aaa', marginTop: 2 }}>
                {plugin.fields.length} field{plugin.fields.length !== 1 ? 's' : ''}
                {plugin.fields.some((f) => f.type === 'text') && ' · ✏️ text'}
                {plugin.fields.some((f) => f.type === 'scale') && ' · 📊 scale'}
                {plugin.fields.some((f) => f.type === 'checkbox') && ' · ✅ checkbox'}
              </div>
            </div>
          </div>
        );
      })}

      {/* Summary footer */}
      <div style={{
        marginTop: 12,
        paddingTop: 10,
        borderTop: '1px solid #f0f0f0',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <span style={{ fontSize: 11, color: '#888' }}>
          {activePluginIds.length} of {BUILTIN_PLUGINS.length} active
        </span>
        <span style={{ fontSize: 10, color: '#bbb' }}>
          {activePluginIds.length > 0 && 'Drag ≡ to reorder · '}Plugins save automatically
        </span>
      </div>
    </div>
  );
}

// ── Plugin data renderer used inside the main page ──

interface PluginSectionProps {
  plugin: PluginDef;
  values: Record<string, number | boolean | string>;
  onChange: (fieldId: string, value: number | boolean | string) => void;
}

export function PluginSection({ plugin, values, onChange }: PluginSectionProps) {
  return (
    <div className="card" key={plugin.id} style={{ borderLeft: '3px solid #22c55e' }}>
      <h2 style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <span>{plugin.emoji}</span>
        <span>{plugin.name}</span>
        {plugin.autoSuggest && (
          <span style={{
            fontSize: 9,
            background: '#dbeafe',
            color: '#2563eb',
            borderRadius: 8,
            padding: '1px 5px',
            fontWeight: 600,
          }}>
            AI
          </span>
        )}
      </h2>
      <div style={{ fontSize: 11, color: '#888', marginBottom: 10 }}>
        {plugin.description}
      </div>

      {plugin.fields.map((field) => {
        const val = values[field.id] ?? field.default;

        if (field.type === 'checkbox') {
          return (
            <div key={field.id} style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '8px 0',
              borderBottom: '1px solid #f0f0f0',
            }}>
              <input
                type="checkbox"
                checked={!!val}
                onChange={(e) => onChange(field.id, e.target.checked)}
                style={{ width: 18, height: 18, accentColor: '#22c55e', cursor: 'pointer' }}
              />
              <label style={{ fontSize: 13, fontWeight: 500, cursor: 'pointer' }}>
                {field.label}
              </label>
            </div>
          );
        }

        if (field.type === 'scale' && field.min !== undefined && field.max !== undefined) {
          const numVal = typeof val === 'number' ? val : field.default as number;
          const pct = ((numVal - field.min) / (field.max - field.min)) * 100;
          return (
            <div key={field.id} style={{ padding: '8px 0', borderBottom: '1px solid #f0f0f0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <span style={{ fontSize: 12, fontWeight: 500 }}>{field.label}</span>
                <span style={{
                  fontSize: 12,
                  fontWeight: 700,
                  color: numVal > (field.max - field.min) / 2 ? '#22c55e' : numVal > 0 ? '#f59e0b' : '#ef4444',
                }}>
                  {numVal}
                </span>
              </div>
              <input
                type="range"
                min={field.min}
                max={field.max}
                step={field.step ?? 1}
                value={numVal}
                onChange={(e) => onChange(field.id, parseFloat(e.target.value))}
                style={{ width: '100%', accentColor: '#22c55e' }}
              />
            </div>
          );
        }

        if (field.type === 'text') {
          return (
            <div key={field.id} style={{ padding: '6px 0' }}>
              <div style={{ fontSize: 11, color: '#888', fontWeight: 600, marginBottom: 4 }}>
                {field.label}
              </div>
              <textarea
                value={typeof val === 'string' ? val : ''}
                onChange={(e) => onChange(field.id, e.target.value)}
                placeholder={field.label}
                maxLength={500}
                style={{
                  width: '100%',
                  border: '1px solid #e0e0e0',
                  borderRadius: 8,
                  padding: 8,
                  fontSize: 12,
                  fontFamily: 'inherit',
                  resize: 'vertical',
                  minHeight: 50,
                }}
                onFocus={(e) => (e.target.style.borderColor = '#22c55e')}
                onBlur={(e) => (e.target.style.borderColor = '#e0e0e0')}
              />
            </div>
          );
        }

        return null;
      })}
    </div>
  );
}
