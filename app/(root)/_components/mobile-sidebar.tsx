import { Menu } from "lucide-react";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import NavbarLinks from "./navbar-links";

export const MobileSidebar = () => {
  return (
    <Sheet>
      <SheetTrigger className="md:hidden pr-4 hover:opacity-75 transition">
        <Menu />
      </SheetTrigger>
      <SheetContent side="left" className="py-5 space-y-5">
        <NavbarLinks className="flex-col" />
      </SheetContent>
    </Sheet>
  );
};
