import { HoveredLink } from "@/components/ui/navbar-menu";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
      <p className="text-xs text-gray-500 dark:text-gray-400">
        © {new Date().getFullYear()} Swarnim Publication. All rights reserved.
      </p>
      <nav className="sm:ml-auto flex gap-4 sm:gap-6">
        <HoveredLink href="/">Home</HoveredLink>
        <HoveredLink href="/books">Books</HoveredLink>
        <HoveredLink href="/about">About Us</HoveredLink>{" "}
        <Link
          className="dark:text-neutral-200 bg-transparent hover:bg-primary px-2 rounded-lg hover:font-semibold"
          target="_blank"
          href="https://swarnimpublication.com.np/document/1/download"
        >
          Catalogue
        </Link>
      </nav>
    </footer>
  );
};

export default Footer;
