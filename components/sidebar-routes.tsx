"use client";

import {
  Book,
  Compass,
  Layout,
  LogInIcon,
  Notebook,
  Users2,
} from "lucide-react";
import { usePathname } from "next/navigation";

import { SidebarItem } from "./sidebar-item";
import { FC } from "react";

export const SidebarRoutes: FC<{ schoolId: string }> = ({ schoolId }) => {
  const guestRoutes = [
    {
      icon: Layout,
      label: "Dashboard",
      href: "/superadmin/student",
    },
    {
      icon: Compass,
      href: "/superadmin/student",

      label: "Worksheets",
    },
  ];

  const superAdminRoutes = [
    {
      icon: Layout,
      href: `/`,
      label: "Dashboard",
    },
    {
      icon: Book,
      href: `/books`,
      label: "Books",
    },
    {
      icon: Notebook,
      href: `${schoolId}/subjects`,
      label: "Subjects",
    },
    {
      icon: LogInIcon,
      href: `${schoolId}/loginRequests`,
      label: "Login Requests",
    },
    {
      icon: Users2,
      label: "Teachers",
      href: `${schoolId}/teachers`,
    },
  ];

  const pathname = usePathname();

  const isGuest = pathname?.includes("/dashboard");

  const routes = isGuest ? guestRoutes : superAdminRoutes;

  return (
    <div className="flex flex-col w-full">
      {routes.map((route) => (
        <SidebarItem
          href={route.href}
          icon={route.icon}
          label={route.label}
          key={route.label}
        />
      ))}
    </div>
  );
};
