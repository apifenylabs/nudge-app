'use client';

import { getAvailableCategories, type LifeOSState, type LifeCategory } from '../lib/plugins';

interface Props {
  state: LifeOSState;
  onActivate: (cat: LifeCategory) => void;
  onClose: () => void;
}

export default function PluginCatalog({ state, onActivate, onClose }: Props) {
  const catalog = getAvailableCategories();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Plugin Catalog</h2>
        <button onClick={onClose} className="text-sm text-gray-500 hover:text-gray-700">← Back</button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {catalog.map((cat) => {
          const isActive = state.plugins.some(p => p.category === cat.category);
          return (
            <button
              key={cat.category}
              onClick={() => {
                if (!isActive) onActivate(cat.category as LifeCategory);
                else onClose();
              }}
              className={`text-left p-5 rounded-xl border transition-all ${
                isActive
                  ? 'bg-white border-teal-200 shadow-sm'
                  : 'bg-white border-gray-200 hover:border-teal-300 hover:shadow-sm'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <span className="text-3xl">{cat.emoji}</span>
                {isActive && (
                  <span className="text-[10px] font-medium text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full border border-teal-200">
                    Active
                  </span>
                )}
              </div>
              <h3 className="font-semibold text-gray-900 text-sm mb-1">{cat.name}</h3>
              <p className="text-xs text-gray-500 mb-3 line-clamp-2">{cat.description}</p>
              <div className="flex items-center gap-2 text-[11px] text-gray-400">
                <span>5 phases</span>
                <span>·</span>
                <span>{isActive ? 'Open →' : 'Activate'}</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
