import { useRef } from "react";

// One box per digit. Typing moves to the next box, Backspace on an empty box
// goes back, and pasting a full code fills every box.
// value: string of digits (e.g. "48"); onChange(newValue)
export default function AccessCodeInput({
  length = 4,
  value,
  onChange,
  invalid,
  autoFocus,
}) {
  const refs = useRef([]);
  const digits = Array.from({ length }, (_, i) => value[i] ?? "");

  const focus = (i) =>
    refs.current[Math.max(0, Math.min(i, length - 1))]?.focus();

  const setDigit = (i, digit) => {
    const next = [...digits];
    next[i] = digit;
    onChange(next.join("").slice(0, length));
  };

  const handleChange = (i, event) => {
    const typed = event.target.value.replace(/\D/g, "");
    if (!typed) return setDigit(i, "");
    if (typed.length > 1) {
      // Pasted or autofilled several digits into one box.
      onChange((digits.slice(0, i).join("") + typed).slice(0, length));
      return focus(i + typed.length);
    }
    setDigit(i, typed);
    focus(i + 1);
  };

  const handleKeyDown = (i, event) => {
    if (event.key === "Backspace" && !digits[i] && i > 0) {
      setDigit(i - 1, "");
      focus(i - 1);
      event.preventDefault();
    }
  };

  return (
    <div className="grid grid-cols-4 gap-3">
      {digits.map((digit, i) => (
        <input
          key={i}
          ref={(el) => (refs.current[i] = el)}
          value={digit}
          onChange={(event) => handleChange(i, event)}
          onKeyDown={(event) => handleKeyDown(i, event)}
          onFocus={(event) => event.target.select()}
          inputMode="numeric"
          autoComplete={i === 0 ? "one-time-code" : "off"}
          autoFocus={autoFocus && i === 0}
          aria-label={`Digit ${i + 1}`}
          className={`h-16 w-full rounded-xl bg-white text-center text-3xl font-medium text-slate-900 outline-none ring-2 transition focus:ring-[#965000] ${
            invalid ? "ring-red-300" : "ring-transparent"
          }`}
        />
      ))}
    </div>
  );
}
