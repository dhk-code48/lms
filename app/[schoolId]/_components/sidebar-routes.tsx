"use client";

import {
  Book,
  BookA,
  BookMarked,
  Compass,
  Diamond,
  Gem,
  Layout,
  LogInIcon,
  Notebook,
  User,
  Users2,
} from "lucide-react";
import { usePathname } from "next/navigation";

import { SidebarItem } from "./sidebar-item";
import { FC } from "react";

export const SidebarRoutes: FC<{ schoolId: string }> = ({ schoolId }) => {
  const guestRoutes = [
    {
      icon: Gem,
      label: "Premium Books",
      href: `/${schoolId}/teacher/books`,
    },
    {
      icon: BookA,
      label: "All Books",
      href: `/${schoolId}/teacher/allBooks`,
    },
  ];

  const superAdminRoutes = [
    {
      icon: Layout,
      href: `/${schoolId}/superadmin`,
      label: "Dashboard",
    },
    {
      icon: Book,
      href: `/${schoolId}/superadmin/books`,
      label: "Books",
    },
    {
      icon: User,
      href: `/${schoolId}/superadmin/authors`,
      label: "Authors",
    },
    {
      icon: Notebook,
      href: `/${schoolId}/superadmin/categories`,
      label: "Category",
    },
    {
      icon: LogInIcon,
      href: `/${schoolId}/superadmin/loginRequests`,
      label: "Login Requests",
    },
    {
      icon: Users2,
      label: "Teachers",
      href: `/${schoolId}/superadmin/teachers`,
    },
  ];

  const pathname = usePathname();

  const isTeacher = pathname?.includes("/teacher");

  const routes = isTeacher ? guestRoutes : superAdminRoutes;

  return (
    <div className="flex flex-col w-full gap-y-1">
      {routes.map((route) => (
        <SidebarItem href={route.href} icon={route.icon} label={route.label} key={route.label} />
      ))}
    </div>
  );
};
