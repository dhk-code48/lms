import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { auth } from "@/auth";
import { UserRole } from "@prisma/client";

export async function POST(req: Request, { params }: { params: { schoolId: string } }) {
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
      authors,
      premiumLink,
      categoryId,
    }: {
      name: string;
      categoryId: string;
      imageUrl: string;
      isPurchased: boolean;
      pdfLink: string;
      guidePdfLink: string;
      price: string;
      totalPages: string;
      premiumLink: string;
      authors: string[];
    } = body;

    if (!session) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!name || !imageUrl || !pdfLink || !guidePdfLink || !price || !totalPages || !authors) {
      return new NextResponse("All Fields are required", { status: 400 });
    }

    if (!params.schoolId) {
      return new NextResponse("School id is required", { status: 400 });
    }

    const book = await prismadb.book.create({
      data: {
        name,
        categoryId,
        premiumLink,
        imageUrl,
        isPurchased: isPurchased ? isPurchased : false,
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
    console.log("[book_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(req: Request, { params }: { params: { schoolId: string } }) {
  try {
    if (!params.schoolId) {
      return new NextResponse("Site id is required", { status: 400 });
    }

    const books = await prismadb.book.findMany({
      where: {
        schoolId: params.schoolId,
      },
    });

    return NextResponse.json(books);
  } catch (error) {
    console.log("[bookS_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
