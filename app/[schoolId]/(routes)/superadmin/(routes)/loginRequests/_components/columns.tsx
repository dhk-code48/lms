"use client";

import { ColumnDef } from "@tanstack/react-table";

import { CellAction } from "./cell-action";
import CreateTeacher from "./create-teacher";
import { Category } from "@prisma/client";

export type CategoryColumn = {
  id: string;
  name: string;
  email: string;
  address: string;
  schoolId: string;

  phone: string;
  createdAt: string;
  categories: Category[];
};

export const columns: ColumnDef<CategoryColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },

  {
    accessorKey: "schoolId",
    header: "SchoolId",
  },
  {
    accessorKey: "categories",
    header: "Categories",
    cell: ({ row }) => {
      const categories: Category[] = row.getValue("categories");
      return <div>{categories?.length}</div>;
    },
  },
  {
    header: "Action",
    cell: ({ row }) => (
      <CreateTeacher
        categories={row.getValue("categories")}
        email={row.getValue("email")}
        name={row.getValue("name")}
        schoolId={row.getValue("schoolId")}
        address={row.getValue("address")}
      />
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
