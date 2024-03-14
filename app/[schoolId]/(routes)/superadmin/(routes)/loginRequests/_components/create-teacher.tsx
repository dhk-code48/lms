"use client";
import { Button } from "@/components/ui/button";
import { Category } from "@prisma/client";
import axios from "axios";
import React, { FC, useState, useTransition } from "react";
import { toast } from "react-hot-toast";
import bcrypt from "bcryptjs";
import { createTeacher } from "@/actions/createTeacher";

const CreateTeacher: FC<{
  email: string;
  name: string;
  categories: Category[];
  schoolId: string;
  address: string;
}> = ({ name, categories, email, schoolId, address }) => {
  const [isPending, startTransition] = useTransition();

  const onSubmit = () => {
    const formatedCat = categories.map((cat) => cat.id);

    startTransition(() => {
      createTeacher({ categories: formatedCat, email, name, password: email, schoolId })
        .then((data) => {
          if (data?.error) {
            toast.error(data.error);
          }
          if (data?.success) {
            toast.success(data.success);

            window.location.assign(window.location.pathname);
          }
        })
        .catch(() => toast.error("Something went wrong."));
    });
  };

  return (
    <Button onClick={() => onSubmit()} disabled={isPending}>
      Add User
    </Button>
  );
};

export default CreateTeacher;
