"use server";

import prismadb from "@/lib/prismadb";

export async function getInfo() {
  const schoolId = process.env.NEXT_DEFAULT_SCHOOLID;
  if (!schoolId) {
    return null;
  }
  const totalBooks = await prismadb.book.count({
    where: {
      schoolId,
    },
  });
  const totalSubjects = await prismadb.category.count({
    where: {
      schoolId,
    },
  });
  const totalSchools = await prismadb.school.count();
  return { totalBooks, totalSchools, totalSubjects: totalSubjects - 1 };
}
