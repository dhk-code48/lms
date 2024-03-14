import { UserRole } from "@prisma/client";
import { DefaultSession } from "next-auth";

export type ExtendedUser = DefaultSession["user"] & {
  role: UserRole;
  schoolId: string;
  categories: string[];
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}
