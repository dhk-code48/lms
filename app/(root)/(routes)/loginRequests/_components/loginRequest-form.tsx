"use client";

import * as z from "zod";
import axios from "axios";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Trash } from "lucide-react";
import { Author, Book, Category, School } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { Heading } from "@/components/ui/heading";
import { AlertModal } from "@/components/modals/alert-modal";
import MultiSelect from "react-select";

import ImageUpload from "@/components/ui/image-upload";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTheme } from "next-themes";

const formSchema = z.object({
  name: z.string().min(1),
  email: z.string().min(1),
  phone: z.string().min(1),
  address: z.string().min(1),
  schoolId: z.string().min(1),
  categories: z.array(z.string().min(1)).min(1, {
    message: "Minimun of 1 section required",
  }),
});

type ProductFormValues = z.infer<typeof formSchema>;

interface BookFormProps {
  categories: Category[] | null;
  schools: School[] | null;
}

export const LoginRequestForm: React.FC<BookFormProps> = ({ categories, schools }) => {
  const [loading, setLoading] = useState(false);

  const title = "Request Access";
  const description =
    "Welcome esteemed educators to Lorem Publication's exclusive teacher portal! We understand the pivotal role teachers play in nurturing the minds of tomorrow's leaders, which is why we are thrilled to offer you access to a wealth of educational resources designed to enrich your teaching experience.";
  const toastMessage = "Request Succesfully Sended.";
  const action = "Send Request";

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: ProductFormValues) => {
    try {
      setLoading(true);
      await axios.post(`/api/loginRequests`, data);

      toast.success(toastMessage);
      window.location.assign(window.location.pathname);
    } catch (error: any) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const [categoryOptions, setCategoryOptions] = useState<{ label: string; value: string }[]>([]);

  useEffect(() => {
    setCategoryOptions([]);
    categories &&
      categories.map((category) => {
        setCategoryOptions((prev) => [...prev, { label: category.name, value: category.id }]);
      });
  }, [categories]);

  const { resolvedTheme } = useTheme();

  return (
    <>
      <div className="mb-10">
        <h1 className="relative z-10 text-lg md:text-7xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 leading-loose text-center font-sans font-bold">
          {title}
        </h1>
        <p className="text-neutral-500 max-w-lg mx-auto my-2 text-sm text-center relative z-10">
          {description}
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
          <div className="space-y-8 z-50">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="Your's name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="Your Email" type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Your Phone number"
                      type="text"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="Your address" type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="categories"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categories / Subjects</FormLabel>
                  <FormControl>
                    <MultiSelect
                      className=" dark:text-white text-black border rounded"
                      theme={(theme) => ({
                        ...theme,
                        borderRadius: 0,
                        colors: {
                          ...theme.colors,
                          neutral0: resolvedTheme === "dark" ? "black" : theme.colors.neutral0,
                          primary25: "gray",
                          primary: "black",
                        },
                      })}
                      options={categoryOptions}
                      isMulti
                      onChange={(e) => form.setValue("categories", [...e.map((p) => p.value)])}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="schoolId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>School</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a School" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {schools &&
                        schools.map((school) => (
                          <SelectItem key={school.id} value={school.id}>
                            {school.name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className="w-full" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};
