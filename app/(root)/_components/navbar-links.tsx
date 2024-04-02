import React from "react";
import { HoveredLink } from "@/components/ui/navbar-menu";
import NavbarAction from "./navbar-actions";
import { cn } from "@/lib/utils";

const NavbarLinks = ({ className }: { className: string }) => {
  return (
    <>
      <div className={cn("flex flex-wrap items-center justify-center gap-x-2", className)}>
        <HoveredLink href="/">Home</HoveredLink>
        <HoveredLink href="/books">Books</HoveredLink>
        <HoveredLink href="/about">About Us</HoveredLink>
      </div>
      <NavbarAction className={className} />
    </>
  );
};

export default NavbarLinks;
