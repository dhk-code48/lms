import prismadb from "@/lib/prismadb";

import { TeacherForm } from "./_components/teacher-form";

const SuperAdminTeacherPage = async ({
  params,
}: {
  params: { teacherId: string; schoolId: string };
}) => {
  const author = await prismadb.user.findUnique({
    where: {
      id: params.teacherId,
    },
  });

  const schools = await prismadb.school.findMany({});

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4">
        <TeacherForm initialData={author} schools={schools} />
      </div>
    </div>
  );
};

export default SuperAdminTeacherPage;
