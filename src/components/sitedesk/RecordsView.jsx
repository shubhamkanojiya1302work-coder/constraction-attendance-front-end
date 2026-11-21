import { useRef, useState } from "react";
import { Info } from "lucide-react";
import Pagination from "../ui/Pagination";
import usePagination from "../../hooks/usePagination";
import { downloadCsv } from "../../utils/exportCsv";
import RecordsHeader from "./RecordsHeader";
import RecordsFilter from "./RecordsFilter";
import PayrollStatCard from "./PayrollStatCard";
import RosterTable from "./RosterTable";
import RecordDetail from "./RecordDetail";

// SiteDesk "All Records": the day's attendance ledger with a detail panel.
// data: { dateLabel, fileDate, site, shift, verifiedPct, readyForPayroll,
//         flagNote, records } (see dailyRecords)
// onApprove(record), onEditHours(record), onPickDate(), onPickSite()
//
// Approvals made here are remembered for the session; onApprove is where the
// page should save them to the backend.

const PAGE_SIZE = 6;

const statusTabs = [
  { id: "all", label: "All" },
  { id: "present", label: "Present" },
  { id: "half-day", label: "Half Day" },
  { id: "missing", label: "Missing Out" },
];

export default function RecordsView({
  data,
  onApprove,
  onEditHours,
  onPickDate,
  onPickSite,
}) {
  const {
    dateLabel,
    fileDate,
    site,
    shift,
    verifiedPct,
    readyForPayroll,
    flagNote,
    records,
  } = data;

  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedId, setSelectedId] = useState(records[0]?.id);
  const [approvedIds, setApprovedIds] = useState(() => new Set());
  const detailRef = useRef(null);

  const tabOptions = statusTabs.map((t) => ({
    ...t,
    count:
      t.id === "all"
        ? records.length
        : records.filter((r) => r.status === t.id).length,
  }));

  const filtered =
    statusFilter === "all"
      ? records
      : records.filter((r) => r.status === statusFilter);
  const { page, setPage, pageCount, visible } = usePagination(
    filtered,
    PAGE_SIZE,
  );

  const selected = records.find((r) => r.id === selectedId) ?? records[0];
  const isApproved = (r) => r.approved || approvedIds.has(r.id);

  const selectStatus = (id) => {
    setStatusFilter(id);
    setPage(1);
    const first =
      id === "all" ? records[0] : records.find((r) => r.status === id);
    if (first) setSelectedId(first.id);
  };

  // Below `xl` the detail panel sits under the table, so bring it into view.
  const selectRecord = (id) => {
    setSelectedId(id);
    if (window.matchMedia("(max-width: 1279px)").matches) {
      detailRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const approve = (record) => {
    setApprovedIds((prev) => new Set(prev).add(record.id));
    onApprove?.(record);
  };

  const exportExcel = () =>
    downloadCsv(
      [
        [
          "Name",
          "Trade",
          "Worker ID",
          "Check In",
          "Check Out",
          "Total",
          "Status",
          "Approved",
        ],
        ...filtered.map((r) => [
          r.name,
          r.trade,
          r.workerId,
          r.checkIn,
          r.checkOut ?? "Pending",
          r.total ?? "",
          r.status,
          isApproved(r) ? "Yes" : "No",
        ]),
      ],
      `attendance-${fileDate}.csv`,
    );

  return (
    <>
      <RecordsHeader
        dateLabel={dateLabel}
        onPickDate={onPickDate}
        onExport={exportExcel}
      />

      <div className="grid grid-cols-1 items-start gap-4 sm:gap-6 xl:grid-cols-[minmax(0,1fr)_420px]">
        <RecordsFilter
          site={site}
          onPickSite={onPickSite}
          options={tabOptions}
          active={statusFilter}
          onSelect={selectStatus}
        />
        <PayrollStatCard percent={verifiedPct} ready={readyForPayroll} />

        <RosterTable
          records={visible}
          totalCount={records.length}
          shift={shift}
          selectedId={selected?.id}
          onSelect={selectRecord}
        >
          <p className="text-sm text-slate-800">
            Showing {visible.length} of {filtered.length} records
          </p>
          <Pagination page={page} pageCount={pageCount} onChange={setPage} />
        </RosterTable>

        <div ref={detailRef} className="scroll-mt-4 space-y-4 sm:space-y-6">
          {selected && (
            <RecordDetail
              record={selected}
              approved={isApproved(selected)}
              onEditHours={() => onEditHours?.(selected)}
              onApprove={() => approve(selected)}
            />
          )}
          <p className="flex gap-3 rounded-2xl bg-indigo-50 p-5 text-slate-700">
            <Info className="mt-0.5 h-5 w-5 shrink-0 text-[#965000]" />
            {flagNote}
          </p>
        </div>
      </div>
    </>
  );
}
