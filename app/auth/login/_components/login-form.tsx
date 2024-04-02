"use client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import React, { useEffect, useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { v4 as uuid } from "uuid";
import { redirect, useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";

import { LoginSchema } from "@/schemas";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { login } from "@/actions/login";
import { useCookies } from "react-cookie";
import { getUserByEmail } from "@/actions/user";
import prismadb from "@/lib/prismadb";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const LoginForm = ({ className, ...props }: UserAuthFormProps) => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // const [setLocalStore, setLocalStoreState] = useState<boolean | string>(false);

  const [uniqueLoginId, setUniqueLoginId] = useState<string>("");

  const randomUid = uuid();

  useEffect(() => {
    const localUniqueLoginId = window.localStorage.getItem("loginDevice");
    if (localUniqueLoginId) {
      setUniqueLoginId(localUniqueLoginId);
    } else {
      window.localStorage.setItem("loginDevice", randomUid);
      setUniqueLoginId(randomUid);
    }
  }, []);

  // useEffect(() => {
  //   console.log(setLocalStore);
  //   setLocalStore && window.localStorage.setItem("loginDevice", "true");
  // }, [setLocalStore]);

  const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      login(values, uniqueLoginId)
        .then((data) => {
          if (data?.error) {
            form.reset();
            setError(data.error);
          }
          if (data?.success) {
            form.reset();
            setSuccess(data.success);
          }
        })
        .catch((error) => setError("Something went wrong " + error));
    });
  };

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="swarnim@gmail.com"
                      type="email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isPending} placeholder="******" type="password" />
                  </FormControl>
                  <Button size="sm" variant="link" asChild className="px-0 font-normal">
                    <Link href="/auth/reset">Forgot password?</Link>
                  </Button>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button disabled={isPending} type="submit" className="w-full">
            Login
          </Button>
        </form>
        <Button
          disabled={isPending}
          onClick={() => window.location.assign("/")}
          variant="outline"
          className="w-full"
        >
          Go Back
        </Button>
      </Form>
    </div>
  );
};

export default LoginForm;
