import { format } from "date-fns";

import prismadb from "@/lib/prismadb";

import { TeacherColumn } from "./_components/columns";
import { AuthorsClient } from "./_components/client";

const AuthorsPage = async ({ params }: { params: { schoolId: string } }) => {
  const authors = await prismadb.user.findMany({
    where: {
      role: "TEACHER",
      schoolId: params.schoolId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedTeachers: TeacherColumn[] = authors.map((item) => ({
    id: item.id,
    name: item.name ?? "",
    email: item.email ?? "",
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4">
        <AuthorsClient data={formattedTeachers} />
      </div>
    </div>
  );
};

export default AuthorsPage;
