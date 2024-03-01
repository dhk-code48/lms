import prismadb from "@/lib/prismadb";

import { BookForm } from "./_components/book-form";

const BookPage = async ({
  params,
}: {
  params: { bookId: string; schoolId: string };
}) => {
  const book = await prismadb.book.findUnique({
    where: {
      id: params.bookId,
    },
  });
  const authors = await prismadb.author.findMany({
    where: {
      schoolId: params.schoolId,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BookForm initialData={book} authors={authors} />
      </div>
    </div>
  );
};

export default BookPage;
