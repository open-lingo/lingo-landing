import { useEffect } from "react";
import { siteUrl } from "@/links";

const SITE_NAME = "Open Lingo";

function setMeta(selector: string, attr: "name" | "property", key: string, value: string) {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", value);
}

/**
 * Per-route title, description and canonical.
 *
 * Worth being clear about the limit: this runs in the browser, so Google (which
 * renders JS) sees it, but social crawlers do not execute JS and will keep
 * using the tags baked into index.html. Making per-page cards work for those
 * needs prerendered HTML per route, which is a build + CloudFront change.
 * Until then index.html carries the homepage card and this improves tabs,
 * bookmarks, history and Google's rendered snapshot.
 */
export function useSeo({
  title,
  description,
  path,
}: {
  title: string;
  description?: string;
  /** Route path, e.g. "/roadmap". Used for the canonical URL. */
  path: string;
}) {
  useEffect(() => {
    const full = title === SITE_NAME ? title : `${title} · ${SITE_NAME}`;
    document.title = full;

    if (description) {
      setMeta('meta[name="description"]', "name", "description", description);
      setMeta('meta[property="og:description"]', "property", "og:description", description);
    }
    setMeta('meta[property="og:title"]', "property", "og:title", full);

    const url = siteUrl(path);
    setMeta('meta[property="og:url"]', "property", "og:url", url);

    let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = document.createElement("link");
      link.rel = "canonical";
      document.head.appendChild(link);
    }
    link.href = url;
  }, [title, description, path]);
}
