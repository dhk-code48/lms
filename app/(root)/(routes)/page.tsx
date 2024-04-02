import React from "react";
import { HeroParallax } from "@/components/ui/hero-parallax";
import { Header } from "../_components/hero-header";
import prismadb from "@/lib/prismadb";
import { getInfo } from "@/actions/about";
import AboutStats from "@/components/about-stats";
import ContactUsSection from "@/components/contact-us-section";

export default async function HomePage() {
  const books = await prismadb.book.findMany({
    where: {
      schoolId: "0a37800c-73bf-47e3-a79a-d2e1ddb84328",
    },
    take: 15,
  });
  const products = books.map((book) => ({
    title: book.name,
    link: `/books/${book.id}`,
    thumbnail: book.imageUrl,
  }));
  const about = await getInfo();

  return (
    <>
      <HeroParallax header={<Header />} products={products} />{" "}
      {about && (
        <AboutStats
          totalBooks={about.totalBooks}
          totalSchools={about.totalSchools}
          totalSubjects={about.totalSubjects}
        />
      )}
      <ContactUsSection />
    </>
  );
}
