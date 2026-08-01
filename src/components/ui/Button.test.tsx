import { render, screen } from "@testing-library/react";
import { Button, composeButtonClasses } from "./Button";

describe("composeButtonClasses", () => {
  it("includes the accent background for the primary variant", () => {
    expect(composeButtonClasses({ variant: "primary" })).toContain("bg-accent");
  });

  it("uses a border rather than a fill for the outline variant", () => {
    const classes = composeButtonClasses({ variant: "outline" });
    expect(classes).toContain("border");
    expect(classes).not.toContain("bg-accent ");
  });

  it("appends caller classes last so they win", () => {
    expect(composeButtonClasses({ className: "w-full" })).toMatch(/w-full$/);
  });
});

describe("Button", () => {
  it("renders an anchor when given an href", () => {
    render(<Button href="https://example.com/try">Try it free</Button>);
    const link = screen.getByRole("link", { name: "Try it free" });
    expect(link).toHaveAttribute("href", "https://example.com/try");
  });

  it("renders a button element when given no href", () => {
    render(<Button onClick={() => {}}>Toggle</Button>);
    expect(screen.getByRole("button", { name: "Toggle" })).toBeInTheDocument();
  });
});
