import { Outlet } from "react-router";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";
import { FontSwitcher } from "@/dev/FontSwitcher";

export function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <Outlet />
      </main>
      <SiteFooter />
      {/* Vite compiles import.meta.env.DEV to false for `vite build`, so this
          branch and the whole FontSwitcher tree drop out of the prod bundle. */}
      {import.meta.env.DEV ? <FontSwitcher /> : null}
    </div>
  );
}
