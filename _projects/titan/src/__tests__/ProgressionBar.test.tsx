import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ProgressionBar from '@/components/sandbox/ProgressionBar';

describe('ProgressionBar', () => {
  it('renders the current rank label', () => {
    render(<ProgressionBar currentRank="E" currentXp={50} />);
    expect(screen.getByText(/Novice/i)).toBeInTheDocument();
    expect(screen.getByText(/Rank E/i)).toBeInTheDocument();
  });

  it('shows XP progress percentage', () => {
    render(<ProgressionBar currentRank="E" currentXp={75} />);
    expect(screen.getByText('75%')).toBeInTheDocument();
  });

  it('shows XP counters — E rank (cumulative: 0 threshold)', () => {
    render(<ProgressionBar currentRank="E" currentXp={50} />);
    expect(screen.getByText('50 XP')).toBeInTheDocument();
    expect(screen.getByText('100 XP to next rank')).toBeInTheDocument();
  });

  it('shows next rank for non-max ranks', () => {
    render(<ProgressionBar currentRank="C" currentXp={250} />);
    expect(screen.getByText(/Next:/i)).toBeInTheDocument();
    expect(screen.getByText(/Hunter/)).toBeInTheDocument();
  });

  it('shows MAX RANK for rank S', () => {
    render(<ProgressionBar currentRank="S" currentXp={5000} />);
    expect(screen.getByText('MAX RANK')).toBeInTheDocument();
  });

  it('caps XP progress at 100% within rank', () => {
    render(<ProgressionBar currentRank="E" currentXp={150} />);
    // E rank threshold is 0 XP, D rank threshold is 100 XP
    // 150 XP means xpInRank=100 out of 100 needed = 100%
    expect(screen.getByText('100%')).toBeInTheDocument();
    expect(screen.getByText('100 XP')).toBeInTheDocument();
  });

  it('renders compact mode without section headings', () => {
    const { container } = render(
      <ProgressionBar currentRank="B" currentXp={500} compact />
    );
    // Compact mode shows [B] and XP bar inline
    expect(screen.getByText('[B]')).toBeInTheDocument();
    // No rank label in compact mode
    expect(container.querySelector('.rounded-xl')).toBeNull();
  });

  it('allows selecting the next rank when onRankSelect is provided', () => {
    const onSelect = vi.fn();
    render(<ProgressionBar currentRank="D" currentXp={125} onRankSelect={onSelect} />);

    // Current rank = D, so E (index 0) and D (current) should be clickable, C (next) too
    const rankCButton = screen.getByRole('button', { name: 'C' });
    expect(rankCButton).not.toBeDisabled();

    fireEvent.click(rankCButton);
    expect(onSelect).toHaveBeenCalledWith('C');
  });

  it('disables rank buttons beyond next rank', () => {
    render(<ProgressionBar currentRank="B" currentXp={500} onRankSelect={vi.fn()} />);
    // Rank A (index 4) is 2 steps ahead of B (index 3), should be visually disabled
    const rankAButton = screen.getByRole('button', { name: 'A' });
    expect(rankAButton.className).toContain('cursor-not-allowed');
    expect(rankAButton.className).toContain('opacity-40');
  });

  it('highlights the current rank badge', () => {
    render(<ProgressionBar currentRank="A" currentXp={1500} />);
    const rankAButton = screen.getByRole('button', { name: 'A' });
    expect(rankAButton.classList.contains('scale-110')).toBe(true);
  });
});
