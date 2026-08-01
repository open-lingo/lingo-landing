import { renderHook, act } from "@testing-library/react";
import { resolveInitialTheme, useTheme, THEME_STORAGE_KEY } from "./useTheme";

describe("resolveInitialTheme", () => {
  it("honors a stored preference over the system setting", () => {
    expect(resolveInitialTheme("dark", false)).toBe("dark");
    expect(resolveInitialTheme("light", true)).toBe("light");
  });

  it("falls back to the system setting when nothing is stored", () => {
    expect(resolveInitialTheme(null, true)).toBe("dark");
    expect(resolveInitialTheme(null, false)).toBe("light");
  });

  it("ignores a corrupt stored value", () => {
    expect(resolveInitialTheme("banana", true)).toBe("dark");
  });
});

describe("useTheme", () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove("dark");
  });

  it("toggles the mode and persists it", () => {
    const { result } = renderHook(() => useTheme());
    expect(result.current.mode).toBe("light");

    act(() => result.current.toggle());

    expect(result.current.mode).toBe("dark");
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe("dark");
  });

  it("applies the dark class to the document element", () => {
    const { result } = renderHook(() => useTheme());
    act(() => result.current.toggle());
    expect(document.documentElement.classList.contains("dark")).toBe(true);
  });
});
