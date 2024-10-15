"use client";
import React, { useState, useTransition } from "react";
import CardWrapper from "./CardWrapper";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormField,
} from "@/components/ui/form";
import { ResetPasswordSchema } from "@/schemas/index";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import FormError from "./FormError";
import FormSuccess from "./FormSuccess";
import { useSearchParams } from "next/navigation";
import { newPassword } from "@/actions/newPassword";

export default function ResetPasswordForm() {
  const [isPending, startTransition] = useTransition();
  const [errors, setErrors] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  //useForm hook
  const form = useForm<z.infer<typeof ResetPasswordSchema>>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      password: "",
    },
  });

  //submit handle
  function onSubmit(values: z.infer<typeof ResetPasswordSchema>) {
    setSuccess("");
    setErrors("");
    startTransition(() =>
      newPassword(values, token).then((data) => {
        setErrors(data?.error);
        setSuccess(data?.success);
      })
    );
  }
  return (
    <CardWrapper
      headerLabel="Enter a new Password"
      backButtonLabel="Back to Login"
      backButtonHref="/auth/login"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      {...field}
                      placeholder="Min. 6 characters"
                      type="password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormSuccess message={success} />
          <FormError message={errors} />
          <Button type="submit" className="w-full" disabled={isPending}>
            Send a Reset Password
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
}
