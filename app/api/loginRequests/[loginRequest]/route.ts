import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { auth } from "@/auth";

export async function DELETE(req: Request, { params }: { params: { loginRequestId: string } }) {
  try {
    const session = await auth();

    if (!session) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!params.loginRequestId) {
      return new NextResponse("loginRequest id is required", { status: 400 });
    }

    if (session.user.role !== "SUPERADMIN") {
      return new NextResponse("Unauthorized", { status: 405 });
    }

    const loginRequest = await prismadb.loginRequest.delete({
      where: {
        id: params.loginRequestId,
      },
    });

    return NextResponse.json(loginRequest);
  } catch (error) {
    console.log("[loginRequest_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
