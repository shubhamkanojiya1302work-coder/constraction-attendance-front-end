// Download the week's shifts as a CSV file.
export function exportShiftsCsv(shifts, filename = "timesheet.csv") {
  const header = ["Date", "Task", "In", "Lunch", "Out", "Duration"];
  const rows = shifts.map((d) =>
    d.type === "rest"
      ? [d.label, d.note, "", "", "", ""]
      : [d.label, d.task, d.in, d.lunch, d.out, d.duration],
  );
  const csv = [header, ...rows]
    .map((r) => r.map((c) => `"${c}"`).join(","))
    .join("\n");
  const url = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
  const a = Object.assign(document.createElement("a"), {
    href: url,
    download: filename,
  });
  a.click();
  URL.revokeObjectURL(url);
}
