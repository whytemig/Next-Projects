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
import { ResetSchema } from "@/schemas/index";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import FormError from "./FormError";
import FormSuccess from "./FormSuccess";
import { resetPassword } from "@/actions/reset";

export default function ResetForm() {
  const [isPending, startTransition] = useTransition();
  const [errors, setErrors] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  //useForm hook
  const form = useForm<z.infer<typeof ResetSchema>>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: "",
    },
  });

  //submit handle
  function onSubmit(values: z.infer<typeof ResetSchema>) {
    setSuccess("");
    setErrors("");
    startTransition(() =>
      resetPassword(values).then((data) => {
        setErrors(data?.error);
        setSuccess(data?.success);
      })
    );
  }
  return (
    <CardWrapper
      headerLabel="Reset Password"
      backButtonLabel="Back to Login"
      backButtonHref="/auth/login"
    >
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
                      disabled={isPending}
                      {...field}
                      placeholder="example@email.com"
                      type="email"
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
            Send a Reset Email
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
}
