import { Route, Routes } from "react-router";
import { Layout } from "./components/Layout";
import { DocPage } from "./pages/DocPage";
import { Docs } from "./pages/Docs";
import { Landing } from "./pages/Landing";
import { NotFound } from "./pages/NotFound";
import { Roadmap } from "./pages/Roadmap";

function Placeholder({ title }: { title: string }) {
  return (
    <section className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-black text-text-primary">{title}</h1>
    </section>
  );
}

export function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Landing />} />
        <Route path="/roadmap" element={<Roadmap />} />
        <Route path="/docs" element={<Docs />} />
        <Route path="/docs/:slug" element={<DocPage />} />
        <Route path="/about" element={<Placeholder title="About" />} />
        <Route path="/privacy" element={<Placeholder title="Privacy" />} />
        <Route path="/terms" element={<Placeholder title="Terms" />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
