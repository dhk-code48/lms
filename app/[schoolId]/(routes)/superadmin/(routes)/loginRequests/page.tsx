import { format } from "date-fns";
import moment from "moment";

import prismadb from "@/lib/prismadb";

import { CategoryColumn } from "./_components/columns";
import { CategoriesClient } from "./_components/client";

const CategoriesPage = async ({ params }: { params: { schoolId: string } }) => {
  const loginRequests = await prismadb.loginRequest.findMany({
    where: {
      schoolId: params.schoolId,
    },

    include: {
      categories: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedCategories: CategoryColumn[] = loginRequests.map((item) => ({
    id: item.id,
    categories: item.categories,
    address: item.address,
    schoolId: item.schoolId,
    name: item.name,
    email: item.email,
    phone: item.phone,
    createdAt: moment(new Date(item.createdAt)).fromNow(),
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
