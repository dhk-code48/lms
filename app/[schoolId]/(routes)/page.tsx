import { auth } from "@/auth";
import { redirect } from "next/navigation";
import React, { FC } from "react";

const SchoolPage: FC<{ params: { schoolId: string } }> = async ({ params }) => {
  const session = await auth();

  if (!session) {
    redirect("/auth/login");
  } else {
    redirect(`/${params.schoolId}/${session.user.role.toLowerCase()}`);
  }

  return <div>SchoolPage</div>;
};

export default SchoolPage;
