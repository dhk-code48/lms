import OverviewCard from "./overview-card";
import React from "react";
import { Book, Notebook, School } from "lucide-react";
import prismadb from "@/lib/prismadb";

const Analytics = async ({
  totalBooks,
  totalCategory,
  totalSchools,
}: {
  totalBooks: number;
  totalSchools: number;
  totalCategory: number;
}) => {
  return (
    <div>
      <div className="flex flex-wrap gap-x-5 gap-y-3">
        <OverviewCard
          amount={totalBooks}
          description="Total count of book added"
          icon={<Book />}
          title="Total Books"
        />
        <OverviewCard
          amount={totalSchools - 1}
          description="Total count of school added"
          icon={<School />}
          title="Total Schools"
        />
        <OverviewCard
          amount={totalCategory}
          description="Total count of category added"
          icon={<Notebook />}
          title="Total Category"
        />
      </div>
    </div>
  );
};

export default Analytics;
