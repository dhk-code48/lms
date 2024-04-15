import { Logo } from "@/components/logo";
import { cn } from "@/lib/utils";
import NavbarLinks from "./navbar-links";
import { MobileSidebar } from "./mobile-sidebar";

export function Navbar({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "fixed bg-background w-screen top-0 inset-x-0 z-40",
        className
      )}
    >
      <div className="flex container items-center justify-between">
        <Logo />
        <MobileSidebar />
        <NavbarLinks className="md:block hidden" />
      </div>
    </div>
  );
}
