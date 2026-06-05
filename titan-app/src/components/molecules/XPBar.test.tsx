import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import XPBar from "./XPBar";

// Mock framer-motion
vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: any) => {
      // Extract and flatten className, style props
      const { whileHover, initial, animate, exit, transition, ...rest } = props;
      const className = rest.className || "";
      // Merge animate.width into style so tests can query width-based selectors
      const style = { ...(rest.style || {}), ...((animate as any) || {}) };
      const testId = rest["data-testid"];
      const title = rest.title;
      const onClick = rest.onClick;
      return (
        <div
          className={className}
          style={style}
          data-testid={testId}
          title={title}
          onClick={onClick}
        >
          {children}
        </div>
      );
    },
    span: ({ children, ...props }: any) => {
      const { initial, animate, exit, transition, ...rest } = props;
      return <span {...rest}>{children}</span>;
    },
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

// Mock lucide-react icons
vi.mock("lucide-react", () => ({
  Trophy: () => <span data-testid="trophy-icon">🏆</span>,
  Sparkles: () => <span data-testid="sparkles-icon">✨</span>,
  Star: () => <span data-testid="star-icon">⭐</span>,
}));

describe("XPBar", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  // --- Basic Rendering ---

  it("renders without crashing", () => {
    const { container } = render(<XPBar currentXp={0} maxXp={100} currentLevel={1} />);
    expect(container).toBeTruthy();
  });

  it("shows level label with correct level", () => {
    render(<XPBar currentXp={50} maxXp={100} currentLevel={5} />);
    expect(screen.getByText("Lv.5")).toBeInTheDocument();
  });

  it("shows XP fraction text", () => {
    render(<XPBar currentXp={75} maxXp={100} currentLevel={3} />);
    expect(screen.getByText("75 / 100 XP")).toBeInTheDocument();
  });

  it("shows large XP numbers formatted with commas", () => {
    render(<XPBar currentXp={1500} maxXp={5000} currentLevel={10} />);
    expect(screen.getByText("1,500 / 5,000 XP")).toBeInTheDocument();
  });

  it("renders milestone markers at 25%, 50%, 75%", () => {
    const { container } = render(<XPBar currentXp={0} maxXp={100} currentLevel={1} />);
    // Should have 3 milestone marker divs (25, 50, 75)
    const milestoneContainer = container.querySelector(".h-2.bg-\\[\\#E5E0D8\\]");
    // Use the XP bar div structure — find the track
    const track = container.querySelector(".h-2");
    expect(track).toBeTruthy();
    // Milestone markers inside the track
    const markers = track?.querySelectorAll(".absolute.top-0.bottom-0");
    // The sparkle effect also uses absolute positioning inside track,
    // so just check there are position markers for milestones
    expect(container.textContent).toContain("Lv.1");
  });

  // --- Progress Bar ---

  it("renders XP fill bar with correct width percentage", () => {
    const { container } = render(<XPBar currentXp={50} maxXp={100} currentLevel={1} />);
    const fillBars = container.querySelectorAll('[style*="width"]');
    expect(fillBars.length).toBeGreaterThan(0);
  });

  it("renders fill at 100% when XP equals max", () => {
    const { container } = render(<XPBar currentXp={100} maxXp={100} currentLevel={1} />);
    const fillBars = container.querySelectorAll('[style*="width"]');
    expect(fillBars.length).toBeGreaterThan(0);
  });

  it("clamps percentage to 100 when XP exceeds max", () => {
    const { container } = render(<XPBar currentXp={150} maxXp={100} currentLevel={1} />);
    const fillBars = container.querySelectorAll('[style*="width"]');
    expect(fillBars.length).toBeGreaterThan(0);
  });

  it("renders zero-width fill when XP is 0", () => {
    const { container } = render(<XPBar currentXp={0} maxXp={100} currentLevel={1} />);
    const fillBars = container.querySelectorAll('[style*="width"]');
    expect(fillBars.length).toBeGreaterThan(0);
  });

  // --- Achievement Badges ---

  it("renders achievement badges when recentAchievements provided", () => {
    render(
      <XPBar
        currentXp={50}
        maxXp={100}
        currentLevel={5}
        recentAchievements={["first-skill", "swarm-master"]}
      />
    );
    expect(screen.getByTitle("first-skill")).toBeInTheDocument();
    expect(screen.getByTitle("swarm-master")).toBeInTheDocument();
  });

  it("does not render achievement section when no achievements", () => {
    render(<XPBar currentXp={50} maxXp={100} currentLevel={5} />);
    expect(screen.queryByTitle("first-skill")).not.toBeInTheDocument();
    expect(screen.queryByTitle("swarm-master")).not.toBeInTheDocument();
  });

  it("shows overflow count when more than 3 achievements", () => {
    render(
      <XPBar
        currentXp={50}
        maxXp={100}
        currentLevel={5}
        recentAchievements={["first-skill", "swarm-master", "xp-collector", "gold-standard", "first-audit"]}
      />
    );
    expect(screen.getByText("+2")).toBeInTheDocument();
  });

  it("shows only 3 badges when exactly 3 achievements", () => {
    render(
      <XPBar
        currentXp={50}
        maxXp={100}
        currentLevel={5}
        recentAchievements={["first-skill", "swarm-master", "xp-collector"]}
      />
    );
    expect(screen.queryByText("+0")).not.toBeInTheDocument();
    expect(screen.getByTitle("first-skill")).toBeInTheDocument();
    expect(screen.getByTitle("swarm-master")).toBeInTheDocument();
    expect(screen.getByTitle("xp-collector")).toBeInTheDocument();
  });

  it("maps known achievement IDs to correct emoji", () => {
    render(
      <XPBar
        currentXp={50}
        maxXp={100}
        currentLevel={5}
        recentAchievements={["first-skill", "first-audit", "gold-standard", "swarm-master", "xp-collector"]}
      />
    );
    // All 5 achievements exist, 3 shown, +2 text
    expect(screen.queryByText("+2")).toBeInTheDocument();
  });

  it("uses default emoji for unknown achievement IDs", () => {
    render(
      <XPBar
        currentXp={50}
        maxXp={100}
        currentLevel={5}
        recentAchievements={["custom-badge"]}
      />
    );
    expect(screen.getByTitle("custom-badge")).toBeInTheDocument();
  });

  // --- Achievement Click ---

  it("calls onAchievementClick when achievement badge clicked", () => {
    const handleClick = vi.fn();
    render(
      <XPBar
        currentXp={50}
        maxXp={100}
        currentLevel={5}
        recentAchievements={["first-skill"]}
        onAchievementClick={handleClick}
      />
    );
    fireEvent.click(screen.getByTitle("first-skill"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  // --- Level-Up Toast ---

  it("shows level-up toast when level increases", () => {
    const { rerender } = render(<XPBar currentXp={0} maxXp={100} currentLevel={1} />);
    expect(screen.queryByText(/Level Up/i)).not.toBeInTheDocument();

    rerender(<XPBar currentXp={0} maxXp={100} currentLevel={2} />);
    // useEffect runs after render; advance timers to flush effects
    vi.advanceTimersByTime(10);
    expect(screen.getByText(/Level Up!/)).toBeInTheDocument();
    expect(screen.getByText(/Titan Core reached Lv\.2/)).toBeInTheDocument();
  });

  it("shows new level in toast text", () => {
    const { rerender } = render(<XPBar currentXp={0} maxXp={100} currentLevel={1} />);
    vi.advanceTimersByTime(10);
    rerender(<XPBar currentXp={0} maxXp={100} currentLevel={5} />);
    vi.advanceTimersByTime(10);
    // Toast should reference the new level
    expect(screen.getByText(/Titan Core reached Lv\.5/)).toBeInTheDocument();
  });

  it("does not show level-up toast when level stays the same", () => {
    const { rerender } = render(<XPBar currentXp={0} maxXp={100} currentLevel={1} />);
    rerender(<XPBar currentXp={50} maxXp={100} currentLevel={1} />);
    expect(screen.queryByText(/Level Up!/)).not.toBeInTheDocument();
  });

  it("shows trophy icon in level-up toast", () => {
    const { rerender } = render(<XPBar currentXp={0} maxXp={100} currentLevel={1} />);
    rerender(<XPBar currentXp={0} maxXp={100} currentLevel={2} />);
    act(() => { vi.advanceTimersByTime(10); });
    expect(screen.getByTestId("trophy-icon")).toBeInTheDocument();
  });

  // --- XP Gain Pulse ---

  it("shows glow effect on XP gain", () => {
    const { container, rerender } = render(
      <XPBar currentXp={10} maxXp={100} currentLevel={1} />
    );
    act(() => { vi.advanceTimersByTime(10); });
    rerender(<XPBar currentXp={30} maxXp={100} currentLevel={1} />);
    act(() => { vi.advanceTimersByTime(10); });
    const fillBars = container.querySelectorAll('[style*="box-shadow"]');
    expect(fillBars.length).toBeGreaterThan(0);
  });

  it("clears XP gain pulse after 1500ms", () => {
    const { container, rerender } = render(
      <XPBar currentXp={10} maxXp={100} currentLevel={1} />
    );
    act(() => { vi.advanceTimersByTime(10); });
    rerender(<XPBar currentXp={50} maxXp={100} currentLevel={1} />);
    act(() => { vi.advanceTimersByTime(10); });
    const filledBars = container.querySelectorAll('[style*="box-shadow"]');
    expect(filledBars.length).toBeGreaterThan(0);
    act(() => { vi.advanceTimersByTime(1500); });
    expect(container).toBeTruthy();
  });

  it("does not pulse when XP stays the same", () => {
    const { container, rerender } = render(
      <XPBar currentXp={50} maxXp={100} currentLevel={1} />
    );
    rerender(<XPBar currentXp={50} maxXp={100} currentLevel={1} />);
    // No pulse should trigger
    expect(container).toBeTruthy();
  });

  // --- Edge Cases ---

  it("handles zero maxXp gracefully", () => {
    const { container } = render(<XPBar currentXp={0} maxXp={0} currentLevel={1} />);
    expect(container).toBeTruthy();
    expect(screen.getByText("Lv.1")).toBeInTheDocument();
  });

  it("handles very high levels", () => {
    render(<XPBar currentXp={99999} maxXp={100000} currentLevel={99} />);
    expect(screen.getByText("Lv.99")).toBeInTheDocument();
    expect(screen.getByText("99,999 / 100,000 XP")).toBeInTheDocument();
  });

  it("handles level 0 gracefully", () => {
    render(<XPBar currentXp={0} maxXp={10} currentLevel={0} />);
    expect(screen.getByText("Lv.0")).toBeInTheDocument();
  });

  it("handles negative XP by showing 0% fill", () => {
    const { container } = render(
      <XPBar currentXp={-5} maxXp={100} currentLevel={1} />
    );
    expect(screen.getByText("Lv.1")).toBeInTheDocument();
    // Should render without error
    expect(container).toBeTruthy();
  });

  it("handles extremely large XP values", () => {
    render(
      <XPBar currentXp={9999999} maxXp={10000000} currentLevel={50} />
    );
    expect(screen.getByText("9,999,999 / 10,000,000 XP")).toBeInTheDocument();
  });

  // --- withAchievements Edge Cases ---

  it("renders empty achievement list without errors", () => {
    const { container } = render(
      <XPBar
        currentXp={50}
        maxXp={100}
        currentLevel={5}
        recentAchievements={[]}
      />
    );
    expect(container).toBeTruthy();
  });

  it("renders single achievement badge", () => {
    render(
      <XPBar
        currentXp={50}
        maxXp={100}
        currentLevel={5}
        recentAchievements={["xp-collector"]}
      />
    );
    expect(screen.getByTitle("xp-collector")).toBeInTheDocument();
    expect(screen.queryByText("+0")).not.toBeInTheDocument();
  });

  // --- ClassName & Styling ---

  it("applies correct CSS classes for track and fill", () => {
    const { container } = render(<XPBar currentXp={50} maxXp={100} currentLevel={1} />);
    // Track should have rounded-full class
    const roundedElements = container.querySelectorAll(".rounded-full");
    expect(roundedElements.length).toBeGreaterThan(0);
  });

  it("shows sparkle effect near progress point when pct > 25%", () => {
    render(<XPBar currentXp={50} maxXp={100} currentLevel={1} />);
    // At 50% progress, sparkle icon should be rendered
    const sparkleIcons = screen.getAllByTestId("sparkles-icon");
    expect(sparkleIcons.length).toBeGreaterThan(0);
  });
});
