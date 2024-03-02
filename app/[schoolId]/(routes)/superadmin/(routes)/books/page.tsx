import prismadb from "@/lib/prismadb";

import { BooksClient } from "./_components/client";
import { Book } from "@prisma/client";

const ProductsPage = async ({ params }: { params: { schoolId: string } }) => {
  const products = await prismadb.book.findMany({
    where: {
      schoolId: params.schoolId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedProducts: Book[] = products.map((item) => ({
    id: item.id,
    premiumLink: item.premiumLink,
    name: item.name,
    categoryId: item.categoryId,
    isPurchased: item.isPurchased,
    price: item.price,
    totalPages: item.totalPages,
    bannerUrl: item.bannerUrl,
    createdAt: item.createdAt,
    guidePdfLink: item.guidePdfLink,
    imageUrl: item.imageUrl,
    pdfLink: item.pdfLink,
    schoolId: item.schoolId,
    updatedAt: item.updatedAt,
  }));

  return (
    <div className="flex-col">
      <div className="flex-1">
        <BooksClient data={formattedProducts} />
      </div>
    </div>
  );
};

export default ProductsPage;
