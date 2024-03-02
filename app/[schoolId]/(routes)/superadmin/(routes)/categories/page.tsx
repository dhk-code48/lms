import { format } from "date-fns";

import prismadb from "@/lib/prismadb";

import { CategoryColumn } from "./_components/columns";
import { CategoriesClient } from "./_components/client";

const CategoriesPage = async ({ params }: { params: { schoolId: string } }) => {
  const categories = await prismadb.category.findMany({
    where: {
      schoolId: params.schoolId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedCategories: CategoryColumn[] = categories.map((item) => ({
    id: item.id,
    name: item.name,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4">
        <CategoriesClient data={formattedCategories} />
      </div>
    </div>
  );
};

export default CategoriesPage;
