"use client";
import { Button } from "@/components/ui/button";
import { Category } from "@prisma/client";
import axios from "axios";
import React, { FC, useState } from "react";
import { toast } from "react-hot-toast";

const CreateTeacher: FC<{
  email: string;
  name: string;
  categories: Category[];
  schoolId: string;
  address: string;
}> = ({ name, categories, email, schoolId, address }) => {
  const toastMessage = "Teacher created.";

  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    const formattedCategories = categories.map((category) => category.id); // Removed unnecessary spread operator
    const data = new FormData();
    data.append("email", email);
    data.append("name", name);
    data.append("password", address);
    data.append("categories", JSON.stringify(formattedCategories));

    try {
      setLoading(true);
      const response = await axios.post(`/api/${schoolId}/teacher`, data);

      if (response.status === 200) {
        toast.success(toastMessage);
        window.location.assign(`/${schoolId}/loginRequests`);
      } else {
        toast.error("Something went wrong.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <Button onClick={() => onSubmit()} disabled={loading}>
      Add User
    </Button>
  );
};

export default CreateTeacher;
