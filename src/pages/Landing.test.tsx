import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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
    const ctas = screen.getAllByRole("link", { name: /try a lesson/i });
    expect(ctas.length).toBeGreaterThan(0);
    expect(ctas[0].getAttribute("href")).toContain("localhost:5173/try");
  });

  it("links to the roadmap for features that are not built yet", () => {
    const links = screen.getAllByRole("link", { name: /roadmap/i });
    expect(links.length).toBeGreaterThan(0);
    for (const link of links) {
      expect(link).toHaveAttribute("href", "/roadmap");
    }
  });

  it("shows the hero phrase with its reading annotations", () => {
    expect(screen.getByText("日本語")).toBeInTheDocument();
    expect(screen.getByText("nihongo")).toBeInTheDocument();
  });

  it("lets the visitor switch the hero language", async () => {
    await userEvent.click(screen.getByRole("button", { name: /show korean/i }));
    expect(screen.getByText("한국어")).toBeInTheDocument();
  });
});
