import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";

export async function POST(req: Request) {
  try {
    console.log("THIS IS SO FUCKED => ");

    const body = await req.json();

    const {
      name,
      address,
      categories,
      email,
      phone,
      schoolId,
    }: {
      name: string;
      schoolId: string;
      address: string;
      categories: string[];
      email: string;
      phone: string;
    } = body;

    if (!name || !address || !categories || !email || !phone || !schoolId) {
      return new NextResponse("All field is required", { status: 400 });
    }

    const loginRequest = await prismadb.loginRequest.create({
      data: {
        name,
        address,
        categories: {
          connect: categories.map((category) => ({ id: category })),
        },
        email,
        phone,

        schoolId,
      },
    });

    return NextResponse.json(loginRequest);
  } catch (error) {
    console.log("[LOGINREQUESTS_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
