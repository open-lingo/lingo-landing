import { Route, Routes } from "react-router";
import { Layout } from "./components/Layout";
import { About } from "./pages/About";
import { DocPage } from "./pages/DocPage";
import { Docs } from "./pages/Docs";
import { DocsLayout } from "./pages/DocsLayout";
import { Landing } from "./pages/Landing";
import { NotFound } from "./pages/NotFound";
import { Privacy } from "./pages/Privacy";
import { Roadmap } from "./pages/Roadmap";
import { Terms } from "./pages/Terms";

export function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Landing />} />
        <Route path="/roadmap" element={<Roadmap />} />
        {/* Docs share a shell: nav rail + search wrap both the index and each
            page, so the rail never remounts when moving between them. */}
        <Route path="/docs" element={<DocsLayout />}>
          <Route index element={<Docs />} />
          <Route path=":slug" element={<DocPage />} />
        </Route>
        <Route path="/about" element={<About />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
