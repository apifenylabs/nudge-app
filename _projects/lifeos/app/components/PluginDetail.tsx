'use client';

import { type LifeOSPlugin, type LifeCategory, type PluginPhase } from '../lib/plugins';

interface Props {
  plugin: LifeOSPlugin;
  plugins: LifeOSPlugin[];
  onCompleteTask: (cat: LifeCategory, phase: PluginPhase, taskId: string) => void;
  onSelectPlugin: (plugin: LifeOSPlugin) => void;
}

const phaseEmojis: Record<PluginPhase, string> = {
  research: '🔍',
  canvas: '🎨',
  build: '🔧',
  ship: '🚀',
  maintain: '🔄',
};

const phaseLabels: Record<PluginPhase, string> = {
  research: 'Research',
  canvas: 'Canvas',
  build: 'Build',
  ship: 'Ship',
  maintain: 'Maintain',
};

const phaseDescriptions: Record<PluginPhase, string> = {
  research: 'Learn the lay of the land',
  canvas: 'Design your approach',
  build: 'Make it real',
  ship: 'Launch and share',
  maintain: 'Keep it running',
};

export default function PluginDetail({ plugin, plugins, onCompleteTask, onSelectPlugin }: Props) {
  const totalTasks = plugin.phases.reduce((t, p) => t + p.tasks.length, 0);
  const doneTasks = plugin.phases.reduce((t, p) => t + p.tasks.filter(t => t.done).length, 0);

  return (
    <div>
      {/* Plugin selector bar */}
      {plugins.length > 1 && (
        <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
          {plugins.map(p => (
            <button
              key={p.id}
              onClick={() => onSelectPlugin(p)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap border transition-all ${
                p.id === plugin.id
                  ? 'bg-gray-900 text-white border-gray-900'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
              }`}
            >
              <span>{p.emoji}</span>
              {p.name}
            </button>
          ))}
        </div>
      )}

      {/* Plugin header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-4xl">{plugin.emoji}</span>
          <div>
            <h2 className="text-xl font-bold text-gray-900">{plugin.name}</h2>
            <p className="text-sm text-gray-500">{plugin.description}</p>
          </div>
        </div>

        {/* Overall progress */}
        <div className="mt-4">
          <div className="flex items-center justify-between text-sm mb-1.5">
            <span className="font-medium text-gray-700">Overall Progress</span>
            <span className="text-gray-500">{doneTasks}/{totalTasks} tasks</span>
          </div>
          <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{
                width: `${plugin.overallProgress}%`,
                background: `linear-gradient(90deg, ${plugin.color}, ${plugin.color}cc)`,
              }}
            />
          </div>
          <div className="flex items-center justify-between mt-1">
            <span className="text-xs text-gray-400">{doneTasks} of {totalTasks} completed</span>
            <span className="text-xs font-semibold text-gray-900">{plugin.overallProgress}%</span>
          </div>
        </div>
      </div>

      {/* Phase cards */}
      <div className="space-y-5">
        {plugin.phases.map((phase, i) => (
          <div
            key={phase.phase}
            className={`rounded-xl border p-5 transition-all ${
              phase.completed
                ? 'bg-green-50 border-green-200'
                : phase.progress > 0
                  ? 'bg-white border-gray-200'
                  : 'bg-white border-gray-100'
            }`}
          >
            {/* Phase header */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-lg">{phaseEmojis[phase.phase]}</span>
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm">{phaseLabels[phase.phase]}</h3>
                  <p className="text-[11px] text-gray-400">{phaseDescriptions[phase.phase]}</p>
                </div>
                {phase.completed && (
                  <span className="text-[10px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 ml-2">
                    ✓ Done
                  </span>
                )}
              </div>
              <span className="text-xs font-mono text-gray-400">{phase.progress}%</span>
            </div>

            {/* Phase progress bar */}
            <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden mb-4">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${phase.progress}%`,
                  background: phase.completed ? '#10B981' : plugin.color,
                }}
              />
            </div>

            {/* Tasks */}
            <div className="space-y-2">
              {phase.tasks.map((task) => (
                <label
                  key={task.id}
                  className={`flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-all ${
                    task.done
                      ? 'opacity-50 cursor-default'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={task.done}
                    disabled={task.done}
                    onChange={() => {
                      if (!task.done) {
                        onCompleteTask(plugin.category, phase.phase, task.id);
                      }
                    }}
                    className="mt-0.5 h-4 w-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500 disabled:opacity-50"
                  />
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium ${task.done ? 'line-through text-gray-400' : 'text-gray-900'}`}>
                      {task.label}
                    </p>
                    <p className={`text-xs mt-0.5 ${task.done ? 'text-gray-300' : 'text-gray-500'}`}>
                      {task.description}
                    </p>
                    {task.agentTrigger && (
                      <span className="inline-flex items-center gap-1 mt-1 text-[10px] font-mono text-teal-600 bg-teal-50 px-1.5 py-0.5 rounded">
                        agent trigger: {task.agentTrigger}
                      </span>
                    )}
                  </div>
                </label>
              ))}
            </div>

            {/* Continue button */}
            {!phase.completed && phase.progress > 0 && phase.progress < 100 && (
              <button
                onClick={() => {
                  const nextTask = phase.tasks.find(t => !t.done);
                  if (nextTask) onCompleteTask(plugin.category, phase.phase, nextTask.id);
                }}
                className="w-full mt-3 px-4 py-2 text-xs font-medium text-white rounded-lg transition-colors"
                style={{ backgroundColor: plugin.color }}
              >
                Continue Phase →
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
