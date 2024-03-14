"use server";

import prismadb from "@/lib/prismadb";

export const deleteLoginRequest = async ({ id }: { id: string }) => {
  try {
    await prismadb.loginRequest.delete({
      where: {
        id,
      },
    });
  } catch (error) {
    return { error: "Something went wrong " + error };
  }

  return { success: "Login Request Deleated Successfully" };
};
