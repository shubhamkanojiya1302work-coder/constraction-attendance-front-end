import { useState } from "react";

// Client-side paging for a list. Keeps the page in range when the list shrinks
// (e.g. after filtering). Call setPage(1) when a filter changes.
//
// const { page, setPage, pageCount, visible } = usePagination(filtered, 5);
export default function usePagination(items, pageSize) {
  const [page, setPage] = useState(1);
  const pageCount = Math.max(1, Math.ceil(items.length / pageSize));
  const current = Math.min(page, pageCount);

  return {
    page: current,
    setPage,
    pageCount,
    visible: items.slice((current - 1) * pageSize, current * pageSize),
  };
}
