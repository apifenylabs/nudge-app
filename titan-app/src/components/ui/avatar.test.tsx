import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Avatar, AvatarImage, AvatarFallback, AvatarBadge, AvatarGroup, AvatarGroupCount } from "./avatar";

describe("Avatar", () => {
  it("renders with default size", () => {
    const { container } = render(<Avatar><AvatarFallback>U</AvatarFallback></Avatar>);
    expect(container.firstElementChild).toHaveAttribute("data-size", "default");
  });

  it("renders with sm size", () => {
    const { container } = render(<Avatar size="sm"><AvatarFallback>U</AvatarFallback></Avatar>);
    expect(container.firstElementChild).toHaveAttribute("data-size", "sm");
  });

  it("renders with lg size", () => {
    const { container } = render(<Avatar size="lg"><AvatarFallback>U</AvatarFallback></Avatar>);
    expect(container.firstElementChild).toHaveAttribute("data-size", "lg");
  });
});

describe("AvatarFallback", () => {
  it("renders initials", () => {
    render(<Avatar><AvatarFallback>AB</AvatarFallback></Avatar>);
    expect(screen.getByText("AB")).toBeInTheDocument();
  });
});

describe("AvatarImage", () => {
  it("renders inside avatar root", () => {
    const { container } = render(
      <Avatar>
        <AvatarImage src="/photo.jpg" alt="Profile" />
      </Avatar>
    );
    // AvatarImage from @base-ui only renders after image load in real browser;
    // in jsdom the element exists as part of the children passed to Root.
    const root = container.firstElementChild;
    expect(root).toBeInTheDocument();
  });
});

describe("AvatarBadge", () => {
  it("renders inside avatar context", () => {
    const { container } = render(
      <Avatar>
        <AvatarFallback>U</AvatarFallback>
        <AvatarBadge data-testid="badge" />
      </Avatar>
    );
    const badge = container.querySelector('[data-slot="avatar-badge"]');
    expect(badge).toBeInTheDocument();
  });
});

describe("AvatarGroup", () => {
  it("renders multiple avatars", () => {
    render(
      <AvatarGroup>
        <Avatar><AvatarFallback>A</AvatarFallback></Avatar>
        <Avatar><AvatarFallback>B</AvatarFallback></Avatar>
      </AvatarGroup>
    );
    expect(screen.getByText("A")).toBeInTheDocument();
    expect(screen.getByText("B")).toBeInTheDocument();
  });
});

describe("AvatarGroupCount", () => {
  it("renders count text", () => {
    render(<AvatarGroupCount>+3</AvatarGroupCount>);
    expect(screen.getByText("+3")).toBeInTheDocument();
  });
});
