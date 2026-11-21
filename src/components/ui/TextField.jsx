import { useId } from "react";

// Labelled form field on a tinted background, with an optional leading icon.
// Renders an <input> by default, or a <select> when `as="select"` (pass <option>s
// as children). Any other props (type, value, onChange, required…) go to the control.
// `error` shows a red message under the field.
//
// <TextField label="Site / Project Name" icon={Building2} value={…} onChange={…} />
export default function TextField({
  label,
  icon: Icon,
  as = "input",
  error,
  className = "",
  children,
  ...controlProps
}) {
  const id = useId();
  const Control = as;

  return (
    <div className={className}>
      <label htmlFor={id} className="mb-2 block text-slate-900">
        {label}
      </label>
      <div
        className={`flex items-center gap-3 rounded-xl bg-indigo-50 px-4 ring-2 transition focus-within:ring-[#965000] ${
          error ? "ring-red-300" : "ring-transparent"
        }`}
      >
        {Icon && <Icon className="h-5 w-5 shrink-0 text-slate-700" />}
        <Control
          id={id}
          aria-invalid={error ? true : undefined}
          className="w-full min-w-0 bg-transparent py-3.5 text-slate-900 outline-none placeholder:text-slate-500"
          {...controlProps}
        >
          {children}
        </Control>
      </div>
      {error && <p className="mt-1 text-sm text-red-700">{error}</p>}
    </div>
  );
}
