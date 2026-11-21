import { useEffect, useId } from "react";
import { X } from "lucide-react";

// Reusable dialog.
// Phones: a bottom sheet with a drag-handle bar. `sm` and up: a centred card.
// Closes on Escape, on the X button and on a backdrop click. Locks page scroll while open.
//
// <Modal open title="..." icon={Shield} description="..." onClose={...}>…</Modal>
export default function Modal({
  open,
  onClose,
  title,
  description,
  icon: Icon,
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
        className="max-h-[92vh] w-full overflow-y-auto rounded-t-3xl bg-white px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-3 shadow-xl sm:max-w-md sm:rounded-3xl sm:px-6 sm:pt-6"
      >
        <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-indigo-100 sm:hidden" />

        <div className="flex items-start justify-between gap-3">
          <h2
            id={titleId}
            className="flex items-center gap-3 text-2xl font-semibold text-slate-900"
          >
            {Icon && (
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange-100 text-[#965000]">
                <Icon className="h-5 w-5" />
              </span>
            )}
            {title}
          </h2>
          <button
            onClick={onClose}
            aria-label="Close"
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-slate-700 hover:bg-indigo-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        {description && <p className="mt-1 text-slate-600">{description}</p>}

        <div className="mt-4">{children}</div>
      </div>
    </div>
  );
}
