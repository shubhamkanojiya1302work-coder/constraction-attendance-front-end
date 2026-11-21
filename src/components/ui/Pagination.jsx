// Previous / numbered pages / Next. Long ranges collapse with "…",
// always keeping the first page, the last page and the current page's neighbours.
// page is 1-based.
export default function Pagination({ page, pageCount, onChange }) {
  if (pageCount <= 1) return null;

  const shown = [...new Set([1, page - 1, page, page + 1, pageCount])]
    .filter((p) => p >= 1 && p <= pageCount)
    .sort((a, b) => a - b);

  const items = [];
  shown.forEach((p, i) => {
    if (i > 0 && p - shown[i - 1] > 1) items.push(`gap-${p}`);
    items.push(p);
  });

  const base = "rounded-lg px-3.5 py-2 text-sm transition disabled:opacity-40";

  return (
    <nav aria-label="Pagination" className="flex flex-wrap items-center gap-2">
      <button
        onClick={() => onChange(page - 1)}
        disabled={page === 1}
        className={`${base} bg-indigo-50 text-slate-800 hover:bg-indigo-100`}
      >
        Previous
      </button>
      {items.map((item) =>
        typeof item === "string" ? (
          <span key={item} className="px-1 text-slate-400">
            …
          </span>
        ) : (
          <button
            key={item}
            onClick={() => onChange(item)}
            aria-current={item === page ? "page" : undefined}
            className={`${base} ${
              item === page
                ? "bg-[#965000] text-white"
                : "bg-indigo-50 text-slate-800 hover:bg-indigo-100"
            }`}
          >
            {item}
          </button>
        ),
      )}
      <button
        onClick={() => onChange(page + 1)}
        disabled={page === pageCount}
        className={`${base} bg-indigo-50 text-slate-800 hover:bg-indigo-100`}
      >
        Next
      </button>
    </nav>
  );
}
