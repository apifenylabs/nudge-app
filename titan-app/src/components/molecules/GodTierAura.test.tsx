import { describe, it, expect, vi } from "vitest";
import { render } from "@testing-library/react";
import GodTierAura from "../molecules/GodTierAura";

// Mock `window`-based keyframe injection since jsdom doesn't support it
beforeEach(() => {
  // Clear any injected keyframe style between tests
  document.head.innerHTML = "";
  // jsdom doesn't run animation frames — we just verify structure
});

describe("GodTierAura", () => {
  it("renders nothing when level < 30", () => {
    const { container } = render(<GodTierAura level={15} />);
    // Should be empty fragment
    expect(container.innerHTML).toBe("");
  });

  it("renders nothing when level is exactly 29", () => {
    const { container } = render(<GodTierAura level={29} />);
    expect(container.innerHTML).toBe("");
  });

  it("renders aura elements when level >= 30", () => {
    const { container } = render(<GodTierAura level={30} />);
    // Should not be empty
    expect(container.innerHTML.length).toBeGreaterThan(0);
    // Should have the aria-hidden attribute
    const root = container.firstElementChild;
    expect(root).toHaveAttribute("aria-hidden", "true");
  });

  it("renders aura at level 100 (boundary)", () => {
    const { container } = render(<GodTierAura level={100} />);
    expect(container.innerHTML.length).toBeGreaterThan(0);
  });

  it("accepts custom size prop", () => {
    const { container } = render(<GodTierAura level={30} size={400} />);
    const root = container.firstElementChild;
    expect(root?.getAttribute("style")).toContain("400px");
  });

  it("accepts custom pulseDuration prop", () => {
    const { container } = render(<GodTierAura level={30} pulseDuration={5} />);
    // The keyframes injection happens via the style element
    expect(container.innerHTML.length).toBeGreaterThan(0);
  });

  it("accepts custom particleCount prop", () => {
    const { container } = render(<GodTierAura level={30} particleCount={6} />);
    expect(container.innerHTML.length).toBeGreaterThan(0);
  });

  it("merges additional className", () => {
    const { container } = render(
      <GodTierAura level={30} className="my-custom-class" />
    );
    const root = container.firstElementChild;
    expect(root).toHaveClass("my-custom-class");
  });

  it("injects keyframe style element on first render", () => {
    render(<GodTierAura level={30} />);
    const keyframeStyle = document.getElementById("god-tier-aura-keyframes-v2");
    expect(keyframeStyle).not.toBeNull();
    expect(keyframeStyle?.tagName).toBe("STYLE");
    expect(keyframeStyle?.textContent).toContain("@keyframes aura-pulse");
    expect(keyframeStyle?.textContent).toContain("@keyframes aura-orbit");
    expect(keyframeStyle?.textContent).toContain("@keyframes aura-tail");
  });

  it("does not inject duplicate keyframe style on re-render", () => {
    render(<GodTierAura level={30} />);
    render(<GodTierAura level={30} />);
    const styles = document.querySelectorAll("#god-tier-aura-keyframes-v2");
    expect(styles.length).toBe(1);
  });

  it("injects keyframes only once across multiple instances", () => {
    const { container: c1 } = render(<GodTierAura level={30} />);
    render(<GodTierAura level={35} />);
    render(<GodTierAura level={99} />);
    const styles = document.querySelectorAll("#god-tier-aura-keyframes-v2");
    expect(styles.length).toBe(1);
  });

  it("renders radial glow layer", () => {
    const { container } = render(<GodTierAura level={30} />);
    // First child div should be the radial glow — has rounded-full class
    const glowDiv = container.firstElementChild?.firstElementChild;
    expect(glowDiv?.className).toContain("rounded-full");
  });

  it("renders concentric rotating rings", () => {
    const { container } = render(<GodTierAura level={30} />);
    const children = container.firstElementChild?.children || [];
    // Find rings (they have border style)
    let ringCount = 0;
    for (let i = 0; i < children.length; i++) {
      const el = children[i];
      if (
        el instanceof HTMLElement &&
        (el.style.border || el.getAttribute("style")?.includes("border"))
      ) {
        ringCount++;
      }
    }
    expect(ringCount).toBeGreaterThanOrEqual(2);
  });

  it("renders orbiting particles", () => {
    const { container } = render(<GodTierAura level={30} particleCount={12} />);
    const inner = container.firstElementChild;
    // Count particle elements (divs with background style set individually)
    const allChildren = inner?.querySelectorAll("div") || [];
    // Should have glow, glow2, ring1, ring2, corePulse + particles (each with trail + main) 
    expect(allChildren.length).toBeGreaterThan(10);
  });

  it("renders central core shimmer", () => {
    const { container } = render(<GodTierAura level={30} />);
    const allDivs = container.querySelectorAll("div");
    // Find the core shimmer (smallest div with radial-gradient background)
    let foundCore = false;
    allDivs.forEach((div) => {
      const bg = div.style.background || "";
      if (bg.includes("radial-gradient") && (bg.includes("255,215,0") || bg.includes("255, 215, 0"))) {
        foundCore = true;
      }
    });
    expect(foundCore).toBe(true);
  });

  it("passes extra HTML attributes to root element", () => {
    const { container } = render(
      <GodTierAura level={30} data-testid="god-aura" />
    );
    expect(container.firstElementChild).toHaveAttribute(
      "data-testid",
      "god-aura"
    );
  });
});
