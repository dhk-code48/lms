import BookInfo from "@/components/book-info";
import prismadb from "@/lib/prismadb";
import { redirect } from "next/navigation";
import React, { FC } from "react";
import PDFViewer from "../../books/[bookId]/_components/pdf-viewer";
const TeacherBookInfo: FC<{
  params: { bookId: string; schoolId: string };
}> = async ({ params }) => {
  const book = await prismadb.book.findUnique({
    where: {
      id: params.bookId,
    },
    include: {
      authors: true,
      category: true,
    },
  });

  if (!book) {
    redirect(`${params.schoolId}/teacher/books`);
  }

  return (
    <div className="space-y-10">
      <BookInfo book={book} />

      <PDFViewer premium={false} book={book} />
    </div>
  );
};

export default TeacherBookInfo;
