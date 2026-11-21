import FilterChips from "../ui/FilterChips";
import SearchInput from "../ui/SearchInput";

// Live Attendance filter row: trade chips + name/phone search.
// options: [{ id, label, count }]
export default function TradeFilter({
  options,
  active,
  onSelect,
  query,
  onQueryChange,
}) {
  return (
    <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
      <FilterChips options={options} active={active} onSelect={onSelect} />
      <SearchInput
        value={query}
        onChange={onQueryChange}
        placeholder="Search worker by name or phone..."
        className="lg:w-80"
      />
    </div>
  );
}
