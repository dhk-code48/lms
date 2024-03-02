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
      <Heading title="Available Pdf" description="Get the online soft copy of the book" />
      <div className="grid grid-cols-2 gap-x-6 gap-y-4">
        <div className="bg-muted p-4 rounded-xl cursor-pointer hover:scale-105">
          <h1 className="font-bold text-2xl">Book</h1>
          <p className="mt-2 text-gray-500 font-semibold">
            Login / Request Login to get access to all pdf
          </p>
        </div>
        <div className="bg-muted p-4 rounded-xl cursor-pointer hover:scale-105">
          <h1 className="font-bold text-2xl">Answer Key</h1>
          <p className="mt-2 text-gray-500 font-semibold">
            Login / Request Login to get access to all pdf
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomeBookPage;
