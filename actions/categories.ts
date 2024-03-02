"use server";

import prismadb from "@/lib/prismadb";

export async function fetchCategories() {
  const categories = await prismadb.category.findMany();
  return categories;
}
