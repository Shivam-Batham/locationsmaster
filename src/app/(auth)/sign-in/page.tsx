"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast"
import { signInSchema } from "@/schemas/signInSchema";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import axiosInstance from "@/lib/axiosInstance";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";

export default function SignInForm() {
  const router = useRouter();
  const [user,setUser] = useState()
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.post("/api/user/login", data);
      if (response.status == 200) {
          localStorage.setItem("userId", response.data.user._id);
          localStorage.setItem("token", `${response.data.accessToken}`);
        toast({
          title: "success",
          description: response.data.message,
          variant: "default",
        });
        router.replace("/dashboard");
      }
    } catch (error) {
      toast({
        title: error instanceof Error ? error.message : "An error occurred",
        description: "Try again later.",
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <BackgroundBeamsWithCollision className="bg-gradient-to-b ">
    <div className="flex justify-center items-center min-h-screen">
      <div className=" w-full max-w-md p-8 space-y-8 bg-white rounded-[8px] shadow-md">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
            Welcome To the Location Master
          </h1>
          <p className="mb-4">Sign in to continue your journey</p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              name="identifier"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email/Username</FormLabel>
                  <Input {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <Input type="password" {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-center">
              {isLoading ? (
                <Button disabled className="w-full bg-black rounded-[8px] text-white hover:text-black hover:border">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin bg-white" />
                  Please wait
                </Button>
              ) : (
                <Button className="w-full bg-black rounded-[8px] text-white hover:text-black hover:border"
                  type="submit" disabled={isLoading}>
                  Sign In
                </Button>
              )}
            </div>
          </form>
        </Form>
        <div className="text-center mt-4">
          <p>
            Not a member yet?{" "}
            <Link href="/sign-up" className="text-blue-600 hover:text-blue-800">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
    </BackgroundBeamsWithCollision>
  );
}
