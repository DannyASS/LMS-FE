import React from "react";
import Button from "./Button";

export default function ServerPagination({
  page,
  perPage,
  total,
  onPageChange,
}) {
  const totalPages = Math.ceil(total / perPage);

  const prev = () => page > 1 && onPageChange(page - 1);
  const next = () => page < totalPages && onPageChange(page + 1);

  return (
    <div className="flex items-center justify-between py-3">
      <p className="text-sm text-muted-foreground">
        Showing page {page} of {totalPages}
      </p>

      <div className="flex items-center gap-2">
        <Button
          onClick={prev}
          disabled={page === 1}
          className="px-3 py-1 border rounded disabled:opacity-40"
        >
          Prev
        </Button>

        <span className="text-sm">
          {page} / {totalPages}
        </span>

        <Button
          onClick={next}
          disabled={page === totalPages}
          className="px-3 py-1 border rounded disabled:opacity-40"
        >
          Next
        </Button>
      </div>
    </div>
  );
}
