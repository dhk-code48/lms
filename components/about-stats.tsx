import React from "react";
import { TextGenerateEffect } from "./ui/text-generate-effect";

const AboutStats = ({
  totalBooks,
  totalSchools,
  totalSubjects,
}: {
  totalBooks: number;
  totalSchools: number;
  totalSubjects: number;
}) => {
  return (
    <div className="py-12 lg:py-16 bg-background border-y">
      <div className="container px-4 md:px-6">
        <div className="grid  items-center gap-4 lg:grid-cols-3 text-center lg:gap-8">
          <div className="space-y-2">
            <TextGenerateEffect
              words={totalBooks.toString()}
              className="-tracking-widest text-5xl font-bold text-primary"
            />
            <h3 className="text-2xl font-semibold">Books</h3>
          </div>
          <div>
            <TextGenerateEffect
              words={totalSubjects.toString()}
              className="-tracking-widest text-5xl font-bold text-primary"
            />
            <h3 className="text-2xl font-semibold">Subjects</h3>
          </div>
          <div>
            <TextGenerateEffect
              words={totalSchools.toString()}
              className="-tracking-widest text-5xl font-bold text-primary"
            />
            <h3 className="text-2xl font-semibold">Partner Schools</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutStats;
