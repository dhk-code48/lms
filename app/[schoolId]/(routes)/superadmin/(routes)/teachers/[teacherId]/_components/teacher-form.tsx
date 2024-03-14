"use client";

import * as z from "zod";
import axios from "axios";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Trash } from "lucide-react";
import { School, User } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";
import MultiSelect from "react-select";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { Heading } from "@/components/ui/heading";
import { AlertModal } from "@/components/modals/alert-modal";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  name: z.string().min(2),
  email: z.string().min(1),
  password: z.string().min(1),
  schoolId: z.string().min(1),
  categories: z.array(z.string().min(1)).min(1, {
    message: "Minimun of 1 section required",
  }),
});

type TeacherFormValues = z.infer<typeof formSchema>;

interface AuthorFormProps {
  initialData: User | null;
  schools: School[];
}

export const TeacherForm: React.FC<AuthorFormProps> = ({ initialData, schools }) => {
  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? "Edit teacher" : "Create teacher";
  const description = initialData ? "Edit a teacher." : "Add a new teacher";
  const toastMessage = initialData ? "teacher updated." : "teacher created.";
  const action = initialData ? "Save changes" : "Create";

  const form = useForm<TeacherFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData ? initialData.name ?? "" : "",
      email: initialData ? initialData.email ?? "" : "",
      password: "",
      schoolId: initialData ? initialData.schoolId ?? "" : "",
    },
  });

  const onSubmit = async (data: TeacherFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(`/api/${params.schoolId}/teachers/${params.authorId}`, data);
      } else {
        await axios.post(`/api/${params.schoolId}/teachers`, data);
      }

      toast.success(toastMessage);

      window.location.assign(`/${params.schoolId}/superadmin/teachers`);
    } catch (error: any) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/${params.schoolId}/teachers/${params.authorId}`);

      toast.success("Author deleted.");

      window.location.assign(`/${params.schoolId}/superadmin/teachers`);
    } catch (error: any) {
      toast.error("Make sure you removed all books using this author first.");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  const [categoriesOption, setCategoriesOption] = useState<{ label: string; value: string }[]>([]);

  useEffect(() => {
    setCategoriesOption([]);
    schools.map((school) => {
      setCategoriesOption((prev) => [...prev, { label: school.name, value: school.id }]);
    });
  }, [schools]);

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
          <div className="md:grid md:grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="Teacher name" {...field} />
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
                    <Input disabled={loading} placeholder="Teacher email" {...field} />
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
                    <Input disabled={loading} placeholder="Teacher password" {...field} />
                  </FormControl>
                  <FormMessage />
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
                        <SelectValue placeholder="Select a school" />
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
            <FormField
              control={form.control}
              name="categories"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Assign Section</FormLabel>
                  <FormControl>
                    <MultiSelect
                      options={categoriesOption}
                      isMulti
                      onChange={(e) => form.setValue("categories", [...e.map((p) => p.value)])}
                    />
                  </FormControl>
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
