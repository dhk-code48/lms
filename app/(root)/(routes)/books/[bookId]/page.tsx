import PDFViewer from "@/app/[schoolId]/(routes)/teacher/books/[bookId]/_components/pdf-viewer";
import BookInfo from "@/components/book-info";
import { buttonVariants } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import prismadb from "@/lib/prismadb";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

const HomeBookPage = async ({ params }: { params: { bookId: string } }) => {
  const book = await prismadb.book.findUnique({
    where: {
      id: params.bookId,
    },
    include: {
      category: true,
      authors: true,
    },
  });
  if (!book) {
    redirect("/books");
  }
  return (
    <div className="container space-y-10">
      <BookInfo book={book} />
      <Heading
        title="Available Pdf"
        description="Get the online soft copy of the book"
      />
      <div className="grid grid-cols-2 gap-x-6 gap-y-4 z-50">
        <PDFViewer book={book} premium={false} />
      </div>
    </div>
  );
};

export default HomeBookPage;
