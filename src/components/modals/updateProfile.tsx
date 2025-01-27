"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

import axiosInstance from "@/lib/axiosInstance";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";
import { HoverBorderGradient } from "../ui/hover-border-gradient";
import { useToast } from "@/hooks/use-toast";
import { updateProfileSchema } from "@/schemas/signUpSchema";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Loader2 } from "lucide-react";

export default function UpdateProfile() {

  const [open, setOpen] = useState(false);
  const userId = localStorage.getItem("userId");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<z.infer<typeof updateProfileSchema>>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      username: "",
      address: "",
      phone: "",
    },
  });
  const { toast } = useToast();
  const handleSave = async (data: z.infer<typeof updateProfileSchema>) => {
    setIsSubmitting(true);
    try {
      console.log("d",data)
      const response = await axiosInstance.put(
        `/api/user/updateuser/${userId}`,
        {
          name: data.username,
          address: data.address,
          phone: data.phone,
        }
      );
      if (response.status == 200) {
        toast({
          description: "success",
          title: response?.data?.message,
          variant: "default",
        });
      }
    } catch (err) {
    } finally {
      setIsSubmitting(false);
      setOpen(false);
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild className="text-xs sm:text-normal">
        <HoverBorderGradient>
          <p onClick={() => setOpen(true)}>Edit Profile</p>
        </HoverBorderGradient>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSave)}
          className="grid gap-4 py-4"
        >
          <FormField
              name="username"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <Input
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                    }}
                  />

                  <FormMessage />
                </FormItem>
              )}
            />
          <FormField
              name="phone"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <Input
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                    }}
                    name="phone"
                  />

                  <FormMessage />
                </FormItem>
              )}
            />
          <FormField
              name="address"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <Input
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                    }}
                    name="address"
                  />

                  <FormMessage />
                </FormItem>
              )}
            />
          <Button type="submit" className='w-full bg-black rounded-[8px] text-white hover:text-black hover:border' disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  Please wait..
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                </>
              ) : (
                <p>Save changes</p>
              )}
            </Button>
        </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
