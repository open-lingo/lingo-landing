import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { StepShowcase } from "./StepShowcase";
import { VocabStep } from "./steps/VocabStep";
import { ReviewStep } from "./steps/ReviewStep";
import { BuildStep } from "./steps/BuildStep";

describe("StepShowcase", () => {
  it("opens on the vocabulary step", () => {
    render(<StepShowcase />);
    expect(screen.getByText("こんにちは")).toBeInTheDocument();
  });

  it("switches between step types", async () => {
    render(<StepShowcase />);
    await userEvent.click(screen.getByRole("tab", { name: /build a sentence/i }));
    expect(screen.getByText(/build: i am a student/i)).toBeInTheDocument();
  });

  it("marks the open tab as selected", async () => {
    render(<StepShowcase />);
    await userEvent.click(screen.getByRole("tab", { name: /^review$/i }));
    expect(screen.getByRole("tab", { name: /^review$/i })).toHaveAttribute(
      "aria-selected",
      "true",
    );
  });
});

describe("VocabStep", () => {
  it("confirms a correct answer with its next interval", async () => {
    render(<VocabStep />);
    await userEvent.click(
      screen.getByRole("button", { name: /hello \/ good afternoon/i }),
    );
    expect(screen.getByText(/next review in 3 days/i)).toBeInTheDocument();
  });

  it("tells the visitor a wrong answer returns sooner", async () => {
    render(<VocabStep />);
    await userEvent.click(screen.getByRole("button", { name: /^goodbye$/i }));
    expect(screen.getByText(/comes back sooner/i)).toBeInTheDocument();
  });
});

describe("ReviewStep", () => {
  it("does not render grading controls until the answer is revealed", () => {
    render(<ReviewStep />);
    expect(screen.queryByRole("button", { name: /good/i })).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: /show answer/i })).toBeInTheDocument();
  });

  it("replaces Show Answer with the grade row on reveal", async () => {
    render(<ReviewStep />);
    await userEvent.click(screen.getByRole("button", { name: /show answer/i }));

    expect(screen.getByText("Good evening")).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /show answer/i }),
    ).not.toBeInTheDocument();
    // Matched with the interval hint: a bare /Good/ also hits the revealed
    // card body, which reads "Good evening".
    for (const name of [
      /^Again\s*<1d$/,
      /^Hard\s*2d$/,
      /^Good\s*5d$/,
      /^Easy\s*12d$/,
    ]) {
      expect(screen.getByRole("button", { name })).toBeInTheDocument();
    }
  });

  it("reveals by tapping the card itself", async () => {
    render(<ReviewStep />);
    await userEvent.click(screen.getByRole("button", { name: /tap to reveal/i }));
    expect(screen.getByText("Good evening")).toBeInTheDocument();
  });

  it("grades the card and reports the new interval", async () => {
    render(<ReviewStep />);
    await userEvent.click(screen.getByRole("button", { name: /show answer/i }));
    await userEvent.click(screen.getByRole("button", { name: /^Hard\s*2d$/ }));
    expect(screen.getByText(/graded hard · back in 2d/i)).toBeInTheDocument();
  });
});

describe("BuildStep", () => {
  it("accepts the correct word order", async () => {
    render(<BuildStep />);
    for (const word of ["わたし", "は", "がくせい", "です"]) {
      await userEvent.click(screen.getByRole("button", { name: word }));
    }
    expect(screen.getByText(/は marks the topic/i)).toBeInTheDocument();
  });

  it("rejects a wrong order and lets tiles be taken back", async () => {
    render(<BuildStep />);
    for (const word of ["です", "わたし", "は", "がくせい"]) {
      await userEvent.click(screen.getByRole("button", { name: word }));
    }
    expect(screen.getByText(/word order is off/i)).toBeInTheDocument();

    // Tapping a placed tile returns it to the tray.
    await userEvent.click(screen.getAllByRole("button", { name: "です" })[0]);
    expect(screen.getByText(/tap the words in order/i)).toBeInTheDocument();
  });
});
