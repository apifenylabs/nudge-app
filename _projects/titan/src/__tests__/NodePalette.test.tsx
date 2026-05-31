import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import NodePalette from '@/components/sandbox/NodePalette';

describe('NodePalette', () => {
  const onDragStart = vi.fn();

  it('renders all 8 node items when rank S is unlocked', () => {
    render(<NodePalette onDragStart={onDragStart} unlockedRanks={['E', 'D', 'C', 'B', 'A', 'S']} />);

    expect(screen.getByText('Prompt Crafter')).toBeInTheDocument();
    expect(screen.getByText('Tool Weaver')).toBeInTheDocument();
    expect(screen.getByText('Memory Sage')).toBeInTheDocument();
    expect(screen.getByText('Agent Commander')).toBeInTheDocument();
    expect(screen.getByText('Knowledge Base')).toBeInTheDocument();
    expect(screen.getByText('Skill Slot')).toBeInTheDocument();
    expect(screen.getByText('Guardrail')).toBeInTheDocument();
    expect(screen.getByText('Progression XP')).toBeInTheDocument();
  });

  it('only shows unlocked nodes for E-rank (basic core/tools only)', () => {
    render(<NodePalette onDragStart={onDragStart} unlockedRanks={['E']} />);

    // Unlocked nodes should have draggable attribute
    const promptCrafter = screen.getByText('Prompt Crafter').closest('[draggable]');
    expect(promptCrafter).toHaveAttribute('draggable', 'true');

    // Locked nodes should show lock icons
    const lockIcons = screen.getAllByText('🔒');
    expect(lockIcons.length).toBeGreaterThanOrEqual(4);
  });

  it('shows locked indicators for rank-gated nodes at E-rank', () => {
    render(<NodePalette onDragStart={onDragStart} unlockedRanks={['E']} />);

    // Lock indicators should be visible
    const lockIcons = screen.getAllByText('🔒');
    expect(lockIcons.length).toBeGreaterThanOrEqual(4);
  });

  it('allows dragging unlocked nodes', () => {
    render(<NodePalette onDragStart={onDragStart} unlockedRanks={['E', 'D', 'C', 'B', 'A', 'S']} />);

    const promptCrafter = screen.getByText('Prompt Crafter');
    const draggableDiv = promptCrafter.closest('[draggable="true"]');
    expect(draggableDiv).toBeInTheDocument();
  });

  it('renders category filter buttons', () => {
    render(<NodePalette onDragStart={onDragStart} unlockedRanks={['E', 'D', 'C', 'B', 'A', 'S']} />);

    // Category buttons render with emoji prefix
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBe(5); // All, Core, Tools, Memory, Advanced

    // Check each button by name text
    expect(screen.getByRole('button', { name: /✨ All/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /core/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /tools/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /memory/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /advanced/i })).toBeInTheDocument();
  });

  it('filters nodes by category when a category button is clicked', () => {
    render(<NodePalette onDragStart={onDragStart} unlockedRanks={['E', 'D', 'C', 'B', 'A', 'S']} />);

    // Click "core" category button (has emoji prefix)
    fireEvent.click(screen.getByRole('button', { name: /core/i }));
    expect(screen.getByText('Prompt Crafter')).toBeInTheDocument();
    expect(screen.getByText('Skill Slot')).toBeInTheDocument();
    expect(screen.queryByText('Tool Weaver')).not.toBeInTheDocument();
    expect(screen.queryByText('Memory Sage')).not.toBeInTheDocument();
  });

  it('resets to all when toggling back from a category filter', () => {
    render(<NodePalette onDragStart={onDragStart} unlockedRanks={['E', 'D', 'C', 'B', 'A', 'S']} />);

    // Filter to memory
    fireEvent.click(screen.getByRole('button', { name: /memory/i }));
    expect(screen.getByText('Memory Sage')).toBeInTheDocument();
    expect(screen.getByText('Progression XP')).toBeInTheDocument();
    expect(screen.queryByText('Prompt Crafter')).not.toBeInTheDocument();

    // Back to all
    fireEvent.click(screen.getByRole('button', { name: /✨ All/i }));
    expect(screen.getByText('Prompt Crafter')).toBeInTheDocument();
    expect(screen.getByText('Memory Sage')).toBeInTheDocument();
    expect(screen.getByText('Tool Weaver')).toBeInTheDocument();
  });
});
