import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { auth } from "@/auth";

export async function GET(req: Request, { params }: { params: { teacherId: string } }) {
  try {
    if (!params.teacherId) {
      return new NextResponse("Teacher id is required", { status: 400 });
    }

    const user = await prismadb.user.findUnique({
      where: {
        id: params.teacherId,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.log("[USER_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { teacherId: string; schoolId: string } }
) {
  try {
    const session = await auth();

    if (!session) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!params.teacherId) {
      return new NextResponse("teacher id is required", { status: 400 });
    }

    if (session.user.role !== "SUPERADMIN") {
      return new NextResponse("Unauthorized", { status: 405 });
    }

    const teacher = await prismadb.user.delete({
      where: {
        id: params.teacherId,
      },
    });

    return NextResponse.json(teacher);
  } catch (error) {
    console.log("[teacher_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { teacherId: string; schoolId: string } }
) {
  try {
    const session = await auth();

    const body = await req.json();

    const { name, categories, email, password } = body;

    if (!session) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!name || !categories || !email || !password) {
      return new NextResponse("All Fields is required", { status: 400 });
    }

    if (!params.teacherId) {
      return new NextResponse("Category id is required", { status: 400 });
    }

    if (session.user.role !== "SUPERADMIN") {
      return new NextResponse("Unauthorized", { status: 405 });
    }

    const category = await prismadb.user.update({
      where: {
        id: params.teacherId,
      },
      data: {
        name,
        role: "TEACHER",
        categories,
        email,
        password,
        schoolId: params.schoolId,
      },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.log("[CATEGORY_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
