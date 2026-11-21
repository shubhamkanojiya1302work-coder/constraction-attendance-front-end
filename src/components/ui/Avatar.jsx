// Photo if there is one, otherwise the person's initials.
// `online` adds a green status dot in the corner.
export default function Avatar({ name, photo, size = "h-14 w-14", online }) {
  const initials = name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2);

  return (
    <div className={`relative ${size} shrink-0`}>
      {photo ? (
        <img
          src={photo}
          alt={name}
          className="h-full w-full rounded-xl object-cover"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center rounded-xl bg-amber-100 font-semibold text-[#965000]">
          {initials}
        </div>
      )}
      {online && (
        <span className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-white bg-emerald-600" />
      )}
    </div>
  );
}
