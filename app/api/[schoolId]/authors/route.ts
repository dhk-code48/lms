import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { auth } from "@/auth";
import { UserRole } from "@prisma/client";

export async function POST(
  req: Request,
  { params }: { params: { schoolId: string } }
) {
  try {
    const session = await auth();

    const body = await req.json();

    const { name, imageUrl } = body;

    if (!session) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!params.schoolId) {
      return new NextResponse("School id is required", { status: 400 });
    }

    const author = await prismadb.author.create({
      data: {
        name,
        imageUrl,
        schoolId: params.schoolId,
      },
    });

    return NextResponse.json(author);
  } catch (error) {
    console.log("[AUTHOR_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { schoolId: string } }
) {
  try {
    if (!params.schoolId) {
      return new NextResponse("Site id is required", { status: 400 });
    }

    const authors = await prismadb.author.findMany({
      where: {
        schoolId: params.schoolId,
      },
    });

    return NextResponse.json(authors);
  } catch (error) {
    console.log("[AUTHORS_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
