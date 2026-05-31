import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Button } from "./button";

describe("Button", () => {
  it("renders children", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText("Click me")).toBeInTheDocument();
  });

  it("applies default variant and size", () => {
    const { container } = render(<Button>Default</Button>);
    const btn = container.firstElementChild;
    expect(btn).toBeInTheDocument();
  });
});
