import { UserRole } from "@prisma/client";
import { DefaultSession } from "next-auth";

export type ExtendedUser = DefaultSession["user"] & {
  role: UserRole;
  schoolId: string;
  categoryId: string;
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}
