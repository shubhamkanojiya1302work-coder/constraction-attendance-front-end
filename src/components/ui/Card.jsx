// White rounded panel used as the base for most dashboard sections.
export default function Card({ className = "", children }) {
  return <div className={`rounded-2xl bg-white ${className}`}>{children}</div>;
}
