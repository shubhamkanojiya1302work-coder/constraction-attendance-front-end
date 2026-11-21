import { useMemo, useState } from "react";
import { CalendarDays, Clock, RefreshCw, UserCheck } from "lucide-react";
import PageHeading from "../ui/PageHeading";
import Pagination from "../ui/Pagination";
import usePagination from "../../hooks/usePagination";
import ReviewBanner from "./ReviewBanner";
import SummaryCard from "./SummaryCard";
import TradeFilter from "./TradeFilter";
import WorkerRow from "./WorkerRow";

// SiteDesk "Live Attendance": who is on site right now.
// roster: { today, review, onSite, checkedIn, attention, workers } (see liveRoster)
// onRefresh(), onViewDetails(worker)
//
// Filtering, search and paging run over the loaded list and the chip counts
// come from it. With a real API those should come from the server.

const PAGE_SIZE = 5;

const tradeGroups = [
  { id: "mason", label: "Masons" },
  { id: "electrician", label: "Electricians" },
  { id: "helper", label: "Helpers" },
  { id: "carpenter", label: "Carpenters" },
];

const needsReview = (w) => w.status !== "on-time";

export default function LiveAttendanceView({
  roster,
  onRefresh,
  onViewDetails,
}) {
  const { today, review, onSite, checkedIn, attention, workers } = roster;
  const [trade, setTrade] = useState("all");
  const [query, setQuery] = useState("");

  const filterOptions = useMemo(() => {
    const options = [
      { id: "all", label: "All Workers", count: workers.length },
      ...tradeGroups.map((g) => ({
        ...g,
        count: workers.filter((w) => w.group === g.id).length,
      })),
    ];
    const flagged = workers.filter(needsReview).length;
    if (flagged)
      options.push({ id: "review", label: "Needs Review", count: flagged });
    return options;
  }, [workers]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const digits = q.replace(/\D/g, "");
    return workers.filter((w) => {
      if (trade === "review" && !needsReview(w)) return false;
      if (trade !== "all" && trade !== "review" && w.group !== trade)
        return false;
      if (!q) return true;
      return (
        w.name.toLowerCase().includes(q) ||
        (digits && w.phone.replace(/\D/g, "").includes(digits))
      );
    });
  }, [workers, trade, query]);

  const { page, setPage, pageCount, visible } = usePagination(
    filtered,
    PAGE_SIZE,
  );

  const selectTrade = (id) => {
    setTrade(id);
    setPage(1);
  };
  const changeQuery = (value) => {
    setQuery(value);
    setPage(1);
  };

  const capacity = Math.round((onSite.count / onSite.registered) * 100);

  return (
    <>
      <ReviewBanner
        count={review.count}
        message={review.message}
        onReview={() => selectTrade("review")}
      />

      <PageHeading
        className="pt-2"
        eyebrow="Real-Time Jobsite Roster"
        title="Live Site Attendance"
        subtitle="See who is currently working on site today."
        actions={
          <div className="flex w-full items-center justify-between gap-4 rounded-xl bg-indigo-50 py-2 pl-4 pr-2 lg:w-auto">
            <span className="flex items-center gap-2 text-slate-900">
              <CalendarDays className="h-4 w-4 text-slate-600" /> Today: {today}
            </span>
            <button
              onClick={onRefresh}
              className="flex items-center gap-2 rounded-lg bg-white px-3 py-1.5 text-sm text-slate-900 hover:bg-indigo-100"
            >
              <RefreshCw className="h-4 w-4 text-[#965000]" /> Refresh
            </button>
          </div>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-3">
        <SummaryCard
          title="On Site Right Now"
          badge="Active Roster"
          value={onSite.count}
          unit="workers present"
          unitClass="text-emerald-700"
          progress={capacity}
          progressClass="bg-emerald-700"
        >
          {capacity}% capacity • out of {onSite.registered} registered
        </SummaryCard>

        <SummaryCard
          title="Checked In Today"
          icon={UserCheck}
          value={checkedIn.count}
          unit="total head count"
          progress={checkedIn.plannedPct}
          progressClass="bg-[#c06a00]"
        >
          {checkedIn.plannedPct}% planned turn-out • {checkedIn.checkedOut}{" "}
          checked out early
        </SummaryCard>

        <SummaryCard
          title="Need Attention"
          badge="Requires Sign-off"
          badgeTone="danger"
          badgeDot={false}
          value={attention.count}
          valueClass="text-[#965000]"
          unit="flagged items"
          unitClass="text-slate-800"
        >
          <p className="flex items-center gap-2 text-sm text-[#965000]">
            <Clock className="h-4 w-4" /> {attention.detail}
          </p>
          <p className="mt-4">
            Action required before shifts end at {attention.deadline}
          </p>
        </SummaryCard>
      </div>

      <TradeFilter
        options={filterOptions}
        active={trade}
        onSelect={selectTrade}
        query={query}
        onQueryChange={changeQuery}
      />

      <div className="space-y-4">
        {visible.length ? (
          visible.map((w) => (
            <WorkerRow key={w.id} worker={w} onViewDetails={onViewDetails} />
          ))
        ) : (
          <p className="rounded-2xl bg-white p-8 text-center text-slate-600">
            No workers match this filter.
          </p>
        )}
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-slate-700">
          Showing {visible.length} of {filtered.length} workers currently active
        </p>
        <Pagination page={page} pageCount={pageCount} onChange={setPage} />
      </div>
    </>
  );
}
