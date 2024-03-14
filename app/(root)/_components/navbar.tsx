import { Logo } from "@/components/logo";
import { HoveredLink } from "@/components/ui/navbar-menu";
import { cn } from "@/lib/utils";
import NavbarAction from "./navbar-actions";

export function Navbar({ className }: { className?: string }) {
  return (
    <div className={cn("fixed bg-background w-screen top-0 inset-x-0 z-50", className)}>
      <div className="flex container justify-between">
        <Logo />
        <div className="flex items-center justify-center gap-x-2">
          <HoveredLink href="/">Home</HoveredLink>
          <HoveredLink href="/books">Books</HoveredLink>
          <HoveredLink href="/about">About Us</HoveredLink>
        </div>
        <NavbarAction />
      </div>
    </div>
  );
}
