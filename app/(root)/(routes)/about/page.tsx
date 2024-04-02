import { getInfo } from "@/actions/about";
import AboutStats from "@/components/about-stats";
import ContactUsSection from "@/components/contact-us-section";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import Image from "next/image";
import React from "react";

const HomeAbout = async () => {
  const about = await getInfo();
  return (
    <>
      <div className="dark:bg-slate-900 bg-gray-50 py-12 lg:py-16">
        <div className="container px-4 md:px-6">
          <div className="grid items-center gap-4 lg:grid-cols-2 lg:gap-8">
            <div className="flex flex-col justify-center space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                About Swarnim Publication
              </h2>
              <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                Swarnim Publication is dedicated to providing high-quality educational resources for
                students. Our mission is to make learning more accessible and engaging by publishing
                books that complement the curriculum and inspire academic excellence.
              </p>
            </div>
            <img
              alt="About"
              className="mx-auto rounded-lg object-cover"
              height="400"
              src="/swarnim.jpg"
              style={{
                aspectRatio: "700/400",
                objectFit: "cover",
              }}
              width="700"
            />
          </div>
        </div>
      </div>{" "}
      {about && (
        <AboutStats
          totalBooks={about.totalBooks}
          totalSchools={about.totalSchools}
          totalSubjects={about.totalSubjects}
        />
      )}
      <div className="py-12 lg:py-16">
        <div className="container px-4 md:px-6">
          <div className="grid items-center gap-4 lg:grid-cols-2 lg:gap-8">
            <Image
              alt="Education"
              className="mx-auto rounded-lg object-cover"
              height="400"
              src="/swarnim.jpg"
              style={{
                aspectRatio: "700/400",
                objectFit: "cover",
              }}
              width="700"
            />
            <div className="flex flex-col justify-center space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Committed to Students
              </h2>
              <p className="max-w-prose text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                At Swarnim Publication, we are dedicated to supporting students on their educational
                journey. Our books are designed to supplement classroom learning and provide
                valuable insights into the subjects. We believe in the power of knowledge and strive
                to inspire a love for learning in every student.
              </p>
            </div>
          </div>
        </div>
      </div>
      <ContactUsSection />
    </>
  );
};

export default HomeAbout;
