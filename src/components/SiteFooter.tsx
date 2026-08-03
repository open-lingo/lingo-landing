import type { ReactNode } from "react";
import { Link } from "react-router";
import { LINKS } from "@/links";
import { Icon } from "./ui/Icon";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto flex max-w-6xl flex-wrap gap-8 px-6 py-10 text-sm">
        <div className="min-w-[14rem] flex-1">
          <p className="font-bold text-text-primary">Open Lingo</p>
          <p className="mt-1 max-w-xs text-text-secondary">
            Free, open-source language learning. MIT licensed.
          </p>
        </div>

        <FooterColumn title="Product">
          <a href={LINKS.tryFree} className="hover:text-text-primary">
            Try it free
          </a>
          <Link to="/roadmap" className="hover:text-text-primary">
            Roadmap
          </Link>
          <Link to="/docs" className="hover:text-text-primary">
            Docs
          </Link>
        </FooterColumn>

        <FooterColumn title="Project">
          <Link to="/about" className="hover:text-text-primary">
            About
          </Link>
          <a
            href={LINKS.github}
            className="inline-flex items-center gap-1.5 hover:text-text-primary"
          >
            <Icon name="github" size={14} />
            GitHub
          </a>
        </FooterColumn>

        <FooterColumn title="Legal">
          <Link to="/privacy" className="hover:text-text-primary">
            Privacy
          </Link>
          <Link to="/terms" className="hover:text-text-primary">
            Terms
          </Link>
        </FooterColumn>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="flex min-w-[8rem] flex-col gap-2 text-text-secondary">
      <p className="text-xs font-bold uppercase tracking-wider text-text-muted">
        {title}
      </p>
      {children}
    </div>
  );
}
