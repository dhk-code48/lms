import { Author, Book, Category } from "@prisma/client";
import Image from "next/image";
import React, { FC } from "react";

const BookInfo: FC<{
  book: Book & { authors: Author[]; category: Category };
}> = ({ book }) => {
  return (
    <div className="flex lg:justify-stretch flex-wrap justify-center mt-10 gap-10">
      <Image
        src={book.imageUrl}
        width={300}
        height={400}
        className="rounded-xl"
        alt="background of card"
      />
      <div className="flex gap-y-10 text-center lg:text-left flex-col">
        <div>
          <h1 className="font-bold text-3xl">{book.name}</h1>
          <p className="text-muted-foreground mt-1">
            Category : {book.category.name}
          </p>
          <p className="text-muted-foreground mt-1">Price : {book.price}</p>
          <p className="text-muted-foreground mt-1">
            Pages : {book.totalPages}
          </p>
        </div>
        <div>
          <p className="font-bold  tracking-wide mb-2">Authors : </p>
          <div className="space-y-2">
            {book.authors.map((author) => {
              return (
                <div
                  key={author.id + " author"}
                  className="flex items-center gap-2 pr-5 w-fit bg-muted rounded-full"
                >
                  <Image
                    src={author.imageUrl || "/gbs.png"}
                    width={50}
                    height={50}
                    className="rounded-full w-8 h-8"
                    alt="author image"
                  />
                  <p className="text-sm">{author.name}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookInfo;
