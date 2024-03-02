import { auth } from "@/auth";
import BookCard from "@/components/book-card";
import { Heading } from "@/components/ui/heading";
import prismadb from "@/lib/prismadb";
import Link from "next/link";
import { redirect } from "next/navigation";
import React, { FC } from "react";

const TeacherBooks: FC<{ params: { schoolId: string } }> = async ({ params }) => {
  const session = await auth();

  if (!session) {
    redirect("/auth/login");
  }
  if (session.user.role !== "TEACHER") {
    redirect("/");
  }

  const books = await prismadb.book.findMany({
    where: {
      schoolId: params.schoolId,
      categoryId: session.user.categoryId,
      isPurchased: true,
    },
  });

  return (
    <div className="space-y-10">
      <Heading title="Purchased Books" description="Purchased books with answer key and pdf" />
      <div className="flex gap-10 flex-wrap">
        {books &&
          books.map((book) => (
            <Link href={`/${params.schoolId}/teacher/books/${book.id}`}>
              <BookCard book={book} />
            </Link>
          ))}
      </div>
    </div>
  );
};

export default TeacherBooks;
