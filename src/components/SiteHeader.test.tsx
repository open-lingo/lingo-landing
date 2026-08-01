import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router";
import { SiteHeader } from "./SiteHeader";

function renderHeader() {
  return render(
    <MemoryRouter>
      <SiteHeader />
    </MemoryRouter>,
  );
}

describe("SiteHeader", () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove("dark");
  });

  it("links to the roadmap and docs", () => {
    renderHeader();
    expect(screen.getByRole("link", { name: /roadmap/i })).toHaveAttribute(
      "href",
      "/roadmap",
    );
    expect(screen.getByRole("link", { name: /docs/i })).toHaveAttribute(
      "href",
      "/docs",
    );
  });

  it("sends the sign-in link to the app origin, not a site path", () => {
    renderHeader();
    const signIn = screen.getByRole("link", { name: /sign in/i });
    expect(signIn.getAttribute("href")).toContain("localhost:5173");
  });

  it("toggles the theme", async () => {
    renderHeader();
    await userEvent.click(screen.getByRole("button", { name: /theme/i }));
    expect(document.documentElement.classList.contains("dark")).toBe(true);
  });
});
