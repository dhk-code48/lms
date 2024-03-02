import prismadb from "@/lib/prismadb";

import { LoginRequestForm } from "./_components/loginRequest-form";
import { BackgroundBeams } from "@/components/ui/background-beams";

const BookPage = async ({ params }: { params: { bookId: string; schoolId: string } }) => {
  const categories = await prismadb.category.findMany({
    where: {
      schoolId: params.schoolId,
    },
  });

  const schools = await prismadb.school.findMany({});

  return (
    <div className="min-h-screen w-full rounded-md bg-neutral-950 relative flex flex-col items-center justify-start antialiased">
      <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <LoginRequestForm categories={categories} schools={schools} />
        </div>
      </div>
      {/* <BackgroundBeams /> */}
    </div>
  );
};

export default BookPage;
