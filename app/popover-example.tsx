"use client";

import { useMemo, useState } from "react";

import { LucideGripVertical } from "lucide-react";

import { Button } from "@/components/ui/button";
import * as Command from "@/components/ui/command";
import * as Popover from "@/components/ui/popover";
import { Skeleton } from "@/components/ui/skeleton";
import * as Sortable from "@/components/ui/sortable";

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

export function PopoverExample({ withPortalFix }: { withPortalFix?: boolean }) {
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
    <Popover.Root>
      <Popover.Trigger asChild>
        <Button variant="outline" size="sm" role="combobox">
          {withPortalFix ? "Using createPortal" : "Not using createPortal"}
        </Button>
      </Popover.Trigger>
      <Popover.Content side="bottom" className="w-[200px] p-0">
        <Command.Root>
          <Command.Input
            value={search}
            onValueChange={setSearch}
            placeholder="Search options..."
          />
          <Command.List>
            <Command.Empty>No option found.</Command.Empty>
            <Command.Group>
              <Sortable.Root
                value={columns.map((column) => ({
                  id: column.id,
                  name: column.label,
                }))}
                onValueChange={(items) =>
                  setColumnOrder(items.map((c) => c.id))
                }
                onDragStart={() => setDrag(true)}
                onDragEnd={() => setDrag(false)}
                onDragCancel={() => setDrag(false)}
              >
                <Sortable.Content>
                  {columns.map((column) => (
                    <Sortable.Item key={column.id} value={column.id} asChild>
                      <Command.Item
                        value={column.id}
                        className="capitalize"
                        disabled={drag}
                      >
                        <span className="truncate">{column.label}</span>
                        {!search ? (
                          <Sortable.ItemGrip asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="ml-auto h-5 w-5 text-muted-foreground hover:text-foreground focus:bg-muted focus:text-foreground"
                            >
                              <LucideGripVertical
                                aria-hidden="true"
                                className="w-4 h-4 shrink-0"
                              />
                            </Button>
                          </Sortable.ItemGrip>
                        ) : null}
                      </Command.Item>
                    </Sortable.Item>
                  ))}
                </Sortable.Content>
                <Sortable.Overlay withPortalFix={withPortalFix}>
                  <Skeleton className="w-full h-full rounded-none" />
                </Sortable.Overlay>
              </Sortable.Root>
            </Command.Group>
          </Command.List>
        </Command.Root>
      </Popover.Content>
    </Popover.Root>
  );
}
