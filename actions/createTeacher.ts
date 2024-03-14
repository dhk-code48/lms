"use server";

import prismadb from "@/lib/prismadb";
import bcrypt from "bcryptjs";

export const createTeacher = async ({
  categories,
  email,
  name,
  password,
  schoolId,
}: {
  schoolId: string;
  name: string;
  email: string;
  password: string;
  categories: string[];
}) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 12);
    await prismadb.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: "TEACHER",
        schoolId,
        categories: categories,
      },
    });
    await prismadb.loginRequest.deleteMany({
      where: {
        email,
      },
    });
  } catch (error) {
    return { error: "Something went wrong " + error };
  }

  return { success: "Teacher Created Success" };
};
