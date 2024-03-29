"use client";
import { useRouter } from "next/navigation";
import React, { FC } from "react";
import { Button } from "./ui/button";
import { MoveLeft } from "lucide-react";

const BackButton: FC = () => {
  const router = useRouter();
  return (
    <Button onClick={() => router.back()} variant="outline">
      <MoveLeft />
    </Button>
  );
};

export default BackButton;
