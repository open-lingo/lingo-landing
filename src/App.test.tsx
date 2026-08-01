import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { App } from "./App";

describe("App", () => {
  it("renders the landing route at /", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>,
    );
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
  });

  it("renders a not-found page for an unknown route", () => {
    render(
      <MemoryRouter initialEntries={["/nope"]}>
        <App />
      </MemoryRouter>,
    );
    expect(screen.getByText(/page not found/i)).toBeInTheDocument();
  });
});
