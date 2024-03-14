"use server";

import { auth } from "@/auth";
import prismadb from "@/lib/prismadb";
import { SchoolSchema } from "@/schemas";
import * as z from "zod";

export const createSchool = async (values: z.infer<typeof SchoolSchema>) => {
  const validatedFields = SchoolSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalidate Data" };
  }

  const { name } = validatedFields.data;

  const session = await auth();
  if (!session) {
    return { error: "UnAuthenticated" };
  }

  if (session.user.role !== "SUPERADMIN" || !session.user.id) {
    return { error: "UnAuthenticated" };
  }

  try {
    await prismadb.school.create({
      data: {
        name,
        userId: session.user.id,
      },
    });
  } catch (error) {
    return { error: "Something went wrong " + error };
  }

  return { success: "School Created Success" };
};
