'use client';

import { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class MapErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: { componentStack?: string }) {
    // Report to console so we can find it in browser devtools
    console.error('[MapError]', error.message, info.componentStack);
    // Store in session so heartbeat can detect
    try {
      sessionStorage.setItem('map-error', JSON.stringify({
        message: error.message,
        stack: info.componentStack,
        time: new Date().toISOString(),
      }));
    } catch {}
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="flex items-center justify-center h-full w-full bg-gray-100 rounded-xl p-8 text-center">
          <div>
            <p className="text-red-500 font-semibold text-sm mb-2">⚠️ Map failed to load</p>
            <p className="text-gray-500 text-xs mb-4">Error: {this.state.error?.message || 'Unknown'}</p>
            <button
              onClick={() => { this.setState({ hasError: false, error: null }); window.location.reload(); }}
              className="px-4 py-2 bg-emerald-500 text-white rounded-lg text-xs font-medium hover:bg-emerald-600"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
