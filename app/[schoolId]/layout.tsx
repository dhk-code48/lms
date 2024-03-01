import { redirect } from "next/navigation";

import { Navbar } from "@/components/navbar";
import prismadb from "@/lib/prismadb";
import { auth } from "@/auth";
import { Sidebar } from "@/components/sidebar";

export default async function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { schoolId: string };
}) {
  const session = auth();

  if (!session) {
    redirect("/sign-in");
  }

  const school = await prismadb.school.findFirst({
    where: {
      id: params.schoolId,
    },
  });

  if (!school) {
    redirect("/");
  }

  return (
    <>
      <div className="grid min-h-screen w-full lg:grid-cols-[250px_1fr]">
        <Sidebar schoolId={params.schoolId} />
        <div className="flex flex-col">
          <Navbar />
          <main className="h-full max-w-[calc(100vw-280px)] overflow-x-scroll">
            {children}
          </main>
        </div>
      </div>
    </>
  );
}
