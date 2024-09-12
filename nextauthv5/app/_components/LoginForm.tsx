import React from "react";
import CardWrapper from "./CardWrapper";

export default function LoginForm() {
  return (
    <CardWrapper
      headerLabel="Welcome Back!"
      backButtonLabel="Don't have an Account"
      backButtonHref="/auth/register"
      showSocial
    >
      Login
    </CardWrapper>
  );
}
