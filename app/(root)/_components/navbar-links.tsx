import React from "react";
import { HoveredLink } from "@/components/ui/navbar-menu";
import NavbarAction from "./navbar-actions";
import { cn } from "@/lib/utils";
import Link from "next/link";

const NavbarLinks = ({ className }: { className: string }) => {
  return (
    <>
      <div
        className={cn(
          "flex flex-wrap items-center justify-center gap-x-2",
          className
        )}
      >
        <HoveredLink href="/">Home</HoveredLink>
        <HoveredLink href="/books">Books</HoveredLink>
        <HoveredLink href="/about">About Us</HoveredLink>
        <Link
          className="dark:text-neutral-200 bg-transparent hover:bg-primary px-2 rounded-lg hover:font-semibold"
          target="_blank"
          href="https://swarnimpublication.com.np/document/1/download"
        >
          Catalogue
        </Link>
      </div>
      <NavbarAction className={className} />
    </>
  );
};

export default NavbarLinks;
