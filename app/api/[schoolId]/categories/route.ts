import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { auth } from "@/auth";

export async function POST(req: Request, { params }: { params: { schoolId: string } }) {
  try {
    const session = await auth();

    const body = await req.json();

    const { name } = body;

    if (!session) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!params.schoolId) {
      return new NextResponse("Site id is required", { status: 400 });
    }

    if (session.user.role !== "SUPERADMIN") {
      return new NextResponse("Unauthorized", { status: 405 });
    }

    const category = await prismadb.category.create({
      data: {
        name,
        schoolId: params.schoolId,
      },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.log("[CATEGORIES_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(req: Request, { params }: { params: { schoolId: string } }) {
  try {
    if (!params.schoolId) {
      return new NextResponse("Site id is required", { status: 400 });
    }

    const categories = await prismadb.category.findMany({
      where: {
        schoolId: params.schoolId,
      },
    });

    return NextResponse.json(categories);
  } catch (error) {
    console.log("[CATEGORIES_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
