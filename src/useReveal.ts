import { useLayoutEffect, useRef, useState } from "react";

/**
 * Scroll-reveal that fails visible.
 *
 * The obvious implementation starts every element at `opacity: 0` and waits for
 * an observer. That makes content invisible whenever the observer does not fire
 * — reduced motion, no IntersectionObserver, a prerender, a crawler — which is
 * an unacceptable failure mode for a page whose job is to be read.
 *
 * So the default is visible. An element is only hidden if it is measurably
 * below the fold AND an observer was successfully attached to reveal it again.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(): {
  ref: React.RefObject<T | null>;
  shown: boolean;
} {
  const ref = useRef<T>(null);
  const [shown, setShown] = useState(true);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ||
      typeof IntersectionObserver === "undefined"
    ) {
      return; // stays visible
    }

    // Already on screen (or nearly): never hide it — animating content that is
    // already in front of the reader is just a flicker.
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.9) return;

    setShown(false);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShown(true);
            observer.disconnect();
          }
        }
      },
      // Fire slightly before the element reaches the fold so the motion has
      // finished by the time it is properly on screen.
      { rootMargin: "0px 0px -10% 0px", threshold: 0.1 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, shown };
}

/** Classes for a reveal: rises and fades in. */
export function revealClasses(shown: boolean): string {
  return [
    "transition-all duration-700 ease-out motion-reduce:transition-none",
    shown ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
  ].join(" ");
}

/**
 * Stagger delay for the nth item in a revealed group. Returned as a style, not
 * a class — Tailwind scans source statically, so an interpolated
 * `[transition-delay:${n}ms]` would never be generated.
 */
export function revealDelay(index: number): React.CSSProperties {
  return index ? { transitionDelay: `${index * 90}ms` } : {};
}
