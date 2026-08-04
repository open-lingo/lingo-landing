import { useEffect, useRef, useState } from "react";

/**
 * Scroll-reveal that fails visible.
 *
 * The obvious implementation starts every element at `opacity: 0` and waits for
 * an observer. That makes content invisible whenever the observer does not fire
 * — reduced motion, no IntersectionObserver, a prerender, a crawler — which is
 * an unacceptable failure mode for a page whose job is to be read.
 *
 * So the default is visible. An element is only hidden once the observer has
 * confirmed it is off screen, and it is revealed the moment it scrolls in.
 *
 * The off-screen check comes from the observer's own first callback rather than
 * `getBoundingClientRect()` in a layout effect. Measuring forces synchronous
 * layout once per revealed element, which showed up as ~107ms of forced reflow
 * in a Lighthouse trace; IntersectionObserver reports the same fact
 * asynchronously and for free.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(): {
  ref: React.RefObject<T | null>;
  shown: boolean;
} {
  const ref = useRef<T>(null);
  const [shown, setShown] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ||
      typeof IntersectionObserver === "undefined"
    ) {
      return; // stays visible
    }

    let armed = false;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShown(true);
            observer.disconnect();
            return;
          }
          // First report and it is off screen: hide it so there is something
          // to reveal. This happens before the reader could have scrolled to
          // it, so the transition from visible to hidden is never seen.
          if (!armed) {
            armed = true;
            setShown(false);
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
