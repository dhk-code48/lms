import { redirect } from "next/navigation";

import prismadb from "@/lib/prismadb";
import { auth } from "@/auth";
import { Navbar } from "./_components/navbar";

export default async function SetupLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  const school = await prismadb.school.findFirst();

  if (session) {
    session.user.role === "TEACHER"
      ? redirect(`/${session.user.schoolId}/teacher`)
      : redirect(`/${school?.id}/superadmin`);
  }

  return (
    <div>
      <Navbar className="h-20" />

      <main className="min-h-screen pt-20"> {children}</main>
    </div>
  );
}
