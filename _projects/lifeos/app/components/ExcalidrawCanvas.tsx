'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { ExcalidrawInitialDataState, ExcalidrawImperativeAPI } from '@excalidraw/excalidraw/types';
import {
  exportToCanvas as excalidrawExportToCanvas,
  exportToBlob as excalidrawExportToBlob,
  serializeAsJSON,
} from '@excalidraw/excalidraw';
import type { PluginDefinition } from '../lib/plugin-registry';

// Import Excalidraw CSS
import '@excalidraw/excalidraw/index.css';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type CanvasState = {
  /** The Excalidraw elements serialized as JSON string */
  sceneJSON: string | null;
  /** Timestamp of last save */
  savedAt: number | null;
};

type SaveCallback = (elements: any[], appState: any, files: any) => void;

// ---------------------------------------------------------------------------
// localStorage helpers
// ---------------------------------------------------------------------------

function getStorageKey(pluginId: string): string {
  return `lifeos-canvas-${pluginId}`;
}

function loadCanvasState(pluginId: string): CanvasState {
  try {
    const raw = localStorage.getItem(getStorageKey(pluginId));
    if (!raw) return { sceneJSON: null, savedAt: null };
    return JSON.parse(raw) as CanvasState;
  } catch {
    return { sceneJSON: null, savedAt: null };
  }
}

function saveCanvasState(pluginId: string, sceneJSON: string): void {
  const state: CanvasState = { sceneJSON, savedAt: Date.now() };
  try {
    localStorage.setItem(getStorageKey(pluginId), JSON.stringify(state));
  } catch (e) {
    console.warn('[ExcalidrawCanvas] localStorage write failed:', e);
  }
}

function removeCanvasState(pluginId: string): void {
  localStorage.removeItem(getStorageKey(pluginId));
}

// ---------------------------------------------------------------------------
// Dynamic import wrapper (client-only)
// ---------------------------------------------------------------------------

type ExcalidrawModule = typeof import('@excalidraw/excalidraw');
type ExcalidrawComponent = ExcalidrawModule extends { Excalidraw: infer C }
  ? C
  : never;

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

interface ExcalidrawCanvasProps {
  pluginId: string;
  sessionId: string | null;
  plugin: PluginDefinition;
  currentPhase?: string;
}

// ---------------------------------------------------------------------------
// Debounce utility
// ---------------------------------------------------------------------------

function useDebounce<T extends (...args: any[]) => void>(
  fn: T,
  delayMs: number,
): T {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const fnRef = useRef(fn);
  fnRef.current = fn;

  return useCallback(
    (...args: any[]) => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        fnRef.current(...args);
      }, delayMs);
    },
    [delayMs],
  ) as unknown as T;
}

// ---------------------------------------------------------------------------
// ExcalidrawCanvas
// ---------------------------------------------------------------------------

export default function ExcalidrawCanvas({
  pluginId,
  sessionId: _sessionId,
  plugin,
  currentPhase,
}: ExcalidrawCanvasProps) {
  const [ExcalidrawComponent, setExcalidrawComponent] =
    useState<React.ComponentType<any> | null>(null);
  const [initialData, setInitialData] = useState<ExcalidrawInitialDataState>({});
  const [ready, setReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const apiRef = useRef<ExcalidrawImperativeAPI | null>(null);
  const elementsRef = useRef<any[] | null>(null);
  const appStateRef = useRef<any>(null);
  const filesRef = useRef<any>(null);
  const lastSaveRef = useRef<string | null>(null);
  const pluginIdRef = useRef(pluginId);

  // Track plugin changes for reload
  const [currentPluginId, setCurrentPluginId] = useState(pluginId);

  // Track if canvas has been loaded (to prevent double-load)
  const loadedRef = useRef(false);

  // ─── Load Excalidraw dynamically (client-only) ──────────────
  useEffect(() => {
    let cancelled = false;
    import('@excalidraw/excalidraw')
      .then((mod) => {
        if (!cancelled) {
          setExcalidrawComponent(() => mod.Excalidraw);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          console.error('[ExcalidrawCanvas] Failed to load Excalidraw:', err);
          setError('Failed to load drawing canvas');
        }
      });
    return () => {
      cancelled = true;
    };
  }, []);

  // ─── Load saved scene when plugin changes ──────────────────
  useEffect(() => {
    if (pluginId !== currentPluginId) {
      setCurrentPluginId(pluginId);
      loadedRef.current = false;
    }
  }, [pluginId, currentPluginId]);

  useEffect(() => {
    if (!ExcalidrawComponent || !pluginId || loadedRef.current) return;

    const saved = loadCanvasState(pluginId);
    if (saved.sceneJSON) {
      try {
        const parsed = JSON.parse(saved.sceneJSON);
        setInitialData({
          elements: parsed.elements ?? [],
          appState: parsed.appState ?? {},
          files: parsed.files ?? {},
        });
      } catch {
        setInitialData({});
      }
    } else {
      setInitialData({});
    }
    loadedRef.current = true;
    setReady(true);
  }, [ExcalidrawComponent, pluginId]);

  // ─── Save callback (debounced 2s) ──────────────────────────
  const handleSave = useCallback(
    (elements: readonly any[], appState: any, files: any) => {
      elementsRef.current = [...elements];
      appStateRef.current = appState;
      filesRef.current = files;

      debouncedSave(elements, appState, files);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSave = useCallback(
    useDebounce(
      (elements: readonly any[], appState: any, files: any) => {
        if (!pluginId) return;
        try {
          const sceneJSON = serializeAsJSON(
            elements,
            appState,
            files,
            'local',
          );
          if (sceneJSON !== lastSaveRef.current) {
            saveCanvasState(pluginId, sceneJSON);
            lastSaveRef.current = sceneJSON;
          }
        } catch (e) {
          console.warn('[ExcalidrawCanvas] save failed:', e);
        }
      },
      2000,
    ),
    [pluginId],
  );

  // ─── Excalidraw API ref ─────────────────────────────────────
  const handleExcalidrawAPI = useCallback((api: ExcalidrawImperativeAPI) => {
    apiRef.current = api;
  }, []);

  // ─── Export JSON ────────────────────────────────────────────
  const handleExportJSON = useCallback(() => {
    const elements = elementsRef.current;
    const appState = appStateRef.current;
    const files = filesRef.current;
    if (!elements) return;

    try {
      const json = serializeAsJSON(elements, appState ?? {}, files ?? {}, 'local');
      const blob = new Blob([json], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `lifeos-canvas-${pluginId}.excalidraw.json`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error('[ExcalidrawCanvas] Export JSON failed:', e);
    }
  }, [pluginId]);

  // ─── Export PNG ─────────────────────────────────────────────
  const handleExportPNG = useCallback(async () => {
    const elements = elementsRef.current;
    const appState = appStateRef.current;
    const files = filesRef.current;
    if (!elements || !appState) return;

    try {
      const blob = await excalidrawExportToBlob({
        elements,
        appState,
        files,
        exportPadding: 10,
      });
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `lifeos-canvas-${pluginId}.png`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error('[ExcalidrawCanvas] Export PNG failed:', e);
    }
  }, [pluginId]);

  // ─── New Canvas ─────────────────────────────────────────────
  const handleNewCanvas = useCallback(async () => {
    if (!apiRef.current) return;
    try {
      apiRef.current.resetScene();
      removeCanvasState(pluginId);
      elementsRef.current = null;
      appStateRef.current = null;
      filesRef.current = null;
      lastSaveRef.current = null;
    } catch (e) {
      console.error('[ExcalidrawCanvas] Reset failed:', e);
    }
  }, [pluginId]);

  // ─── Render ─────────────────────────────────────────────────

  // Show loading state while Excalidraw hasn't loaded yet
  if (!ExcalidrawComponent || !ready) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-sm text-gray-400">
        <div className="w-6 h-6 border-2 border-teal-400 border-t-transparent rounded-full animate-spin mb-2" />
        Loading canvas...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-sm text-red-400 p-4">
        <p>{error}</p>
      </div>
    );
  }

  const phaseName =
    plugin.phases.find((p) => p.id === currentPhase)?.name ?? '';

  return (
    <div className="flex flex-col h-full">
      {/* ── Canvas Header ── */}
      <div className="flex items-center gap-1.5 px-3 py-2 border-b border-gray-100 shrink-0">
        <div className="w-5 h-5 rounded-lg bg-gradient-to-br from-teal-400 to-emerald-500 flex items-center justify-center">
          <svg
            className="w-3 h-3 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </div>
        <span className="text-xs font-semibold text-gray-700">Canvas</span>
        {phaseName && (
          <span className="text-[9px] text-gray-400 ml-1 font-mono truncate">
            · {phaseName}
          </span>
        )}

        <div className="ml-auto flex items-center gap-1">
          {/* Export JSON */}
          <button
            onClick={handleExportJSON}
            className="p-1 rounded hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
            title="Export as JSON"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </button>

          {/* Export PNG */}
          <button
            onClick={handleExportPNG}
            className="p-1 rounded hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
            title="Export as PNG"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </button>

          {/* New Canvas */}
          <button
            onClick={handleNewCanvas}
            className="p-1 rounded hover:bg-gray-100 text-gray-400 hover:text-red-500 transition-colors"
            title="New canvas"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* ── Plugin info bar ── */}
      <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 border-b border-gray-100 shrink-0">
        <span className="text-sm">{plugin.emoji}</span>
        <span className="text-[10px] font-semibold text-gray-600">
          {plugin.name}
        </span>
        {phaseName && (
          <span className="text-[9px] text-gray-400 ml-auto font-mono">
            Phase: {phaseName}
          </span>
        )}
      </div>

      {/* ── Excalidraw canvas container ── */}
      <div className="flex-1 overflow-hidden relative">
        <div className="absolute inset-0">
          <ExcalidrawComponent
            key={pluginId}
            initialData={initialData}
            onChange={handleSave as unknown as SaveCallback}
            excalidrawAPI={handleExcalidrawAPI}
            UIOptions={{
              canvasActions: {
                changeViewBackgroundColor: true,
                clearCanvas: true,
                export: false,
                loadScene: false,
                saveToActiveFile: false,
                saveAsImage: true,
                toggleTheme: true,
              },
              tools: {
                image: true,
              },
            }}
            viewModeEnabled={false}
            theme="light"
            name={`LifeOS Canvas - ${plugin.name}`}
          />
        </div>
      </div>
    </div>
  );
}
