"use client";

import * as React from "react";
import { Check, ChevronsUpDown, PlusCircle, Store } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useParams, useRouter } from "next/navigation";

type PopoverTriggerProps = React.ComponentPropsWithoutRef<
  typeof PopoverTrigger
>;

interface StoreSwitcherProps extends PopoverTriggerProps {
  items: Record<string, any>[];
}

export default function StoreSwitcher({
  className,
  items = [],
}: StoreSwitcherProps) {
  const params = useParams();
  const router = useRouter();

  const formattedItems = items.map((item) => ({
    label: item.name,
    value: item.id,
  }));

  const currentStore = formattedItems.find(
    (item) => item.value === params.storeId
  );

  return (
    <div>
      <Button
        variant="outline"
        size="sm"
        aria-label="Select a store"
        className={cn("w-[200px] justify-between", className)}
      >
        <Store className="mr-2 h-4 w-4" />
        {currentStore?.label}
        <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
      </Button>
    </div>
  );
}
