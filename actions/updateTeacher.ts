"use server";

import prismadb from "@/lib/prismadb";
import bcrypt from "bcryptjs";

export const updateTeacher = async ({ id, loginDevice }: { id: string; loginDevice: string }) => {
  try {
    await prismadb.user.update({
      where: { id },
      data: {
        loginDevice,
      },
    });
  } catch (error) {
    return { error: "Something went wrong " + error };
  }

  return { success: "Teacher Created Success" };
};
