import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ProgressionPage from '@/app/progression/page';

beforeEach(() => {
  vi.clearAllMocks();
  // Mock localStorage
  const store: Record<string, string> = {};
  vi.spyOn(Storage.prototype, 'getItem').mockImplementation((key: string) => store[key] ?? null);
  vi.spyOn(Storage.prototype, 'setItem').mockImplementation((key: string, value: string) => {
    store[key] = value;
  });

  // Mock IntersectionObserver as a proper constructor
  class MockIntersectionObserver {
    readonly root: Element | Document | null = null;
    readonly rootMargin: string = '';
    readonly thresholds: ReadonlyArray<number> = [0];
    constructor(_cb: IntersectionObserverCallback, _opts?: IntersectionObserverInit) {}
    observe = vi.fn();
    disconnect = vi.fn();
    unobserve = vi.fn();
    takeRecords = (): IntersectionObserverEntry[] => [];
  }
  vi.stubGlobal('IntersectionObserver', MockIntersectionObserver);
});

describe('ProgressionPage', () => {
  it('renders the page title', () => {
    render(<ProgressionPage />);
    // The page heading contains 'Evolution Stages' as part of the heading
    expect(screen.getByText('Evolution')).toBeInTheDocument();
    const h1 = document.querySelector('h1');
    expect(h1?.textContent).toContain('Evolution');
    expect(h1?.textContent).toContain('Stages');
  });

  it('shows all six rank stages in the carousel', () => {
    render(<ProgressionPage />);
    expect(screen.getByText('E · Novice')).toBeInTheDocument();
    expect(screen.getByText('D · Recruit')).toBeInTheDocument();
    expect(screen.getByText('C · Veteran')).toBeInTheDocument();
    expect(screen.getByText('B · Hunter')).toBeInTheDocument();
    expect(screen.getByText('A · Elite')).toBeInTheDocument();
    expect(screen.getByText('S · Sovereign')).toBeInTheDocument();
  });

  it('shows CTA buttons linking to sandbox and features', () => {
    render(<ProgressionPage />);
    const studioLink = screen.getByText(/Start Building in Agent Studio/);
    expect(studioLink).toBeInTheDocument();
    expect(studioLink.closest('a')).toHaveAttribute('href', '/sandbox');

    const featuresLink = screen.getByText('View All Features');
    expect(featuresLink).toBeInTheDocument();
    expect(featuresLink.closest('a')).toHaveAttribute('href', '/features');
  });

  it('shows tutorial tour on first visit after mount delay', async () => {
    render(<ProgressionPage />);
    // The tutorial appears after a 600ms mount delay
    const skipBtn = await screen.findByText('Skip tour', {}, { timeout: 1500 });
    expect(skipBtn).toBeInTheDocument();
  });

  it('hides tutorial after completion', async () => {
    render(<ProgressionPage />);
    // Wait for tutorial to appear
    await screen.findByText('Skip tour', {}, { timeout: 1500 });

    // Click through all 4 steps
    const nextBtn = screen.getByText('Next');
    fireEvent.click(nextBtn);
    fireEvent.click(nextBtn);
    fireEvent.click(nextBtn);
    const doneBtn = await screen.findByText('Done 🎉', {}, { timeout: 500 });
    fireEvent.click(doneBtn);

    // After completion, 'Skip tour' should be gone
    await vi.waitFor(() => {
      expect(screen.queryByText('Skip tour')).not.toBeInTheDocument();
    }, { timeout: 500 });
  });

  it('shows flavour text for each stage', () => {
    render(<ProgressionPage />);
    expect(screen.getByText(/Every legend begins/)).toBeInTheDocument();
  });

  it('includes nav links to other pages', () => {
    render(<ProgressionPage />);
    expect(screen.getByText('Features')).toBeInTheDocument();
    expect(screen.getByText('Agent Studio')).toBeInTheDocument();
    expect(screen.getByText('Pricing')).toBeInTheDocument();
  });

  it('shows XP requirements for each tier', () => {
    render(<ProgressionPage />);
    expect(screen.getByText('100 XP')).toBeInTheDocument();
    expect(screen.getByText('3,850 XP')).toBeInTheDocument();
  });

  it('renders the help button that reopens tutorial', () => {
    render(<ProgressionPage />);
    const helpBtn = screen.getByText('Help');
    expect(helpBtn).toBeInTheDocument();
  });
});
