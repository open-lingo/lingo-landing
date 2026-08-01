import { Link } from "react-router";

export function NotFound() {
  return (
    <section className="mx-auto max-w-xl px-6 py-24 text-center">
      <h1 className="text-3xl font-black text-text-primary">Page not found</h1>
      <p className="mt-3 text-text-secondary">
        That page does not exist. Try the{" "}
        <Link to="/" className="text-accent underline">
          home page
        </Link>
        .
      </p>
    </section>
  );
}
