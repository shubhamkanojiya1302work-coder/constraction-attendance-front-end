// Photo if there is one, otherwise the person's initials.
//   size     Tailwind size + text classes, e.g. "h-11 w-11 text-lg"
//   rounded  shape, e.g. "rounded-full" for a circle
//   tone     background + text classes for the initials (see initialTone)
//   letters  how many initials to show (1 → "R", 2 → "RK")
//   online   adds a green status dot in the corner
export default function Avatar({
  name,
  photo,
  size = "h-14 w-14",
  rounded = "rounded-xl",
  tone = "bg-amber-100 text-[#965000]",
  letters = 2,
  online,
}) {
  const initials = name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, letters);

  return (
    <div className={`relative ${size} shrink-0`}>
      {photo ? (
        <img
          src={photo}
          alt={name}
          className={`h-full w-full object-cover ${rounded}`}
        />
      ) : (
        <div
          className={`flex h-full w-full items-center justify-center font-semibold ${tone} ${rounded}`}
        >
          {initials}
        </div>
      )}
      {online && (
        <span className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-white bg-emerald-600" />
      )}
    </div>
  );
}

// A stable colour for someone's initials, picked from their name.
const tones = [
  "bg-orange-100 text-orange-900",
  "bg-blue-100 text-blue-900",
  "bg-amber-200 text-amber-900",
  "bg-indigo-100 text-indigo-900",
  "bg-emerald-200 text-emerald-900",
  "bg-sky-200 text-sky-900",
];

export function initialTone(name) {
  const sum = [...name].reduce((n, ch) => n + ch.charCodeAt(0), 0);
  return tones[sum % tones.length];
}
