import { Route, Routes } from "react-router";
import { Layout } from "./components/Layout";
import { About } from "./pages/About";
import { DocPage } from "./pages/DocPage";
import { Docs } from "./pages/Docs";
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
        <Route path="/docs" element={<Docs />} />
        <Route path="/docs/:slug" element={<DocPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
