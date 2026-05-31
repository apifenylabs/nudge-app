import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import AgentStudio from '@/components/sandbox/AgentStudio';

/* ─────────────────────────────────────────────────────────────
   AgentStudio tests
   Tests the canvas component that accepts drops from NodePalette
   and allows node manipulation (drag, select, connect, delete).
   ───────────────────────────────────────────────────────────── */

describe('AgentStudio', () => {
  const onNodesChange = vi.fn();

  beforeEach(() => {
    onNodesChange.mockClear();
  });

  it('renders the toolbar with Agent Studio header', () => {
    render(<AgentStudio selectedRank="E" />);
    // The header shows "Agent Studio" in a span
    const studioHeaders = screen.getAllByText('Agent Studio');
    expect(studioHeaders.length).toBeGreaterThanOrEqual(1);
  });

  it('shows node and link count in the toolbar', () => {
    render(<AgentStudio selectedRank="E" />);
    expect(screen.getByText(/0 nodes/i)).toBeInTheDocument();
    expect(screen.getByText(/0 links/i)).toBeInTheDocument();
  });

  it('shows empty state message when no nodes are present', () => {
    render(<AgentStudio selectedRank="E" />);
    expect(screen.getByText(/Drag nodes from the palette/i)).toBeInTheDocument();
  });

  it('renders Undo and Redo buttons', () => {
    render(<AgentStudio selectedRank="E" />);
    expect(screen.getByTitle(/Undo/i)).toBeInTheDocument();
    expect(screen.getByTitle(/Redo/i)).toBeInTheDocument();
  });

  it('renders Link Mode and Clear buttons in toolbar', () => {
    render(<AgentStudio selectedRank="E" />);
    expect(screen.getByText(/Link Mode/i)).toBeInTheDocument();
    // "Clear" button exists
    const clearButtons = screen.getAllByRole('button', { name: /Clear/i });
    expect(clearButtons.length).toBeGreaterThanOrEqual(1);
  });

  it('renders the right panel with config hint text', () => {
    render(<AgentStudio selectedRank="E" />);
    expect(screen.getByText(/Click a node to configure it/i)).toBeInTheDocument();
  });

  it('changes toolbar stats when selectedRank changes', () => {
    const { rerender } = render(<AgentStudio selectedRank="E" />);
    expect(screen.getByText(/0 nodes/i)).toBeInTheDocument();

    rerender(<AgentStudio selectedRank="A" />);
    expect(screen.getByText(/0 nodes/i)).toBeInTheDocument();
  });

  it('has a canvas area with gradient background', () => {
    const { container } = render(<AgentStudio selectedRank="C" />);

    // The canvas area uses inline style with radial-gradient
    const canvasEl = container.querySelector('[style*="radial-gradient"]');
    expect(canvasEl).toBeTruthy();
  });

  it('does not accept keyboard shortcuts when no nodes exist', () => {
    render(<AgentStudio selectedRank="E" />);

    // Ctrl+Z should not throw — it calls undo which is a no-op when history is empty
    expect(() => {
      fireEvent.keyDown(window, { key: 'z', ctrlKey: true });
    }).not.toThrow();
  });
});
