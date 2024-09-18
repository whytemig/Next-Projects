"use client";
import React from "react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { DEFAULT_ROUTE_REDIRECT } from "@/routes";

export default function Social() {
  const onClickProvider = (provider: "google" | "github") => {
    signIn(provider, {
      callbackUrl: DEFAULT_ROUTE_REDIRECT,
    });
  };
  return (
    <div className="flex items-center w-full gap-x-2">
      <Button
        className="w-full"
        variant="outline"
        size="lg"
        onClick={() => onClickProvider("google")}
      >
        <FcGoogle className="h-5 w-5" />
      </Button>
      <Button
        className="w-full"
        variant="outline"
        size="lg"
        onClick={() => onClickProvider("github")}
      >
        <FaGithub className="h-5 w-5" />
      </Button>
    </div>
  );
}
