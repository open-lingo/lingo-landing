import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router";
import { DocPage } from "./DocPage";

function renderAt(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/docs/:slug" element={<DocPage />} />
      </Routes>
    </MemoryRouter>,
  );
}

describe("DocPage", () => {
  it("renders the doc title as the h1", () => {
    renderAt("/docs/flashcards");
    expect(
      screen.getByRole("heading", { level: 1, name: /flashcards and reviews/i }),
    ).toBeInTheDocument();
  });

  it("renders the markdown body as real headings", () => {
    renderAt("/docs/flashcards");
    expect(
      screen.getByRole("heading", { level: 2, name: /the four ratings/i }),
    ).toBeInTheDocument();
  });

  it("shows a not-found message for an unknown slug", () => {
    renderAt("/docs/nope");
    expect(screen.getByText(/not found/i)).toBeInTheDocument();
  });
});
