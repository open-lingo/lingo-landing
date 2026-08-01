import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { Landing } from "./Landing";

describe("Landing", () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <Landing />
      </MemoryRouter>,
    );
  });

  it("renders exactly one h1", () => {
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
  });

  it("points the primary CTA at the app's preview lesson", () => {
    const ctas = screen.getAllByRole("link", { name: /try it free/i });
    expect(ctas.length).toBeGreaterThan(0);
    expect(ctas[0].getAttribute("href")).toContain("localhost:5173/try");
  });

  // The page links to /roadmap twice — once in the hero's language note, once
  // in the closing block — so this must be getAllByRole.
  it("links to the roadmap for features that are not built yet", () => {
    const links = screen.getAllByRole("link", { name: /roadmap/i });
    expect(links.length).toBeGreaterThan(0);
    for (const link of links) {
      expect(link).toHaveAttribute("href", "/roadmap");
    }
  });
});
