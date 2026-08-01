import { Route, Routes } from "react-router";

export function App() {
  return (
    <Routes>
      <Route path="/" element={<h1>Open Lingo</h1>} />
      <Route path="*" element={<p>Page not found</p>} />
    </Routes>
  );
}
