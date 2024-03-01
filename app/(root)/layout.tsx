import { redirect } from "next/navigation";

import prismadb from "@/lib/prismadb";
import { auth } from "@/auth";

export default async function SetupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) {
    redirect("/auth/login");
  }

  // const school = await prismadb.school.findFirst({
  //   where: {
  //     name: "GBS",
  //   },
  // });

  return <>{children}</>;
}
