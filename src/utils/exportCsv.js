// Download rows as a CSV file that opens directly in Excel.
// rows: array of arrays (first row = header). Quotes are escaped and a UTF-8
// BOM is added so Excel shows characters like "•" and "–" correctly.
const BOM = String.fromCharCode(0xfeff); // byte-order mark for Excel

export function downloadCsv(rows, filename) {
  const csv = rows
    .map((r) =>
      r.map((c) => `"${String(c ?? "").replace(/"/g, '""')}"`).join(","),
    )
    .join("\r\n");
  const url = URL.createObjectURL(
    new Blob([BOM + csv], { type: "text/csv;charset=utf-8" }),
  );
  const a = Object.assign(document.createElement("a"), {
    href: url,
    download: filename,
  });
  a.click();
  URL.revokeObjectURL(url);
}

// Download the week's shifts as a CSV file.
export function exportShiftsCsv(shifts, filename = "timesheet.csv") {
  const header = ["Date", "Task", "In", "Lunch", "Out", "Duration"];
  const rows = shifts.map((d) =>
    d.type === "rest"
      ? [d.label, d.note, "", "", "", ""]
      : [d.label, d.task, d.in, d.lunch, d.out, d.duration],
  );
  downloadCsv([header, ...rows], filename);
}
