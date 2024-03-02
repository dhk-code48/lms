import React, { FC } from "react";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import Image from "next/image";
import { Book } from "@prisma/client";

const BookCard: FC<{ book: Book }> = ({ book }) => {
  return (
    <CardContainer className="inter-var h-60 w-40">
      <CardBody className="cursor-pointer relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black h-auto rounded-xl border">
        <CardItem translateZ="100" className="w-full`">
          <Image
            src={book.imageUrl}
            height="1000"
            width="1000"
            className="h-60 w-full object-fill rounded-xl group-hover/card:shadow-xl"
            alt="thumbnail"
          />
        </CardItem>
      </CardBody>
    </CardContainer>
  );
};

export default BookCard;
