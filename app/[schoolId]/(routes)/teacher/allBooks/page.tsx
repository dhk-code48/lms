import { auth } from "@/auth";
import BookCard from "@/components/book-card";
import { Heading } from "@/components/ui/heading";
import prismadb from "@/lib/prismadb";
import Link from "next/link";
import { redirect } from "next/navigation";
import React, { FC } from "react";
import BookSearch from "./_components/book-search";

const TeacherBooks: FC<{ params: { schoolId: string } }> = async ({
  params,
}) => {
  const session = await auth();

  if (!session) {
    redirect("/auth/login");
  }
  if (session.user.role !== "TEACHER") {
    redirect("/");
  }

  const books = await prismadb.book.findMany({
    where: {
      schoolId: process.env.NEXT_DEFAULT_SCHOOLID,
      categoryId: { in: session.user.categories },
    },
  });

  return (
    <div className="space-y-10">
      <Heading
        title="All Books"
        description="All books with answer key and pdf"
      />
      <BookSearch schoolId={params.schoolId} />
    </div>
  );
};

export default TeacherBooks;
