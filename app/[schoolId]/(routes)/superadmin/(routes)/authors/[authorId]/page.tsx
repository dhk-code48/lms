import prismadb from "@/lib/prismadb";

import { AuthorForm } from "./_components/author-form";

const AuthorPage = async ({ params }: { params: { authorId: string; schoolId: string } }) => {
  const author = await prismadb.author.findUnique({
    where: {
      id: params.authorId,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4">
        <AuthorForm initialData={author} />
      </div>
    </div>
  );
};

export default AuthorPage;
