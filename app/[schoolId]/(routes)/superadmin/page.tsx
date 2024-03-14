import { Heading } from "@/components/ui/heading";
import React from "react";
import Analytics from "./_components/analytics";
import prismadb from "@/lib/prismadb";

const SuperAdminOverview = async ({ params }: { params: { schoolId: string } }) => {
  const totalBooks = await prismadb.book.count({
    where: {
      schoolId: params.schoolId,
    },
  });
  const totalCategory = await prismadb.category.count({ where: { schoolId: params.schoolId } });
  const totalSchools = await prismadb.school.count();

  return (
    <div className="space-y-5">
      <Heading description="View the overall overview of the whole website" title="Analytics" />
      <Analytics
        totalBooks={totalBooks}
        totalCategory={totalCategory}
        totalSchools={totalSchools}
      />
    </div>
  );
};

export default SuperAdminOverview;
