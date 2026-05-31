import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, CardAction } from "./card";

describe("Card", () => {
  it("renders children", () => {
    render(<Card><p>Hello</p></Card>);
    expect(screen.getByText("Hello")).toBeInTheDocument();
  });

  it("applies default size attribute", () => {
    const { container } = render(<Card>Content</Card>);
    expect(container.firstElementChild).toHaveAttribute("data-size", "default");
  });

  it("applies sm size attribute", () => {
    const { container } = render(<Card size="sm">Content</Card>);
    expect(container.firstElementChild).toHaveAttribute("data-size", "sm");
  });

  it("accepts additional className", () => {
    const { container } = render(<Card className="custom-class">Content</Card>);
    expect(container.firstElementChild).toHaveClass("custom-class");
  });
});

describe("CardHeader", () => {
  it("renders children", () => {
    render(<CardHeader><h3>Title</h3></CardHeader>);
    expect(screen.getByText("Title")).toBeInTheDocument();
  });
});

describe("CardTitle", () => {
  it("renders text", () => {
    render(<CardTitle>Dashboard</CardTitle>);
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
  });
});

describe("CardDescription", () => {
  it("renders description text", () => {
    render(<CardDescription>A short summary</CardDescription>);
    expect(screen.getByText("A short summary")).toBeInTheDocument();
  });
});

describe("CardContent", () => {
  it("renders children", () => {
    render(<CardContent><span>inner</span></CardContent>);
    expect(screen.getByText("inner")).toBeInTheDocument();
  });
});

describe("CardFooter", () => {
  it("renders children", () => {
    render(<CardFooter><button>Save</button></CardFooter>);
    expect(screen.getByText("Save")).toBeInTheDocument();
  });
});

describe("CardAction", () => {
  it("renders children", () => {
    render(<CardAction><button>X</button></CardAction>);
    expect(screen.getByText("X")).toBeInTheDocument();
  });
});
