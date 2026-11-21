import { useEffect, useId } from "react";
import { X } from "lucide-react";

// Reusable dialog.
// Phones: a bottom sheet with a drag-handle bar. `sm` and up: a centred card.
// Closes on Escape, on the X button and on a backdrop click. Locks page scroll while open.
//
//   title, description, icon   header (title can be any node, e.g. with a badge)
//   size     "md" (default, 28rem) or "lg" (48rem, for forms)
//   accent   adds the brand gradient bar along the top edge
//   footer   node pinned to the bottom while the body scrolls (e.g. form buttons)
//
// <Modal open title="..." icon={Shield} description="..." onClose={...}>…</Modal>
const sizes = { md: "sm:max-w-md", lg: "sm:max-w-3xl" };

export default function Modal({
  open,
  onClose,
  title,
  description,
  icon: Icon,
  size = "md",
  accent,
  footer,
  children,
}) {
  const titleId = useId();

  useEffect(() => {
    if (!open) return;
    const onKey = (event) => event.key === "Escape" && onClose();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-40 flex items-end justify-center bg-slate-900/40 sm:items-center sm:p-4"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onClick={(event) => event.stopPropagation()}
        className={`max-h-[92vh] w-full overflow-y-auto rounded-t-3xl bg-white px-5 pt-3 shadow-xl sm:rounded-3xl sm:px-6 sm:pt-6 ${
          footer ? "" : "pb-[max(1.25rem,env(safe-area-inset-bottom))]"
        } ${sizes[size] ?? sizes.md}`}
      >
        {accent && (
          <div className="-mx-5 -mt-3 mb-3 h-1.5 bg-linear-to-r from-[#965000] via-orange-500 to-emerald-700 sm:-mx-6 sm:-mt-6 sm:mb-6" />
        )}
        <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-indigo-100 sm:hidden" />

        <div className="flex items-start justify-between gap-3">
          <div className="flex min-w-0 items-start gap-3">
            {Icon && (
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-orange-100 text-[#965000]">
                <Icon className="h-6 w-6" />
              </span>
            )}
            <div className="min-w-0">
              <h2
                id={titleId}
                className="flex flex-wrap items-center gap-x-3 gap-y-1 text-2xl font-semibold text-slate-900"
              >
                {title}
              </h2>
              {description && (
                <p className="mt-1 text-slate-600">{description}</p>
              )}
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-slate-700 hover:bg-indigo-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-4">{children}</div>

        {footer && (
          <div className="sticky bottom-0 -mx-5 mt-6 border-t border-indigo-100 bg-white px-5 pb-[max(1rem,env(safe-area-inset-bottom))] pt-4 sm:-mx-6 sm:px-6">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
