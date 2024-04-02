import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LogInIcon, User } from "lucide-react";
import Link from "next/link";
import React from "react";

const NavbarAction = ({ className }: { className: string }) => {
  return (
    <div className={cn("flex items-center gap-x-3", className)}>
      <ThemeToggle />
      <Link href="/auth/login">
        <Button className="gap-x-2" variant="ghost">
          Login <LogInIcon size={16} />
        </Button>
      </Link>
      <Link href="/loginRequests">
        <Button className="gap-x-2">
          Request Login <User size={16} />
        </Button>
      </Link>
    </div>
  );
};

export default NavbarAction;
