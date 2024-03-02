"use client";

import { Book } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";

export const BookColumns: ColumnDef<Book>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },

  {
    accessorKey: "isPurchased",
    header: "Purchased",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
