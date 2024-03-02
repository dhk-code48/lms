"use client";

import * as z from "zod";
import axios from "axios";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Trash } from "lucide-react";
import { Author, Book, Category } from "@prisma/client";
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
import { AlertModal } from "@/components/alert-modal";
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
  imageUrl: z.string().min(1),
  price: z.string().min(1),
  isPurchased: z.boolean(),
  pdfLink: z.string().min(1),
  guidePdfLink: z.string().min(1),
  totalPages: z.string().min(1),
  premiumLink: z.string().min(1),
  categoryId: z.string().min(1),
  authors: z.array(z.string().min(1)).min(1, {
    message: "Minimun of 1 section required",
  }),
});

type ProductFormValues = z.infer<typeof formSchema>;

interface BookFormProps {
  initialData: (Book & { authors: Author[] }) | null;
  authors: Author[] | null;

  categories: Category[] | null;
}

export const BookForm: React.FC<BookFormProps> = ({ initialData, authors, categories }) => {
  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? "Edit Book" : "Create Book";
  const description = initialData ? "Edit a Book." : "Add a new Book";
  const toastMessage = initialData ? "Book updated." : "Book created.";
  const action = initialData ? "Save changes" : "Create";

  const defaultValues = {
    name: initialData ? initialData.name : "",
    imageUrl: initialData ? initialData.imageUrl : "",
    price: initialData ? initialData.price : "",
    isPurchased: initialData ? initialData.isPurchased : false,
    pdfLink: initialData ? initialData.pdfLink : "",
    guidePdfLink: initialData ? initialData.guidePdfLink : "",
    totalPages: initialData ? initialData.totalPages : "",
    premiumLink: initialData ? initialData.premiumLink : "",
    categoryId: initialData ? initialData.categoryId : "",
    authors: [""],
  };

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit = async (data: ProductFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(`/api/${params.schoolId}/books/${params.bookId}`, data);
      } else {
        await axios.post(`/api/${params.schoolId}/books`, data);
      }
      toast.success(toastMessage);
      window.location.assign(`/${params.schoolId}/superadmin/books`);
    } catch (error: any) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/${params.schoolId}/books/${params.bookId}`);
      toast.success("Book deleted.");
      window.location.assign(`/${params.schoolId}/superadmin/books`);
    } catch (error: any) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  const [authorOptions, setAuthorOptions] = useState<{ label: string; value: string }[]>([]);
  const [defaultOptions, setDefaultOptions] = useState<{ label: string; value: string }[]>([]);

  const { resolvedTheme } = useTheme();

  useEffect(() => {
    setAuthorOptions([]);
    authors &&
      authors.map((author) => {
        setAuthorOptions((prev) => [...prev, { label: author.name, value: author.id }]);
      });
  }, [authors]);

  useEffect(() => {
    const authorIds = initialData ? initialData.authors.map((author) => author.id) : [""];
    form.setValue("authors", authorIds);
  }, [initialData]);

  useEffect(() => {
    console.log("DEFAULT OPTION => ", defaultOptions);
  }, [defaultOptions]);

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData && (
          <Button disabled={loading} variant="destructive" size="sm" onClick={() => setOpen(true)}>
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cover</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value ? [field.value] : []}
                    disabled={loading}
                    onChange={(url) => field.onChange(url)}
                    onRemove={() => field.onChange("")}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="md:grid md:grid-cols-3 gap-y-8 gap-x-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="Book name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input type="text" disabled={loading} placeholder="9.99" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="totalPages"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Total Pages</FormLabel>
                  <FormControl>
                    <Input type="text" disabled={loading} placeholder="645" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="guidePdfLink"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Guide Pdf Link</FormLabel>
                  <FormControl>
                    <Input type="text" disabled={loading} placeholder="https://" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="pdfLink"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pdf Link</FormLabel>
                  <FormControl>
                    <Input type="text" disabled={loading} placeholder="https://" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="premiumLink"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Premium Link</FormLabel>
                  <FormControl>
                    <Input type="text" disabled={loading} placeholder="https://" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="authors"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Authors</FormLabel>
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
                      defaultValue={initialData?.authors.map((author) => ({
                        label: author.name,
                        value: author.id,
                      }))}
                      options={authorOptions}
                      isMulti
                      onChange={(e) => form.setValue("authors", [...e.map((p) => p.value)])}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a Category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories &&
                        categories.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isPurchased"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Is Purchased</FormLabel>
                  <FormControl className="ml-2">
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      defaultChecked={initialData ? initialData.isPurchased : false}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};
