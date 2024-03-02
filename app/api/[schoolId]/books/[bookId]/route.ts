import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { auth } from "@/auth";

export async function GET(req: Request, { params }: { params: { bookId: string } }) {
  try {
    if (!params.bookId) {
      return new NextResponse("Book id is required", { status: 400 });
    }

    const book = await prismadb.book.findUnique({
      where: {
        id: params.bookId,
      },
    });

    return NextResponse.json(book);
  } catch (error) {
    console.log("[book_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { bookId: string; schoolId: string } }
) {
  try {
    const session = await auth();

    if (!session) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!params.bookId) {
      return new NextResponse("book id is required", { status: 400 });
    }

    const book = await prismadb.book.delete({
      where: {
        id: params.bookId,
      },
    });

    return NextResponse.json(book);
  } catch (error) {
    console.log("[book_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { bookId: string; schoolId: string } }
) {
  try {
    const session = await auth();

    const body = await req.json();
    const {
      name,
      imageUrl,
      isPurchased,
      pdfLink,
      guidePdfLink,
      price,
      totalPages,
      premiumLink,
      categoryId,
      authors,
    }: {
      name: string;
      categoryId: string;
      premiumLink: string;

      imageUrl: string;
      isPurchased: boolean;
      pdfLink: string;
      guidePdfLink: string;
      price: string;
      totalPages: string;
      authors: string[];
    } = body;
    if (!session) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!name || !imageUrl || !pdfLink || !guidePdfLink || !price || !totalPages || !authors) {
      return new NextResponse("All Fields are required", { status: 400 });
    }

    if (!params.bookId) {
      return new NextResponse("book id is required", { status: 400 });
    }

    const book = await prismadb.book.update({
      where: {
        id: params.bookId,
      },
      data: {
        name,
        imageUrl,
        premiumLink,

        categoryId,
        isPurchased: isPurchased ? true : false,
        pdfLink,
        guidePdfLink,
        price,
        totalPages,

        authors: { connect: authors.map((authorId) => ({ id: authorId })) },
        schoolId: params.schoolId,
      },
    });

    return NextResponse.json(book);
  } catch (error) {
    console.log("[book_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
