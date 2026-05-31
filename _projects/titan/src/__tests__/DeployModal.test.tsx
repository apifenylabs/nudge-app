import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import DeployModal from '@/components/sandbox/DeployModal';

describe('DeployModal', () => {
  const mockNodes = [
    { id: 'n1', label: 'Prompt Crafter', icon: '✍️', defId: 'prompt-crafter' },
    { id: 'n2', label: 'Tool Weaver', icon: '🔧', defId: 'tool-weaver' },
  ];
  const mockConnections = [{ from: 'n1', to: 'n2' }];
  const onClose = vi.fn();

  it('renders nothing when closed', () => {
    const { container } = render(
      <DeployModal
        open={false}
        onClose={onClose}
        nodes={mockNodes}
        connections={mockConnections}
        selectedRank="C"
      />
    );
    expect(container.innerHTML).toBe('');
  });

  it('renders deployment UI when open', () => {
    render(
      <DeployModal
        open={true}
        onClose={onClose}
        nodes={mockNodes}
        connections={mockConnections}
        selectedRank="C"
      />
    );
    // Should show deployment header
    expect(screen.getByText('Deploying Agent')).toBeInTheDocument();
    expect(screen.getByText('Deploy Log')).toBeInTheDocument();
    expect(screen.getByText('Agent Topology')).toBeInTheDocument();
  });

  it('shows agent name based on nodes when agent-cmd is present', () => {
    const nodesWithCmd = [
      ...mockNodes,
      { id: 'n3', label: 'My Agent', icon: '🧠', defId: 'agent-cmd' },
    ];
    render(
      <DeployModal
        open={true}
        onClose={onClose}
        nodes={nodesWithCmd}
        connections={mockConnections}
        selectedRank="A"
      />
    );
    expect(screen.getByText(/My Agent/i)).toBeInTheDocument();
  });
});
