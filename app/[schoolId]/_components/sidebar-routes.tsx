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
import { useParams, usePathname } from "next/navigation";

import { SidebarItem } from "./sidebar-item";
import { FC } from "react";

export const SidebarRoutes: FC = () => {
  const params = useParams();
  const guestRoutes = [
    {
      icon: Gem,
      label: "Premium Books",
      href: `/${params.schoolId}/teacher/books`,
    },
    {
      icon: BookA,
      label: "All Books",
      href: `/${params.schoolId}/teacher/allBooks`,
    },
  ];

  const superAdminRoutes = [
    {
      icon: Layout,
      href: `/${params.schoolId}/superadmin`,
      label: "Dashboard",
    },
    {
      icon: Book,
      href: `/${params.schoolId}/superadmin/books`,
      label: "Books",
    },
    {
      icon: User,
      href: `/${params.schoolId}/superadmin/authors`,
      label: "Authors",
    },
    {
      icon: Notebook,
      href: `/${params.schoolId}/superadmin/categories`,
      label: "Category",
    },
    {
      icon: LogInIcon,
      href: `/${params.schoolId}/superadmin/loginRequests`,
      label: "Login Requests",
    },
    {
      icon: Users2,
      label: "Teachers",
      href: `/${params.schoolId}/superadmin/teachers`,
    },
  ];

  const pathname = usePathname();

  const isTeacher = pathname?.includes("/teacher") && !pathname?.includes("/teachers");

  const routes = isTeacher ? guestRoutes : superAdminRoutes;

  return (
    <div className="flex flex-col w-full gap-y-1">
      {routes.map((route) => (
        <SidebarItem href={route.href} icon={route.icon} label={route.label} key={route.label} />
      ))}
    </div>
  );
};
