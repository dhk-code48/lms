"use server";
// login.ts
import { LoginSchema } from "@/schemas";
import { signIn } from "@/auth";
import * as z from "zod";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import bcrypt from "bcryptjs";
import { updateTeacher } from "./updateTeacher";
import prismadb from "@/lib/prismadb";

export const login = async (values: z.infer<typeof LoginSchema>, loginDevice: string) => {
  const validatedFields = LoginSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid Data" };
  }

  const { email, password } = validatedFields.data;
  const userByEmail = await prismadb.user.findFirst({ where: { email } });

  try {
    if (userByEmail && userByEmail.password) {
      const correctPass = await bcrypt.compare(values.password, userByEmail.password);
      if (correctPass) {
        if (userByEmail.role === "TEACHER") {
          if (userByEmail.loginDevice) {
            if (userByEmail.loginDevice === loginDevice) {
              await signIn("credentials", {
                email,
                password,
                redirectTo: DEFAULT_LOGIN_REDIRECT,
              });
              return { success: "Login Success" };
            } else {
              return { error: "Cann't Login In Multiple Devices" };
            }
          } else {
            await updateTeacher({ id: userByEmail.id, loginDevice });
            await signIn("credentials", {
              email,
              password,
              redirectTo: DEFAULT_LOGIN_REDIRECT,
            });
            return { success: "Login Success" };
          }
        } else {
          await signIn("credentials", {
            email,
            password,
            redirectTo: DEFAULT_LOGIN_REDIRECT,
          });
          return { success: "Login Success" };
        }
      } else {
        return { error: "Invalid Credentials" };
      }
    } else {
      return { error: "User not found" };
    }
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid Credentials" };
        default:
          return { error: "Something went wrong" };
      }
    }

    throw error;
  }
};
