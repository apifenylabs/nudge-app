import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import SandboxPage from '@/app/sandbox/page';

/* ─────────────────────────────────────────────────────────────
   SandboxPage integration tests
   Tests the full sandbox page with all panels rendered together:
   - NodePalette (left)
   - AgentStudio (center)
   - SandboxPreview (right)
   - ProgressionBar (header)
   ───────────────────────────────────────────────────────────── */

describe('SandboxPage', () => {
  it('renders the main page heading (h1)', () => {
    render(<SandboxPage />);
    const heading = screen.getByRole('heading', { name: /Agent Studio/i });
    expect(heading).toBeInTheDocument();
    expect(screen.getByText(/Build your AI agent army/i)).toBeInTheDocument();
  });

  it('renders the Titan navigation', () => {
    render(<SandboxPage />);
    expect(screen.getByText('Titan')).toBeInTheDocument();
    expect(screen.getByText('Features')).toBeInTheDocument();
    expect(screen.getByText('Pricing')).toBeInTheDocument();
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
  });

  it('renders the header rank selector buttons', () => {
    render(<SandboxPage />);

    // The header has rank buttons; ProgressionBar also has rank buttons
    // So use getAllByText to check at least one of each exists
    ['D', 'C', 'B', 'A', 'S'].forEach((rank) => {
      const matches = screen.getAllByText(rank);
      expect(matches.length).toBeGreaterThanOrEqual(1);
    });
    // E appears in the header label "Rank E" + ProgressBar button + the header button
    const eMatches = screen.getAllByText('E');
    expect(eMatches.length).toBeGreaterThanOrEqual(2);
  });

  it('renders the NodePalette panel with header', () => {
    render(<SandboxPage />);
    expect(screen.getByText('Node Palette')).toBeInTheDocument();
    expect(screen.getByText(/Drag nodes onto the canvas/i)).toBeInTheDocument();
  });

  it('renders the AgentStudio panel (span header)', () => {
    render(<SandboxPage />);
    // There are two "Agent Studio" instances — use getAllByText and check length
    const studioHeaders = screen.getAllByText('Agent Studio');
    expect(studioHeaders.length).toBe(2); // h1 page header + AgentStudio toolbar
  });

  it('renders the Preview panel', () => {
    render(<SandboxPage />);
    expect(screen.getByText('Preview')).toBeInTheDocument();
  });

  it('renders the ProgressionBar with rank E selected by default', () => {
    render(<SandboxPage />);
    expect(screen.getByText(/Novice/i)).toBeInTheDocument();
    expect(screen.getByText(/Rank E/i)).toBeInTheDocument();
  });

  it('renders the ProgressionBar XP indicator', () => {
    render(<SandboxPage />);
    // Starts at 0% — found in ProgressBar + maybe AgentStudio toolbar has "0 nodes"
    expect(screen.getAllByText('0%').length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText('0 XP')).toBeInTheDocument();
    expect(screen.getByText('100 XP needed')).toBeInTheDocument();
  });

  it('shows empty state in preview when no nodes exist', () => {
    render(<SandboxPage />);
    expect(screen.getByText(/Add nodes to the canvas/i)).toBeInTheDocument();
  });

  it('shows deploy button disabled when no nodes exist', () => {
    render(<SandboxPage />);
    const deployButton = screen.getByText('🚀 Deploy');
    expect(deployButton).toBeDisabled();
  });

  it('renders the footer text', () => {
    render(<SandboxPage />);
    expect(screen.getByText(/Titan Agent Studio/)).toBeInTheDocument();
    expect(screen.getByText(/Interactive Sandbox \+ Live Preview/i)).toBeInTheDocument();
  });

  it('can switch ranks by clicking rank buttons', () => {
    render(<SandboxPage />);

    // Click D rank button (the one in the header row, not ProgressionBar)
    const headerButtons = screen.getAllByText('D');
    fireEvent.click(headerButtons[0]);

    // ProgressionBar should update
    expect(screen.getByText(/Recruit/i)).toBeInTheDocument();

    // Click S rank button
    const sButtons = screen.getAllByText('S');
    fireEvent.click(sButtons[0]);
    expect(screen.getByText('MAX RANK')).toBeInTheDocument();
  });

  it('renders node palette items that are visible', () => {
    render(<SandboxPage />);
    // At E rank, these nodes should be visible in palette
    expect(screen.getByText('Prompt Crafter')).toBeInTheDocument();
    expect(screen.getByText('Tool Weaver')).toBeInTheDocument();
    expect(screen.getByText('Memory Sage')).toBeInTheDocument();
    expect(screen.getByText('Skill Slot')).toBeInTheDocument();
  });

  it('shows locked nodes in palette', () => {
    render(<SandboxPage />);
    // At default E rank, should have lock icons
    expect(screen.getByText('Agent Commander')).toBeInTheDocument();
    const locks = screen.getAllByText('🔒');
    expect(locks.length).toBeGreaterThanOrEqual(1);
  });

  it('unlocks more nodes at higher ranks', () => {
    render(<SandboxPage />);

    // Initially E rank — some nodes locked
    const eLocks = screen.getAllByText('🔒');
    const eLockCount = eLocks.length;

    // Switch to S rank
    const sButtons = screen.getAllByText('S');
    fireEvent.click(sButtons[0]);

    // At S rank, no nodes should be locked
    const sLocks = screen.queryAllByText('🔒');
    expect(sLocks.length).toBeLessThan(eLockCount);

    // All nodes should be unlocked now (S rank = full access)
    expect(screen.getAllByText('Guardrail').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Agent Commander').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Knowledge Base').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Progression XP').length).toBeGreaterThan(0);
  });

  it('maintains current rank highlighting on ProgressionBar when rank changes', () => {
    render(<SandboxPage />);

    // Click C rank
    const cButtons = screen.getAllByText('C');
    fireEvent.click(cButtons[0]);
    expect(screen.getByText(/Veteran/i)).toBeInTheDocument();
    expect(screen.getByText(/Rank C/i)).toBeInTheDocument();
  });
});
