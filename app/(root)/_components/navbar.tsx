"use client";
import { Logo } from "@/components/logo";
import {
  HoveredLink,
  Menu,
  MenuItem,
  ProductItem,
} from "@/components/ui/navbar-menu";
import { cn } from "@/lib/utils";
import { useState } from "react";
import NavbarAction from "./navbar-actions";

export function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  return (
    <div
      className={cn(
        "fixed bg-background w-screen top-0 inset-x-0 z-50",
        className
      )}
    >
      <div className="flex container justify-between">
        <Logo />
        <Menu setActive={setActive}>
          <HoveredLink href="/">Home</HoveredLink>
          <HoveredLink href="/books">Books</HoveredLink>
          <HoveredLink href="/about">About Us</HoveredLink>
          <HoveredLink href="/contact">Contact Us</HoveredLink>
        </Menu>
        <NavbarAction />
      </div>
    </div>
  );
}
