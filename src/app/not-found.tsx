import Link from "next/link";

export default function NotFound() {
  return (
    <div className="block block--not-found">
      <h2 className="not-found-title">404</h2>
      <p className="not-found-content">
        The page you were looking for does not exist.
      </p>
      <p className="not-found-content">
        You may have mistyped the address or the page may have moved.
      </p>
      <button className="btn btn--large">
        <Link href="/">Home Page</Link>
      </button>
    </div>
  );
}
