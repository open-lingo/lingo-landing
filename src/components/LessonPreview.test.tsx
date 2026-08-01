import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LessonPreview } from "./LessonPreview";

describe("LessonPreview", () => {
  it("shows the prompt word and its reading", () => {
    render(<LessonPreview />);
    expect(screen.getByText("こんにちは")).toBeInTheDocument();
    expect(screen.getByText("konnichiwa")).toBeInTheDocument();
  });

  it("confirms a correct answer", async () => {
    render(<LessonPreview />);
    await userEvent.click(
      screen.getByRole("button", { name: /hello \/ good afternoon/i }),
    );
    expect(screen.getByText(/correct/i)).toBeInTheDocument();
  });

  it("tells the visitor a wrong answer comes back sooner", async () => {
    render(<LessonPreview />);
    await userEvent.click(screen.getByRole("button", { name: /^goodbye$/i }));
    expect(screen.getByText(/comes back sooner/i)).toBeInTheDocument();
  });
});
