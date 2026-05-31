import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Badge } from "./badge";

describe("Badge", () => {
  it("renders children", () => {
    render(<Badge>New</Badge>);
    expect(screen.getByText("New")).toBeInTheDocument();
  });

  it("renders as span by default", () => {
    const { container } = render(<Badge>Tag</Badge>);
    expect(container.firstElementChild?.tagName).toBe("SPAN");
  });

  it("accepts additional className", () => {
    const { container } = render(<Badge className="custom-badge">Tag</Badge>);
    expect(container.firstElementChild).toHaveClass("custom-badge");
  });
});
