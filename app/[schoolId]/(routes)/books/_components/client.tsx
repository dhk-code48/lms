"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";

import { BookColumns } from "./columns";
import { Book } from "@prisma/client";

interface BooksClientProps {
  data: Book[];
}

export const BooksClient: React.FC<BooksClientProps> = ({ data }) => {
  const params = useParams();
  const router = useRouter();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Books (${data.length})`}
          description="Manage books for your store"
        />
        <Button onClick={() => router.push(`/${params.schoolId}/books/new`)}>
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>

      <DataTable searchKey="name" columns={BookColumns} data={data} />
    </>
  );
};
