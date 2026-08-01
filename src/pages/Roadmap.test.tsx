import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { Roadmap } from "./Roadmap";
import { LANES } from "@/content/roadmap";

describe("Roadmap", () => {
  it("renders a heading for every lane", () => {
    render(
      <MemoryRouter>
        <Roadmap />
      </MemoryRouter>,
    );
    for (const lane of LANES) {
      expect(
        screen.getByRole("heading", { name: new RegExp(lane.label, "i") }),
      ).toBeInTheDocument();
    }
  });
});
