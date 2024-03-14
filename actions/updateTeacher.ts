"use server";

import prismadb from "@/lib/prismadb";
import bcrypt from "bcryptjs";

export const updateTeacher = async ({ id }: { id: string }) => {
  try {
    await prismadb.user.update({
      where: { id },
      data: {
        loginDevice: id,
      },
    });
  } catch (error) {
    return { error: "Something went wrong " + error };
  }

  return { success: "Teacher Created Success" };
};
