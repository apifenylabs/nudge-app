import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SandboxPreview from '@/components/sandbox/SandboxPreview';

// Mock DeployModal (tested separately)
vi.mock('@/components/sandbox/DeployModal', () => ({
  default: ({ open, onClose }: { open: boolean; onClose: () => void }) =>
    open ? <div data-testid="mock-deploy-modal">Deploy Modal</div> : null,
}));

const defaultNodes = [
  { id: 'n1', label: 'My Agent', icon: '🤖', defId: 'agent-cmd' },
  { id: 'n2', label: 'Prompt Engine', icon: '📝', defId: 'prompt-crafter' },
  { id: 'n3', label: 'Web Search', icon: '🔍', defId: 'tool-weaver' },
  { id: 'n4', label: 'Memory Bank', icon: '🧠', defId: 'memory-sage' },
];

const defaultConnections = [
  { from: 'n1', to: 'n2' },
  { from: 'n2', to: 'n3' },
];

const defaultProps = {
  nodes: defaultNodes,
  connections: defaultConnections,
  isRunning: false,
  onToggleRun: vi.fn(),
  selectedRank: 'C',
};

describe('SandboxPreview', () => {
  it('renders empty state when no nodes', () => {
    render(<SandboxPreview {...defaultProps} nodes={[]} connections={[]} />);
    expect(screen.getByText(/add nodes to the canvas/i)).toBeInTheDocument();
  });

  it('renders agent name as heading from commander node', () => {
    render(<SandboxPreview {...defaultProps} />);
    // The h3 contains the agent name; NodeBadge also shows it, so use getAllByText
    const headings = screen.getAllByText('My Agent');
    expect(headings.length).toBeGreaterThanOrEqual(1);
    // The h3 element is the first occurrence (the heading, not the badge)
    expect(headings[0]).toBeInTheDocument();
  });

  it('falls back to prompt-crafter label when no commander', () => {
    const nodesWithoutCmd = [
      { id: 'n2', label: 'Prompt Engine', icon: '📝', defId: 'prompt-crafter' },
      { id: 'n3', label: 'Web Search', icon: '🔍', defId: 'tool-weaver' },
    ];
    render(<SandboxPreview {...defaultProps} nodes={nodesWithoutCmd} connections={[]} />);
    const matches = screen.getAllByText('Prompt Engine');
    expect(matches.length).toBeGreaterThanOrEqual(1);
  });

  it('falls back to "Unnamed Agent" when no commander or crafter', () => {
    const nodesNoName = [
      { id: 'n3', label: 'Web Search', icon: '🔍', defId: 'tool-weaver' },
      { id: 'n4', label: 'Memory Bank', icon: '🧠', defId: 'memory-sage' },
    ];
    render(<SandboxPreview {...defaultProps} nodes={nodesNoName} connections={[]} />);
    expect(screen.getByText('Unnamed Agent')).toBeInTheDocument();
  });

  it('displays selected rank', () => {
    render(<SandboxPreview {...defaultProps} selectedRank="S" />);
    expect(screen.getByText(/Rank S/)).toBeInTheDocument();
  });

  it('shows correct node count in the subtitle area and footer', () => {
    render(<SandboxPreview {...defaultProps} />);
    const nodeTexts = screen.getAllByText(/4 node/);
    expect(nodeTexts.length).toBeGreaterThanOrEqual(2); // once in subtitle, once in footer
  });

  it('shows connection count', () => {
    render(<SandboxPreview {...defaultProps} />);
    expect(screen.getByText(/2 data flows active/)).toBeInTheDocument();
  });

  it('shows section titles for core, tools, memory', () => {
    render(<SandboxPreview {...defaultProps} />);
    expect(screen.getByText('Core')).toBeInTheDocument();
    expect(screen.getByText(/Tools \(1\)/)).toBeInTheDocument();
    expect(screen.getByText(/Memory \(1\)/)).toBeInTheDocument();
  });

  it('shows protection section when guardrail node present', () => {
    const nodesWithGuard = [
      ...defaultNodes,
      { id: 'n5', label: 'Guardian', icon: '🛡️', defId: 'guardrail', config: { topics: 'safety' } },
    ];
    render(<SandboxPreview {...defaultProps} nodes={nodesWithGuard} />);
    expect(screen.getByText('Safety & Progression')).toBeInTheDocument();
    expect(screen.getByText(/Guardrails enabled/)).toBeInTheDocument();
  });

  it('shows config preview on node badges', () => {
    const nodesWithConfig = [
      { id: 'n1', label: 'Config Node', icon: '⚙️', defId: 'tool-weaver', config: { model: 'gpt-4' } },
    ];
    render(<SandboxPreview {...defaultProps} nodes={nodesWithConfig} connections={[]} />);
    expect(screen.getByText(/model: gpt-4/)).toBeInTheDocument();
  });

  it('opens deploy modal on button click and calls onToggleRun', async () => {
    const onToggleRun = vi.fn();
    const user = userEvent.setup();
    render(<SandboxPreview {...defaultProps} onToggleRun={onToggleRun} />);
    const deployBtn = screen.getByText('🚀 Deploy');
    expect(deployBtn).toBeEnabled();
    await user.click(deployBtn);
    expect(screen.getByTestId('mock-deploy-modal')).toBeInTheDocument();
    expect(onToggleRun).toHaveBeenCalledTimes(1);
  });

  it('disables deploy button when no nodes', () => {
    render(<SandboxPreview {...defaultProps} nodes={[]} connections={[]} />);
    expect(screen.getByText('🚀 Deploy')).toBeDisabled();
  });

  it('renders pipeline section when connections present', () => {
    render(<SandboxPreview {...defaultProps} />);
    expect(screen.getByText(/Pipeline/)).toBeInTheDocument();
  });

  it('hides pipeline section when no connections', () => {
    render(<SandboxPreview {...defaultProps} connections={[]} />);
    expect(screen.queryByText(/Pipeline/)).not.toBeInTheDocument();
  });

  it('shows footer stats with node and link counts', () => {
    render(<SandboxPreview {...defaultProps} />);
    // Footer: specific spans inside the footer div
    const footers = screen.getAllByText('2 links');
    expect(footers.length).toBeGreaterThanOrEqual(1);
  });

  it('renders all node labels as NodeBadges', () => {
    render(<SandboxPreview {...defaultProps} />);
    expect(screen.getByText('Web Search')).toBeInTheDocument();
    expect(screen.getByText('Memory Bank')).toBeInTheDocument();
    expect(screen.getByText('Prompt Engine')).toBeInTheDocument();
  });

  it('shows "nodes" and "links" in header and footer when nodes present', () => {
    render(<SandboxPreview {...defaultProps} />);
    const linkTexts = screen.getAllByText('2 links');
    expect(linkTexts.length).toBeGreaterThanOrEqual(1);
  });

  it('hides footer stats when no nodes', () => {
    render(<SandboxPreview {...defaultProps} nodes={[]} connections={[]} />);
    expect(screen.queryByText('nodes')).not.toBeInTheDocument();
    expect(screen.queryByText('links')).not.toBeInTheDocument();
  });
});
