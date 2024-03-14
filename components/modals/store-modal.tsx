"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import { Modal } from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useStoreModal } from "@/hooks/use-store-modal";
import { Button } from "@/components/ui/button";
import { SchoolSchema } from "@/schemas";
import { createSchool } from "@/actions/createSchool";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";

export const StoreModal = () => {
  const storeModal = useStoreModal();
  const router = useRouter();

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof SchoolSchema>>({
    resolver: zodResolver(SchoolSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof SchoolSchema>) => {
    setError("");

    setSuccess("");
    startTransition(() => {
      createSchool(values)
        .then((data) => {
          if (data?.error) {
            form.reset();
            setError(data.error);
          }
          if (data?.success) {
            form.reset();
            window.location.assign(window.location.pathname);
            setSuccess(data.success);
          }
        })
        .catch((error) => setError("Something went wrong " + error));
    });
  };

  return (
    <Modal
      title="Create School"
      description="Add a new school to manage books"
      isOpen={storeModal.isOpen}
      onClose={storeModal.onClose}
    >
      <div>
        <div className="space-y-4 py-2 pb-4">
          <div className="space-y-2">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input disabled={isPending} placeholder="School Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormError message={error} />
                <FormSuccess message={success} />
                <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                  <Button disabled={isPending} variant="outline" onClick={storeModal.onClose}>
                    Cancel
                  </Button>
                  <Button disabled={isPending} type="submit">
                    Continue
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </Modal>
  );
};
