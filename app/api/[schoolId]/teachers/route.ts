import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { auth } from "@/auth";

export async function POST(req: Request, { params }: { params: { schoolId: string } }) {
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

    if (!params.schoolId) {
      return new NextResponse("School id is required", { status: 400 });
    }

    if (session.user.role !== "SUPERADMIN") {
      return new NextResponse("Unauthorized", { status: 405 });
    }

    let c;
    try {
      console.log("categories => ", categories);

      c = JSON.parse(categories);
      console.log("C => ", c);
    } catch (error) {
      console.error("Error parsing categories JSON:", error);
      // Optionally, return an error response here if you want to halt execution
      return new NextResponse("Invalid categories format", { status: 400 });
    }

    const user = await prismadb.user.create({
      data: {
        name,
        categories: c || [""],
        email,
        password,
        schoolId: params.schoolId,
        role: "TEACHER",
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.log("[CATEGORIES_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
