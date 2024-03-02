import { Input } from "@/components/ui/input";
import { ParallaxScroll } from "@/components/ui/parallax-scroll";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Category } from "@prisma/client";
import React, { FC } from "react";

const BookFilter: FC<{ categories: Category[] }> = ({ categories }) => {
  return (
    <div className="flex items-center gap-x-3">
      <Input placeholder="Search Books ..." />
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Sort By Subject" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Subjects</SelectLabel>
            {categories &&
              categories.map((category) => (
                <SelectItem value={category.id}>{category.name}</SelectItem>
              ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default BookFilter;
