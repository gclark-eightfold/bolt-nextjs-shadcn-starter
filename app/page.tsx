"use client";

import { useMemo, useState } from "react";

import { PopoverExample } from "./popover-example";

// example table column definitions
const COLUMNS = [
  { id: "column_a", label: "A" },
  { id: "column_b", label: "B" },
  { id: "column_c", label: "C" },
  { id: "column_d", label: "D" },
  { id: "column_e", label: "E" },
  { id: "column_f", label: "F" },
  { id: "column_g", label: "G" },
  { id: "column_h", label: "H" },
  { id: "column_i", label: "I" },
];

export default function Home() {
  const [drag, setDrag] = useState(false);
  const [search, setSearch] = useState("");

  // example of a separate ordering state managed by something like tanstack table api
  const [columnOrder, setColumnOrder] = useState(COLUMNS.map(({ id }) => id));

  const columns = useMemo(() => {
    const columns = [...COLUMNS];
    if (columnOrder) {
      columns.sort(
        (a, b) => columnOrder.indexOf(a.id) - columnOrder.indexOf(b.id)
      );
    }
    return columns;
  }, [columnOrder]);

  return (
    <div className="w-screen p-12 flex flex-col items-center justify-center gap-12">
      <h1 className="text-center font-semibold text-3xl">Issue Example</h1>
      <PopoverExample />
      <PopoverExample withPortalFix />
    </div>
  );
}
